import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGames } from "../api/GameApi";
import { getRooms } from "../api/HomeApi";
import { getMyRooms } from "../api/ChatRoomApi";
import { getGameLogoSrc, hasGameLogo } from "../utils/gameLogos";
import { getVariedGameColor } from "../utils/gameColor";
import { useAutoHideScrollbar } from "../utils/useAutoHideScrollbar";
import * as H from "../styles/StyledHome";

const HIDDEN_GAME_SLUGS = new Set(["wss-test"]);

const Home = ({ isActive = true }) => {
  const navigate = useNavigate();
  const goList = () => navigate("/chat");
  const goRoomDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, { state: { roomId: room.id } });
  const goApplyRoomDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, {
      state: { roomId: room.id, hideMemberList: true },
    });
  const [selected, setSelected] = useState("all");
  const [games, setGames] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [hasCategoryOverflow, setHasCategoryOverflow] = useState(false);
  const gameListRef = useRef(null);
  const { isScrolling, onScroll } = useAutoHideScrollbar();

  const filterGames = useMemo(
    () => games.filter((gameItem) => !HIDDEN_GAME_SLUGS.has(gameItem.slug)),
    [games],
  );

  // 탭이 보일 때만 fetch (TabShell keep-alive + 활성 시 갱신)
  useEffect(() => {
    if (!isActive) return;

    const loadGames = async () => {
      try {
        const gameList = await getGames();
        setGames(Array.isArray(gameList) ? gameList : []);
      } catch (error) {
        console.error(error);
      }
    };

    loadGames();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const loadUnreadCount = async () => {
      try {
        const myRooms = await getMyRooms();
        const unreadCount = (Array.isArray(myRooms) ? myRooms : []).reduce(
          (total, room) => total + Number(room.unread_count || 0),
          0,
        );
        setTotalUnreadCount(unreadCount);
      } catch {
        setTotalUnreadCount(0);
      }
    };

    loadUnreadCount();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const loadRooms = async () => {
      try {
        setMessage("");
        const roomList = await getRooms({ game: selected });
        const openRooms = (Array.isArray(roomList) ? roomList : []).filter(
          (room) => (room.status || "open") === "open",
        );
        setRooms(openRooms);
      } catch (error) {
        setRooms([]);
        setMessage(
          error.message || "방 목록을 불러오는 중 문제가 발생했습니다.",
        );
      }
    };

    loadRooms();
  }, [selected, isActive]);

  useEffect(() => {
    const checkOverflow = () => {
      if (!gameListRef.current) return;

      const list = gameListRef.current;
      setHasCategoryOverflow(list.scrollWidth > list.clientWidth + 1);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [filterGames]);

  const getRoomButtonLabel = (room) => {
    if (room.my_membership_status === "approved") return "참여 중";
    if (room.my_membership_status === "pending") return "승인 대기 중";
    if (room.my_membership_status === "rejected") return "신청 거절됨";
    return "신청하기";
  };

  const renderGameFilterLabel = (gameItem) => {
    if (gameItem.slug === "etc") {
      return "ETC";
    }

    if (hasGameLogo(gameItem.slug)) {
      return (
        <img
          src={getGameLogoSrc(gameItem.slug)}
          alt={gameItem.name_ko || gameItem.short_name || gameItem.name}
        />
      );
    }

    return gameItem.short_name || gameItem.name_ko || gameItem.name;
  };

  return (
    <H.Container>
      <H.Header>
        <H.Title>
          <img
            src={`${process.env.PUBLIC_URL}/images/logoImg.svg`}
            alt="GAMEMATE logo"
          />
          <span>Game Mate 구하기</span>
        </H.Title>
        <H.Chat>
          {totalUnreadCount > 0 && (
            <H.Alarm>
              {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
            </H.Alarm>
          )}
          <H.NBtn onClick={goList}>
            <img
              id="chat"
              src={`${process.env.PUBLIC_URL}/images/chat_e.svg`}
              alt="chat"
            />
          </H.NBtn>
        </H.Chat>
      </H.Header>

      <H.Category $expanded={isCategoryExpanded}>
        <H.CList
          ref={gameListRef}
          $expanded={isCategoryExpanded}
          $hasToggle={hasCategoryOverflow}
        >
          <H.LBtn
            type="button"
            $selected={selected === "all"}
            onClick={() => setSelected("all")}
            aria-label="전체"
          >
            ALL
          </H.LBtn>

          {filterGames.map((gameItem) => {
            const isIcon = hasGameLogo(gameItem.slug);

            return (
              <H.LBtn
                key={gameItem.id}
                type="button"
                $icon={isIcon}
                $selected={selected === gameItem.slug}
                onClick={() => setSelected(gameItem.slug)}
                aria-label={
                  gameItem.name_ko || gameItem.short_name || gameItem.name
                }
              >
                {renderGameFilterLabel(gameItem)}
              </H.LBtn>
            );
          })}
        </H.CList>
        {hasCategoryOverflow && (
          <H.CategoryToggle
            type="button"
            $expanded={isCategoryExpanded}
            aria-label={
              isCategoryExpanded ? "게임 목록 접기" : "게임 목록 전체보기"
            }
            onClick={() => setIsCategoryExpanded((prev) => !prev)}
          >
            ^
          </H.CategoryToggle>
        )}
      </H.Category>

      <H.Body
        $categoryExpanded={isCategoryExpanded && hasCategoryOverflow}
        $scrolling={isScrolling}
        onScroll={onScroll}
      >
        <H.List>
          {message && <H.Message>{message}</H.Message>}

          {rooms.map((room) => {
            const gameSlug = room.game?.slug;
            const logoSrc = hasGameLogo(gameSlug)
              ? getGameLogoSrc(gameSlug)
              : null;
            const avatarColor = getVariedGameColor(
              room.game?.color,
              room.id,
            );

            return (
              <H.Component key={room.id} onClick={() => goRoomDetail(room)}>
                <H.Img style={{ background: avatarColor }}>
                  {logoSrc && (
                    <img
                      src={logoSrc}
                      alt={room.game?.name_ko || room.game?.name || "게임"}
                    />
                  )}
                </H.Img>
                <H.Content>
                  <H.Text>
                    <H.Up>
                      <div id="title">{room.title}</div>
                      <div id="members">
                        {room.approved_member_count}/{room.max_members}
                      </div>
                    </H.Up>
                    <H.Down>
                      {room.description || "방 소개 없음"} /{" "}
                      {room.play_time_label || "시간대 미정"} /{" "}
                      {room.game?.name_ko || room.game?.name}
                    </H.Down>
                  </H.Text>
                  <H.Button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goApplyRoomDetail(room);
                    }}
                  >
                    {getRoomButtonLabel(room)}
                  </H.Button>
                </H.Content>
              </H.Component>
            );
          })}
        </H.List>

        <H.Make
          onClick={() =>
            navigate("/make", {
              state: { selectedGame: selected === "all" ? "" : selected },
            })
          }
        >
          <img
            id="add"
            src={`${process.env.PUBLIC_URL}/images/add.svg`}
            alt="add"
          />
          <div>방 만들기</div>
        </H.Make>
      </H.Body>
    </H.Container>
  );
};

export default Home;
