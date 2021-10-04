import React from "react";
import { Route, Switch } from "react-router-dom";
//import { ConnectedRouter } from "connected-react-router";

//import { history } from "../app/configStore";
import Header from "../components/Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import styled from "styled-components";

export default function App() {
  return (
    <AppBody>
      <Header/>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup}/>
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
