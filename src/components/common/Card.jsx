import React from "react";
import Img from "../elements/Img";
import Text from "../elements/Text";

import styled from "styled-components";

import { history } from "../../app/configStore";
export default function Card(props) {
  const { imageURL, userName, postId } = props;

  return (
    <Wrap>
      <Img src={imageURL} size={85} shape="square" />
      <TextWrap
        onClick={() => {
          history.push(`/post/${postId}`);
        }}
      >
        <Text bold color="#134E5E">
          {userName}
        </Text>
        <span>님이 게시글에 댓글을 남겼습니다 :)! </span>
      </TextWrap>
    </Wrap>
  );
}

Card.defaultProps = {
  imageURL: "http://via.placeholder.com/400x300",
};

const Wrap = styled.div`
  padding-top: 150px;
  text-align: center;
`;

const TextWrap = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  padding: 10px;
  border-bottom: 1px solid #f8cdda;
`;
