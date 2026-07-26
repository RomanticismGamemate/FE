import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Prof from "../pages/Prof";
import Navbar from "./Navbar";
import * as S from "../styles/StyledTabShell";

const TabShell = () => {
  const { pathname } = useLocation();
  const isProfile = pathname === "/profile";
  const [animate, setAnimate] = useState(false);

  // 첫 진입 시에는 슬라이드 없이 바로 해당 탭을 보여주고,
  // 이후 탭 전환부터 애니메이션을 켭니다.
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <S.Container>
      <S.Panel
        $offset={isProfile ? -100 : 0}
        $active={!isProfile}
        $animate={animate}
        aria-hidden={isProfile}
      >
        <Home isActive={!isProfile} />
      </S.Panel>

      <S.Panel
        $offset={isProfile ? 0 : 100}
        $active={isProfile}
        $animate={animate}
        aria-hidden={!isProfile}
      >
        <Prof isActive={isProfile} />
      </S.Panel>

      <Navbar />
    </S.Container>
  );
};

export default TabShell;
