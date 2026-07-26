import styled from "styled-components";

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  height: 65px;
  z-index: 1100;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40px;
  background: #fff;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const Item = styled.div`
  width: 95px;
  height: 53px;
  border-radius: 40px;
  background: ${({ $selected }) => ($selected ? "#ffe49a" : "#fff")};
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
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
