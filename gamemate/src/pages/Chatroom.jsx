import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as C from "../styles/StyledChatroom";
import { getRoomMessages, postRoomMessage } from "../api/ChatApi";
import { getMyInfo } from "../api/UserApi";
import { getMyRooms } from "../api/ChatRoomApi";
import { updateRoomDiscordInvite } from "../api/RoomApi";
import { getProfileAvatarSrc } from "../utils/profileAvatar";
import { getGameLogoSrc, hasGameLogo } from "../utils/gameLogos";
import { getVariedGameColor } from "../utils/gameColor";
import { isSystemChatMessage } from "../utils/chatMessage";
import { navigateBackOrHome } from "../utils/navigation";

const Chatroom = () => {
  const navigate = useNavigate();
  const goBack = () => navigateBackOrHome(navigate);

  const { roomId } = useParams();

  const contentEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const scrollHideTimerRef = useRef(null);
  const isNearBottomRef = useRef(true);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const [room, setRoom] = useState(null);
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);
  const [discordUrlDraft, setDiscordUrlDraft] = useState("");
  const [discordModalError, setDiscordModalError] = useState("");
  const [isSavingDiscord, setIsSavingDiscord] = useState(false);

  const MESSAGE_INPUT_MIN_HEIGHT = 41;
  const MESSAGE_INPUT_MAX_HEIGHT = 122;
  const BOTTOM_THRESHOLD = 80;

  const hasDiscordUrl = Boolean(room?.discord_invite_url?.trim());
  const isOwner =
    room?.is_owner === true ||
    (currentUser?.id != null &&
      Number(room?.owner?.id ?? room?.owner_id) === Number(currentUser.id));
  const isDiscordDisabled = !isOwner && !hasDiscordUrl;

  const resizeMessageInput = (element) => {
    if (!element) return;

    element.style.height = `${MESSAGE_INPUT_MIN_HEIGHT}px`;
    const nextHeight = Math.min(
      Math.max(element.scrollHeight, MESSAGE_INPUT_MIN_HEIGHT),
      MESSAGE_INPUT_MAX_HEIGHT,
    );
    element.style.height = `${nextHeight}px`;
  };

  const updateNearBottomState = (element) => {
    if (!element) return;

    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    const nearBottom = distanceFromBottom <= BOTTOM_THRESHOLD;

    isNearBottomRef.current = nearBottom;
    setShowScrollToBottom(!nearBottom);
  };

  const scrollToBottom = () => {
    contentEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    isNearBottomRef.current = true;
    setShowScrollToBottom(false);
  };

  useEffect(() => {
    if (!roomId) {
      setErrorMessage("채팅방 정보가 없습니다.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const initializeChatroom = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [messageData, myInfo, myRooms] = await Promise.all([
          getRoomMessages({
            roomId,
          }),
          getMyInfo(),
          getMyRooms(),
        ]);

        // console.log("===== messageData =====");
        // console.log(messageData);
        // console.log(JSON.stringify(messageData, null, 2));

        if (!isMounted) {
          return;
        }

        const currentRoom = myRooms.find(
          (item) => String(item.id) === String(roomId),
        );

        // console.log("roomId:", roomId);
        // console.log("myRooms:", myRooms);
        // console.log("currentRoom:", currentRoom);
        // console.log(
        //   "approved_member_count:",
        //   currentRoom?.approved_member_count,
        // );

        if (!currentRoom) {
          throw new Error("참여 중인 채팅방 정보를 찾을 수 없습니다.");
        }

        setMessages(messageData);
        setCurrentUser(myInfo);
        setRoom(currentRoom);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "채팅방 정보를 불러오지 못했습니다.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeChatroom();

    return () => {
      isMounted = false;
    };
  }, [roomId]);

  /*
   * 최하단에 있을 때만 새 메시지에 맞춰 자동으로 내려갑니다.
   */
  useEffect(() => {
    if (!isNearBottomRef.current) return;

    contentEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (scrollHideTimerRef.current) {
        clearTimeout(scrollHideTimerRef.current);
      }
    };
  }, []);

  const handleContentScroll = (event) => {
    setIsScrolling(true);
    updateNearBottomState(event.currentTarget);

    if (scrollHideTimerRef.current) {
      clearTimeout(scrollHideTimerRef.current);
    }

    scrollHideTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    try {
      setIsSending(true);
      setErrorMessage("");

      const createdMessage = await postRoomMessage({
        roomId,
        content: trimmedMessage,
      });

      /*
       * POST 응답으로 생성된 메시지 객체가 반환되므로
       * 바로 화면 메시지 목록에 추가합니다.
       */
      setMessages((previousMessages) => {
        const alreadyExists = previousMessages.some(
          (item) => item.id === createdMessage.id,
        );

        if (alreadyExists) {
          return previousMessages;
        }

        return [...previousMessages, createdMessage];
      });

      isNearBottomRef.current = true;
      setShowScrollToBottom(false);
      setMessage("");
      requestAnimationFrame(() => {
        resizeMessageInput(messageInputRef.current);
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "메시지를 전송하지 못했습니다.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    resizeMessageInput(event.target);
  };

  const handleKeyDown = (event) => {
    // 한글 조합 도중 Enter가 중복 처리되는 현상 방지
    if (event.nativeEvent.isComposing) {
      return;
    }

    // Enter 전송, Shift + Enter 줄바꿈
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleDiscordClick = () => {
    if (isOwner) {
      setDiscordUrlDraft(room?.discord_invite_url || "");
      setDiscordModalError("");
      setIsDiscordModalOpen(true);
      return;
    }

    if (!room?.discord_invite_url?.trim()) return;

    window.open(room.discord_invite_url, "_blank", "noopener,noreferrer");
  };

  const closeDiscordModal = () => {
    if (isSavingDiscord) return;
    setIsDiscordModalOpen(false);
    setDiscordModalError("");
  };

  const handleSaveDiscordUrl = async (event) => {
    event.preventDefault();
    if (!roomId || isSavingDiscord) return;

    try {
      setIsSavingDiscord(true);
      setDiscordModalError("");

      const updatedRoom = await updateRoomDiscordInvite(
        roomId,
        discordUrlDraft,
      );

      setRoom((prev) => ({
        ...prev,
        ...(updatedRoom || {}),
        discord_invite_url:
          updatedRoom?.discord_invite_url ?? discordUrlDraft.trim(),
      }));
      setIsDiscordModalOpen(false);
    } catch (error) {
      setDiscordModalError(
        error.message || "디스코드 링크를 저장하지 못했습니다.",
      );
    } finally {
      setIsSavingDiscord(false);
    }
  };

  const goRoomDetail = () => {
    if (!roomId) return;

    navigate(`/roomdetail/${roomId}`, {
      state: {
        roomId,
      },
    });
  };

  const gameSlug = room?.game?.slug;
  const logoSrc = hasGameLogo(gameSlug) ? getGameLogoSrc(gameSlug) : null;
  const roomImgColor = getVariedGameColor(room?.game?.color, room?.id || roomId);

  return (
    <C.Container>
      <C.Header>
        <C.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            onClick={goBack}
          />
          <C.RoomImg style={{ background: roomImgColor }}>
            {logoSrc && (
              <img
                src={logoSrc}
                alt={room?.game?.name_ko || room?.game?.name || "게임"}
              />
            )}
          </C.RoomImg>
          <C.CTitle
            role="button"
            tabIndex={0}
            onClick={goRoomDetail}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goRoomDetail();
              }
            }}
          >
            <div id="title">{room?.title || "채팅방"}</div>

            <div id="members">참여 {room?.approved_member_count ?? 0}명</div>
          </C.CTitle>
        </C.Title>
        <C.NBtn
          type="button"
          $disabled={isDiscordDisabled}
          onClick={handleDiscordClick}
          aria-label={
            isOwner ? "디스코드 초대 링크 설정" : "디스코드 초대 링크 열기"
          }
          aria-disabled={isDiscordDisabled}
        >
          <img
            id="discord"
            src={`${process.env.PUBLIC_URL}/images/discord.svg`}
            alt="discord"
          />
        </C.NBtn>
      </C.Header>

      <C.Body>
        <C.Board>
          {errorMessage && <div role="alert">{errorMessage}</div>}
          <C.MessagePane>
            <C.Content $isScrolling={isScrolling} onScroll={handleContentScroll}>
              {!isLoading &&
                messages.map((item, index) => {
                  if (isSystemChatMessage(item)) {
                    return (
                      <C.Alert key={item.id}>
                        <div>{item.content}</div>
                      </C.Alert>
                    );
                  }
                  let previousUserMessage = null;

                  for (let i = index - 1; i >= 0; i -= 1) {
                    if (!isSystemChatMessage(messages[i])) {
                      previousUserMessage = messages[i];
                      break;
                    }
                  }

                  const previousSenderId = previousUserMessage?.sender?.id;
                  const currentSenderId = item.sender?.id;

                  const isSameSender =
                    previousSenderId != null &&
                    currentSenderId != null &&
                    String(previousSenderId) === String(currentSenderId);

                  const isMyMessage =
                    currentUser &&
                    String(item.sender?.id) === String(currentUser.id);

                  if (isMyMessage) {
                    return (
                      <C.Me key={item.id} $isSameSender={isSameSender}>
                        <div>{item.content}</div>
                      </C.Me>
                    );
                  }

                  return (
                    <C.Opp key={item.id} $isSameSender={isSameSender}>
                      <C.Prof
                        as="img"
                        $isVisible={!isSameSender}
                        src={getProfileAvatarSrc(item.sender?.profile_avatar)}
                        alt=""
                      />
                      <C.Right>
                        {!isSameSender && (
                          <span id="name">
                            {item.sender?.nickname ||
                              item.sender?.username ||
                              "사용자"}
                          </span>
                        )}

                        <C.OMs>
                          <div>{item.content}</div>
                        </C.OMs>
                      </C.Right>
                    </C.Opp>
                  );
                })}

              <div ref={contentEndRef} />
            </C.Content>

            {showScrollToBottom && (
              <C.ScrollToBottom
                type="button"
                onClick={scrollToBottom}
                aria-label="최신 메시지로 이동"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`}
                  alt=""
                />
              </C.ScrollToBottom>
            )}
          </C.MessagePane>

          <C.Input onSubmit={handleSubmit}>
            <C.Message
              ref={messageInputRef}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
              rows={1}
              maxLength={1000}
              enterKeyHint="send"
              disabled={isSending}
            />

            <C.Send
              type="submit"
              disabled={!message.trim() || isSending}
              aria-label="메시지 전송"
            >
              <img
                id="send"
                src={`${process.env.PUBLIC_URL}/images/send.svg`}
                alt=""
              />
            </C.Send>
          </C.Input>
        </C.Board>
      </C.Body>

      {isDiscordModalOpen && (
        <C.ModalOverlay>
          <C.Modal as="form" onSubmit={handleSaveDiscordUrl}>
            <C.ModalTitle>디스코드 초대 링크</C.ModalTitle>
            <C.ModalDescription>
              참여자들이 바로 입장할 수 있도록 초대 URL을 등록해 주세요.
            </C.ModalDescription>
            <C.ModalInput
              type="text"
              value={discordUrlDraft}
              onChange={(event) => setDiscordUrlDraft(event.target.value)}
              placeholder="https://discord.gg/..."
              disabled={isSavingDiscord}
              autoFocus
            />
            {discordModalError && (
              <C.ModalError>{discordModalError}</C.ModalError>
            )}
            <C.ModalPrimaryButton type="submit" disabled={isSavingDiscord}>
              {isSavingDiscord ? "저장 중..." : "저장하기"}
            </C.ModalPrimaryButton>
            <C.ModalSecondaryButton
              type="button"
              onClick={closeDiscordModal}
              disabled={isSavingDiscord}
            >
              취소
            </C.ModalSecondaryButton>
          </C.Modal>
        </C.ModalOverlay>
      )}
    </C.Container>
  );
};

export default Chatroom;
