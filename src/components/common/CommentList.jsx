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
      // 코멘트 정보가 없으면 불러오기
      dispatch(commentActions.getCommentFB(postId));
    }
  }, []);

  // comment가 없거나, postId가 없으면 아무것도 안넘겨준다!
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
  const { userProfile, userName, userId, postId, contents, insert_dt } =
    comment;
  return (
    <div>
      <Wrap>
        <Img src={undefined} shape="circle" />
        <Text bold>{userName}</Text>
      </Wrap>
      <Wraps>
        <Text margin="0 20px">{contents}</Text>
        <Text color="#7AA1D2">{insert_dt}</Text>
      </Wraps>
    </div>
  );
};

CommentItem.defaultProps = {
  userProfile: "",
  userName: "mean0",
  userId: "",
  postId: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: "2021-01-01 19:00:00",
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
