import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { apiKey } from "../../firebase";
import { getCookie, deleteCookie } from "../../utils/Cookie";
import { actionCreators as userAction } from "../../features/user";

import styled from "styled-components";

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  if (isLoggedIn && isSession) {
    return (
      <NavBar>
        <ImgWrap>
          <LogoImg src="img/bbok1.png" alt="bbokari" />
        </ImgWrap>
        <NavList>
          <NavLink>
            <AccountLink to="/">My Page</AccountLink>
          </NavLink>
          <NavLink>
            <AccountLink to="/">Notice</AccountLink>
            {/* <AccountLink to="/">
            알림<Badge>2</Badge>
          </AccountLink> */}
          </NavLink>
          <NavLink>
            <AccountLink
              to="/login"
              onClick={() => {
                dispatch(userAction.logOut({}));
              }}
            >
              log-out
            </AccountLink>
          </NavLink>
        </NavList>
      </NavBar>
    );
  }
  return (
    <NavBar>
      <ImgWrap>
        <LogoImg
          // src="/Users/jaekyung/Desktop/bulletin-Board/public/images/logo.png"
          src="img/bbok1.png"
          alt="bbokari"
        />
      </ImgWrap>
      <NavList>
        <NavLink>
          <AccountLink to="/login">login</AccountLink>
        </NavLink>
        <NavLink>
          <AccountLink to="/signup">signUp</AccountLink>
        </NavLink>
      </NavList>
    </NavBar>
  );
}

const NavBar = styled.nav`
  background-color: white;
  border-bottom: 1px solid black;
  /* text-align: center; */
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  z-index: 2;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const LogoImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

// const LinkWrap = styled.div`
//   display: flex;
// `;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
`;

const NavLink = styled.li`
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 5px;
  /* background-color: #d6a4a4; */
  /* background-color: #faaca8; */
  /* background-color: #b993d6; */
  background-color: #3f4c6b;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0, 2);
  position: relative;
  /* transition: all var(--animation-duration) ease-in-out; */
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  /* background-color: #8ca6db; */
  background-color: #ffafbd;
  border-radius: 50%;
`;

const AccountLink = styled(Link)`
  text-decoration: none;
  color: white;
  /* color: #3f4c6b; */
`;
