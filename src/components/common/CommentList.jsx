import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../features/comment";
import { Img, Text } from "../elements";

import styled from "styled-components";

export default function CommentList({ postId }) {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);

  useEffect(() => {
    if (!commentList[postId]) {
      dispatch(commentActions.getCommentFB(postId));
    }
  }, []);

  if (!commentList[postId] || !postId) {
    return null;
  }

  return (
    <div>
      {commentList[postId].map((comment) => {
        return <CommentItem comment={comment} key={comment.id} />;
      })}
    </div>
  );
}

const CommentItem = ({ comment }) => {
  const { userProfile, userName, userId, postId, contents, insertDate } =
    comment;

  return (
    <div>
      <Wrap>
        <Img src={undefined} shape="circle" />
        <Text bold>{userName}</Text>
      </Wrap>
      <Wraps>
        <Text margin="0 20px">{contents}</Text>
        <Text color="#7AA1D2">{insertDate}</Text>
      </Wraps>
    </div>
  );
};

CommentItem.defaultProps = {
  userProfile: "",
  userName: "bbokari",
  userId: "",
  postId: 1,
  contents: "ㅇㅅㅇb",
  insertDate: "2021-01-01 19:00:00",
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Wraps = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
