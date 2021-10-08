import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../app/configStore";
import { actionCreators as userActions } from "../features/user";
import { actionCreators as postActions } from "../features/post";

import { apiKey } from "../firebase";

import Permit from "../utils/Permit";
import Header from "../components/common/Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";

import styled from "styled-components";

export default function App() {
  const dispatch = useDispatch();
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;
  const postList = useSelector((state) => state.post.list);

  useEffect(() => {
    if(isSession) {
      dispatch(userActions.loginCheckFB());
    }
    if (!postList.length) {
      dispatch(postActions.getPostFB());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <AppBody>
      <ConnectedRouter history={history}>
      <Header></Header>
      <Route path="/" component={PostList} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact/>
      <Route path="/write/:id" component={PostWrite} exact/>
      <Route path="/write" component={PostWrite} exact/>
      <Route path="/post/:id" component={PostDetail} exact/>
      {/* <Route path="/search" component={Search} exact/> */}
      <Route path="/noti" component={Notification} exact/>
      </ConnectedRouter>
      <Permit>
        <WriteBtn onClick={() => {
          history.push("/write")
        }}>+</WriteBtn>
      </Permit>
    </AppBody>
  );
}

const AppBody = styled.div`
`;

const WriteBtn = styled.button`
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
