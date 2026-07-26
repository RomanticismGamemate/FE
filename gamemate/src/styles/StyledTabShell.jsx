import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  height: 100dvh;
  width: 100%;
  max-width: 402px;
  overflow: hidden;
  background: #fff0c7;
  flex-shrink: 0;
`;

export const Panel = styled.div`
  position: absolute;
  inset: 0;
  transform: translateX(${({ $offset }) => $offset}%);
  transition: ${({ $animate }) =>
    $animate ? "transform 0.28s ease" : "none"};
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  z-index: ${({ $active }) => ($active ? 1 : 0)};
`;
