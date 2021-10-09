import React from "react";
import { useSelector } from "react-redux";

import Post from "../components/common/Post";

export default function PostDetail(props) {
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);

  const postId = props.match.params.id;
  const isEdit = postId ? true : false;

  const post = isEdit ? postList.find((post) => post.id === postId) : null;

  if (post)
    return <Post {...post} isMe={post.userInfo.userId === userInfo?.uid} />;

  return null;
}
