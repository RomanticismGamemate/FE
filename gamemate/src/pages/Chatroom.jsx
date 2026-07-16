import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../styles/StyledChatroom";
// import axios from "axios";

const Chatroom = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goBack = () => navigate(-1);
  const goProf = () => navigate(`/profile`);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: "user1",
      type: "other",
      text: "ㅎㅇㅎㅇ",
    },
    {
      id: 2,
      senderId: "me",
      type: "me",
      text: "안녕하세염 ㅋ",
    },
  ]);

  {
    messages.map((item, index) => {
      const previousMessage = messages[index - 1];

      const isSameSender =
        previousMessage && previousMessage.senderId === item.senderId;

      return item.type === "other" ? (
        <C.Opp key={item.id} $isSameSender={isSameSender}>
          <C.Prof />
          <C.OMs>
            <div>{item.text}</div>
          </C.OMs>
        </C.Opp>
      ) : (
        <C.Me key={item.id} $isSameSender={isSameSender}>
          <div>{item.text}</div>
        </C.Me>
      );
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "me",
        text: trimmedMessage,
      },
    ]);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    // 한글 조합 중 Enter가 두 번 처리되는 문제 방지
    if (e.nativeEvent.isComposing) return;

    // PC에서는 Enter 전송, Shift + Enter 줄바꿈
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

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
          <C.CTitle>
            <div id="title">채팅방 이름</div>
            <div id="members">참여 3명</div>
          </C.CTitle>
        </C.Title>
        <C.NBtn>
          <img
            id="discord"
            src={`${process.env.PUBLIC_URL}/images/discord.svg`}
            alt="discord"
          />
        </C.NBtn>
      </C.Header>

      <C.Body>
        <C.Board>
          <C.Content>
            <C.Alert>
              <div>**님이 채팅방을 만들었어요</div>
            </C.Alert>

            {messages.map((item) =>
              item.type === "other" ? (
                <C.Opp key={item.id}>
                  <C.Prof />
                  <C.OMs>
                    <div>{item.text}</div>
                  </C.OMs>
                </C.Opp>
              ) : (
                <C.Me key={item.id}>
                  <div>{item.text}</div>
                </C.Me>
              ),
            )}
          </C.Content>
          <C.Input onSubmit={handleSubmit}>
            <C.Message
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
              rows={1}
              enterKeyHint="send"
            />

            <C.Send
              type="submit"
              disabled={!message.trim()}
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
    </C.Container>
  );
};

export default Chatroom;
