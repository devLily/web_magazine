import React from "react";

import { Img, Button } from "../elements";
import styled from "styled-components";

export default function Post(props) {
  const { userName } = props.userInfo;
  const { insertDate, countComment, contents, src, imageURL } = props;

  return (
    <section>
      <InfoWrap>
        {/* <Img shape="circle" src={src} /> */}
        <Wrap>
          <Img src={src} shape="circle" size="50" />
          <Text>{userName}</Text>
        </Wrap>
        <Wrap>
          <Text>{insertDate}</Text>
          <Button text="edit" />
        </Wrap>
      </InfoWrap>
      <InfoWrap>
        <Text>{contents}</Text>
      </InfoWrap>
      <InfoWrap>
        <Img src={imageURL} shape="rectangle" size="300" />
      </InfoWrap>
      <Text>댓글 {countComment} 개</Text>
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
  //align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const editBnt = styled.button`
  border-radius: 5px;
`;

const Text = styled.p`
  display: felx;
  text-align: center;
  align-items: center;
  padding: 0 10px;
`;
