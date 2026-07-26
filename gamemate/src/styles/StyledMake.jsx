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
  width: 100%;
  max-width: 402px;
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
  box-sizing: border-box;
  background: #fff0c7;
`;

export const Title = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
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

export const Category = styled.div`
  width: 393px;
  height: 65px;
  padding: 18px 25px;
`;

export const CList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

export const LBtn = styled.div`
  display: flex;
  width: 60px;
  height: 28px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #ffe49a;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;
`;

export const Plus = styled.div`
  width: 24px;
  height: 24px;
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

export const NBtn = styled.div`
  width: 34px;
  height: 34px;
`;

export const Body = styled.div`
  position: fixed;
  top: 137px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 402px;
  padding: 12px 0 20px;
  overflow: hidden;
  overscroll-behavior: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  p {
    color: #000;
    margin-bottom: 6px;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
  }
`;

export const GameSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 343px;
  flex-shrink: 0;
`;

export const GameList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const GameBtn = styled.button`
  display: flex;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: ${({ $icon }) => ($icon ? "2px" : "0")};
  justify-content: center;
  align-items: center;

  border: ${({ $selected }) =>
    $selected ? "1px solid #f4c430" : "1px solid transparent"};
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
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const TitleInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;

  input {
    padding: 0 16px;
    width: 343px;
    height: 48px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    box-sizing: border-box;
    outline: none;

    &::placeholder {
      color: #a2a2a2;
    }
  }
`;

export const ContentInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 343px;
  flex: 1;
  min-height: 0;

  textarea {
    resize: none;
    padding: 14px 16px;
    width: 100%;
    flex: 1;
    min-height: 72px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    border-radius: 10px;
    box-sizing: border-box;
    outline: none;

    &::placeholder {
      color: #a2a2a2;
    }
  }
`;

export const DetailSelect = styled.div`
  display: flex;
  width: 343px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  #SelectBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  select {
    width: 161px;
    height: 48px;
    appearance: none;
    -webkit-appearance: none;
    padding: 0 42px 0 16px;
    background: #ffffff;
    background-image: url("/images/chevron-down.svg");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 16px 16px;
    border: 1px solid #d9d9d9;
    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

export const Button = styled.button`
  width: 343px;
  height: 50px;
  min-height: 50px;
  flex: 0 0 50px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #ffe49a;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.34px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Message = styled.p`
  width: 343px;
  color: #d93025 !important;
  margin: 0 !important;
  font-family: Pretendard;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.28px;
  flex-shrink: 0;
`;
