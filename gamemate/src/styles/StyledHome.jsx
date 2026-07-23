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
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 64px;
    height: 64px;
    object-fit: contain;
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

  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #f72323;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  right: 4px;
  bottom: 12px;

  color: #fff;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
`;

export const Category = styled.div`
  position: fixed;
  top: 137px;
  left: 50%;
  transform: translateX(-50%);
  width: 393px;
  min-height: 72px;
  max-height: ${({ $expanded }) => ($expanded ? "156px" : "72px")};
  padding: 16px 20px;
  z-index: 999;
  box-sizing: border-box;
  background: #fff0c7;
  overflow: hidden;
  transition: max-height 0.2s ease;
`;

export const CList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${({ $expanded }) => ($expanded ? "wrap" : "nowrap")};
  gap: 3px;
  width: ${({ $hasToggle }) => ($hasToggle ? "calc(100% - 46px)" : "100%")};
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  overflow: ${({ $expanded }) => ($expanded ? "auto" : "hidden")};
  max-height: ${({ $expanded }) => ($expanded ? "124px" : "40px")};
  box-sizing: border-box;
`;

export const LBtn = styled.button`
  display: flex;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: ${({ $icon }) => ($icon ? "2px" : "0")};
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 10px;
  background: ${({ $selected }) => ($selected ? "#ffe49a" : "#fff")};

  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.22px;

  cursor: pointer;
  transition: background-color 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const Plus = styled.div`
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
`;

export const CategoryToggle = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #fffcf4;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(0deg)" : "rotate(180deg)"};
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:active {
    background: #ffe49a;
  }
`;

export const Body = styled.div`
  position: fixed;
  top: ${({ $categoryExpanded }) => ($categoryExpanded ? "293px" : "209px")};
  bottom: 110px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 402px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  box-sizing: border-box;
  transition: top 0.2s ease;

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.28) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.22);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.32);
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 13px 12px 13px 25px;
  flex: 0 0 auto;
  box-sizing: border-box;
`;

export const Component = styled.div`
  width: 100%;
  height: 126px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #fffcf4;
  padding: 22px 18px 20px 12px;
  display: flex;
  flex-direction: row;
  gap: 13px;
  box-sizing: border-box;
`;

export const Img = styled.div`
  width: 35px;
  height: 35px;
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

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.div`
  gap: 6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Up = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  #title {
    color: #21272a;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 16.5px */
  }

  #members {
    color: #21272a;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 16.5px */
  }
`;

export const Down = styled.div`
  color: #697077;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
`;

export const Button = styled.button`
  outline: none;
  border: transparent;
  width: 100%;
  height: 33px;
  border-radius: 10px;
  background: #fff0c7;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.p`
  width: 100%;
  color: #d93025;
  margin: 0;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.28px;
`;

export const Make = styled.div`
  width: calc(100% - 37px);
  height: 42px;
  min-height: 42px;
  flex: 0 0 42px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #ffe49a;
  margin: 30px 12px 4px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;

  img {
    width: 15px;
    height: 15px;
  }

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 21px */
  }
`;

export const NBtn = styled.div`
  width: 34px;
  height: 34px;
`;
