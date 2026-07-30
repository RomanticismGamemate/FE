import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as N from "../styles/StyledNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isProfile = pathname === "/profile";

  return (
    <N.Nav $isProfile={isProfile}>
      <N.Item>
        <N.NBtn
          type="button"
          aria-label="홈으로 이동"
          aria-current={!isProfile ? "page" : undefined}
          onClick={() => navigate("/home")}
        >
          <img src={`${process.env.PUBLIC_URL}/images/home_e.svg`} alt="" />
        </N.NBtn>
      </N.Item>

      <N.Item>
        <N.NBtn
          type="button"
          aria-label="프로필로 이동"
          aria-current={isProfile ? "page" : undefined}
          onClick={() => navigate("/profile")}
        >
          <img src={`${process.env.PUBLIC_URL}/images/prof_e.svg`} alt="" />
        </N.NBtn>
      </N.Item>
    </N.Nav>
  );
};

export default Navbar;
