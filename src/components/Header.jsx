import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCookie, deleteCookie } from "../utils/Cookie";
import { actionCreators as userAction } from "../features/user";

// import logoImg from "../../public/images/code.jpg";
import styled from "styled-components";

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return (
      <NavBar>
        <ImgWrap>
          <LogoImg
            src="https://file3.instiz.net/data/cached_img/upload/2020/12/24/0/ceed28127dadec479bca6b54a581d240.png"
            // src="/images/code.jpg"
            alt="logo"
          />
        </ImgWrap>
        <NavList>
          <NavLink>
            <AccountLink to="/">My Page</AccountLink>
          </NavLink>
          <NavLink>
            <AccountLink to="/">Notice</AccountLink>
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
          src="../../public/images/code.jpg"
          alt="logo"
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
  border: 1px solid black;
  /* text-align: center; */
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  z-index: 1;
  box-sizing: border-box;
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
  border-radius: 4px;
  background-color: #d6a4a4;
  /* transition: all var(--animation-duration) ease-in-out; */
`;

const AccountLink = styled(Link)`
  text-decoration: none;
  color: #3f4c6b;
`;

// const NavBar = styled.nav`
//   text-align: center;
//   position: fixed;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   padding: 15px;
//   z-index: 1;
// `;

// const LinkWrap = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `;

// const ImgWrap = styled.div`
//   display: flex;
//   justify-content: flex-start;
// `;

// const NavList = styled.ul`
//   display: flex;
// `;

// const NavLink = styled.li`
//   padding: 8px 12px;
//   margin: 0 4px;
//   cursor: pointer;
//   border-radius: 4px;
//   background-color: #d6a4a4;
//   transition: all var(--animation-duration) ease-in-out;
// `;

// const AccountLink = styled(Link)`
//   text-decoration: none;
//   color: #3f4c6b;
// `;

// const LogoImg = styled.img`
//   width: 70px;
//   height: 70px;
// `;
