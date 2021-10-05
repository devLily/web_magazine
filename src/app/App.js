import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useDispatch } from "react-redux";

import { history } from "../app/configStore";
import { actionCreators as userActions } from "../features/user";

import { apiKey } from "../firebase";

import Permit from "../utils/Permit";
import Header from "../components/Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import styled from "styled-components";
import PostList from "../pages/PostList";

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
      <Route path="/postlist" exact component={PostList} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup}/>
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

const WriteBnt = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
`;
