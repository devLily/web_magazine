import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useDispatch } from "react-redux";

import { history } from "../app/configStore";
import { actionCreators as userActions } from "../features/user";

import { apiKey } from "../firebase";

import Permit from "../utils/Permit";
import Header from "../components/common/Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";

import styled from "styled-components";

export default function App() {
  const dispatch = useDispatch();
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  useEffect(() => {
    if(isSession) {
      dispatch(userActions.loginCheckFB());
    }
  },[]);

  return (
    <AppBody>
      <ConnectedRouter history={history}>
      <Header></Header>
      <Route path="/" component={PostList} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact/>
      </ConnectedRouter>
      <Permit>
        <WriteBnt>+</WriteBnt>
      </Permit>
    </AppBody>
  );
}

const AppBody = styled.div`
  padding: 0;
  margin: 0;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
  display: block;
`;

const WriteBnt = styled.button`
  position: fixed;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  padding: 16px;
  bottom: 50px;
  right: 16px;
  border: none;
  border-radius: 50%;
  font-weight: 800;
  text-align: center;
  background-color: yellow;
`;
