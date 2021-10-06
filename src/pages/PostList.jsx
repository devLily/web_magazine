import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../features/post";

import Post from "../components/common/Post";

// import { getCookie, setCookie, deleteCookie } from "../utils/Cookie";

import styled from "styled-components";

export default function PostList(props) {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  console.log(postList);

  useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);

  return (
    <div>
      {postList.map((post, index) => {
        return <Post key={post.id} {...post} />;
      })}
    </div>
  );
}
