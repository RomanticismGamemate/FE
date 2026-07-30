import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 14px;

  width: 216px;
  height: 65px;
  padding: 6px;

  border-radius: 40px;
  background: #fff;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);

  /* 움직이는 노란색 선택 배경 */
  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;

    width: 95px;
    height: 53px;
    border-radius: 40px;
    background: #ffe49a;

    transform: translateX(${({ $isProfile }) => ($isProfile ? "109px" : "0")});

    transition:
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.2s ease;

    pointer-events: none;
  }
`;

export const Item = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 95px;
  height: 53px;
`;

export const NBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 34px;
  height: 34px;
  padding: 0;

  border: 0;
  background: transparent;
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid #222;
    outline-offset: 4px;
    border-radius: 50%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
