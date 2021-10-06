import React from "react";

import Img from "../elements/Img";
import styled from "styled-components";

export default function Post(props) {
  const { src } = props;
  return (
    <section>
      <InfoWrap>
        <Img shape="circle" src={src} />
        <span>userkName 나는야코드곤듀</span>
        <span>insertDate 17시간 전</span>
      </InfoWrap>
      <Wrap>
        <p>contents</p>
      </Wrap>
      <Wrap>
        <Img shape="rectangle" src={src} />
      </Wrap>
      <p>댓글 countComment 개</p>
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
  //justify-content: space-around;
`;

const Wrap = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const editBnt = styled.button`
  border-radius: 5px;
`;

// const
