import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { apiKey } from "../../firebase";
import { actionCreators as userAction } from "../../features/user";

import NotiBadge from "./NotiBadge";

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
          <LogoImg src="/img/bbok1.png" alt="bbokari" />
          <Links to="/">덕질하는 곳</Links>
        </ImgWrap>
        <NavList>
          <NavLink>
            <AccountLink to="/">My Page</AccountLink>
          </NavLink>
          <NavLink>
            <NotiBadge />
          </NavLink>
          <NavLink>
            <AccountLink
              to="/login"
              onClick={() => {
                dispatch(userAction.logoutFB({}));
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
        <LogoImg src="/img/bbok1.png" alt="bbokari" />
        <Link to="/" />
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
  cursor: pointer;
`;

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
  background-color: #3f4c6b;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0, 2);
  position: relative;
`;

const AccountLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Links = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  padding-left: 10px;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #ffe47a;
`;
