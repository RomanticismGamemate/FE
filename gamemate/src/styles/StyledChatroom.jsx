import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 0px;
  height: 100dvh;
  padding: 0; /* 불필요한 패딩 제거 */
  box-sizing: border-box; /* 패딩이 width에 포함되도록 설정 */
  display: flex;
  flex-direction: column;
  background: #fff0c7;
  width: 100%;
  max-width: 402px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 137px;
  width: 393px;
  padding: 64px 25px 32px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

export const Title = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  flex: 1;

  #back {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    cursor: pointer;
  }
`;

export const RoomImg = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: #d9d9d9;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 72%;
    height: 72%;
    object-fit: contain;
    display: block;
    border-radius: 50%;
  }
`;

export const CTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
  cursor: pointer;

  #title {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #members {
    color: #767676;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.26px;
  }
`;

export const Chat = styled.div`
  width: 58px;
  height: 58px;
  background: #fffcf4;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Alarm = styled.div`
  position: absolute;

  width: 17px;
  height: 17px;
  background: #f72323;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  right: 7px;
  bottom: 14px;

  color: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
  font-align: center;
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;

  padding-top: 154px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
`;

export const Board = styled.div`
  width: 343px;
  flex: 1;
  min-height: 0;

  border-radius: 30px;
  background: #fffcf4;

  padding: 21px 10px 25px;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  overflow: hidden;
`;

export const MessagePane = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 20px;

  box-sizing: border-box;

  transition: --scrollbar-thumb-alpha 0.45s ease;
  --scrollbar-thumb-alpha: ${({ $isScrolling }) => ($isScrolling ? 0.18 : 0)};

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, var(--scrollbar-thumb-alpha)) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, var(--scrollbar-thumb-alpha));
    border-radius: 999px;
  }
`;

export const ScrollToBottom = styled.button`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  padding: 0;

  border: 1px solid #ffe49a;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #fffaf0;
  }

  &:active {
    transform: translateX(-50%) scale(0.96);
  }
`;

export const Alert = styled.div`
  width: 100%;

  display: flex;
  margin-top: 18px;
  margin-bottom: 18px;

  align-items: center;
  justify-content: center;

  div {
    padding: 4px 20px;

    border-radius: 50px;
    border: 1px solid #ffe49a;

    color: #767676;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.24px;
  }
`;

export const Opp = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;

  margin-top: ${({ $isSameSender }) => ($isSameSender ? "8px" : "26px")};

  span {
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    line-height: 1.4;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: start;
`;

export const Prof = styled.div`
  width: 44px;
  height: 44px;
  background: #d9d9d9;
  border-radius: 50%;
  object-fit: cover;
  flex: 0 0 auto;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
`;

export const OMs = styled.div`
  max-width: 230px;

  padding: 8px 14px;

  border-radius: 10px 10px 10px 0;
  border: 0.5px solid #ffe49a;
  background: #fff;

  display: flex;
  justify-content: flex-start;

  box-sizing: border-box;

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    line-height: 1.4;

    word-break: break-word;
    white-space: pre-wrap;
  }
`;

export const Me = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  margin-top: ${({ $isSameSender }) => ($isSameSender ? "8px" : "26px")};

  div {
    max-width: 230px;
    padding: 8px 14px;

    border-radius: 10px 10px 0 10px;
    border: 0.5px solid #ffe49a;
    background: #ffe49a;

    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    line-height: 1.4;

    word-break: break-word;
    white-space: pre-wrap;
    box-sizing: border-box;
  }
`;

export const Input = styled.form`
  width: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 7px;

  padding: 10px 0 env(safe-area-inset-bottom);

  box-sizing: border-box;
`;

export const Message = styled.textarea`
  flex: 1;
  min-width: 0;

  min-height: 41px;
  height: 41px;
  max-height: 122px;

  padding: 10px 16px;

  border-radius: 29.464px;
  border: 0.982px solid #ffe49a;
  background: #fff;

  color: #21272a;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  outline: none;
  resize: none;
  overflow-y: auto;

  box-sizing: border-box;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: #a4a4a4;
  }

  &:focus {
    border-color: #ffc84a;
  }
`;

export const Send = styled.button`
  width: 41px;
  height: 41px;
  flex-shrink: 0;

  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 41px;
    height: 41px;
    display: block;
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  height: 65px;
  z-index: 1000;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40px;
  background: #fff;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const Select = styled.div`
  width: 95px;
  height: 53px;
  border-radius: 40px;
  background: #ffe49a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NSelect = styled.div`
  width: 95px;
  height: 53px;
  border-radius: 40px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NBtn = styled.button`
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.35 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
`;

export const Modal = styled.div`
  width: calc(100% - 56px);
  max-width: 335px;
  padding: 36px 24px 24px;
  border-radius: 34px;
  background: #fffcf4;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: Pretendard;
`;

export const ModalTitle = styled.div`
  color: #21272a;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  text-align: center;
`;

export const ModalDescription = styled.div`
  margin-top: 10px;
  color: #697077;
  font-size: 13px;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
  word-break: keep-all;
`;

export const ModalInput = styled.input`
  margin-top: 22px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #ffe49a;
  }

  &::placeholder {
    color: #697077;
  }
`;

export const ModalError = styled.p`
  margin: 8px 0 0;
  color: #d93025;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
`;

export const ModalPrimaryButton = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 20px;
  border: 1px solid #ffe49a;
  border-radius: 10px;
  background: #ffe49a;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export const ModalSecondaryButton = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 8px;
  border: 1px solid #ffe49a;
  border-radius: 10px;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;
