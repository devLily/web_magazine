import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../app/configStore";
import Header from "../components/Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import styled from "styled-components";
import PostList from "../pages/PostList";

export default function App() {
  return (
    <AppBody>
      <ConnectedRouter history={history}>
      <Header/>
      <Route path="#" exact component={PostList} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup}/>
      </ConnectedRouter>
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
