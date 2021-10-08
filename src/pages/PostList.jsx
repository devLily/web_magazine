import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../features/post";
import InfinityScroll from "../utils/InfinityScroll";
import Post from "../components/common/Post";

// import { getCookie, setCookie, deleteCookie } from "../utils/Cookie";

import styled from "styled-components";

export default function PostList(props) {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.post.isLoading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;
  console.log("userInfo", userInfo);

  const moveToPage = (type, postId) => {
    if (type === "edit") {
      history.push(`/write/${postId}`);

      return;
    }

    history.push(`/post/${postId}`);
    return;
  };

  return (
    <InfinityScroll
      callNext={() => {
        dispatch(postActions.getPostFB(paging.next));
      }}
      isNext={paging.next ? true : false}
      loading={isLoading}
    >
      <ListWrap>
        {postList.map((post) => {
          if (post.userInfo.userId === userInfo?.uid) {
            return (
              <Post
                onClick={() => moveToPage("edit", post.id)}
                key={post.id}
                {...post}
                isMe
              />
            );
          } else {
            return (
              <Post
                onClick={() => moveToPage("detail", post.id)}
                key={post.id}
                {...post}
              />
            );
          }
        })}
      </ListWrap>
    </InfinityScroll>
  );
}

const ListWrap = styled.div`
  padding-top: 150px;
`;

// const ClickWrap = styled.div`
//   display: flex;
// `;
