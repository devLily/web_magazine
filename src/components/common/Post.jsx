import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Img, Button, Text } from "../elements";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";

export default function Post(props) {
  const { userName } = props.userInfo;
  const { id: viewId } = useParams();

  const { insertDate, countComment, contents, src, imageURL, onClick, isMe } =
    props;

  return (
    <section>
      <InfoWrap>
        <Wrap>
          <Img src={src} shape="circle" size="50" />
          <Text color="#757F9A" bold size="20px">
            {userName}
          </Text>
        </Wrap>
        <Wrap>
          <Text color="#757F9A" bold size="20px">
            {insertDate}
          </Text>
          {isMe && <Button text="edit" />}
        </Wrap>
      </InfoWrap>
      <ClickWrap onClick={onClick}>
        <Text color="#232526" size="16px" padding="20px 0">
          {contents}
        </Text>
        <Img src={imageURL} shape="rectangle" size="300" />
      </ClickWrap>
      {viewId && (
        <>
          <CommentList postId={viewId} />
          <CommentWrite postId={viewId} />
        </>
      )}
      {!viewId && (
        <Text color="#1F1C2C" bold size="18px" padding="10px">
          댓글 {countComment} 개
        </Text>
      )}
    </section>
  );
}

Post.defaultProps = {
  userInfo: {
    userName: "felix",
    userProfile:
      "https://w.namu.la/s/7a11ad5ae0d1da8b0ea05c75f635c9b46a92be8916ea290226a98c7c10a485397000f5f4b30806c971ee7a00817215bb60a322a434cd900d0bb778b0f3eecf27dd00954f2539e42046707bdd5a3be0904243a6e4dca6f928941bde4abedd005e",
  },
  imageURL:
    "https://w.namu.la/s/7a11ad5ae0d1da8b0ea05c75f635c9b46a92be8916ea290226a98c7c10a485397000f5f4b30806c971ee7a00817215bb60a322a434cd900d0bb778b0f3eecf27dd00954f2539e42046707bdd5a3be0904243a6e4dca6f928941bde4abedd005e",
  contents: "용복이네요",
  countComment: 10,
  insertDate: "2021-02-28 10:00:00",
};

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  //align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ClickWrap = styled.div`
  cursor: pointer;
  padding: 10px;
`;
