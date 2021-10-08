import React from "react";

import Img from "../elements/Img";
// import styled from "styled-components";

export default function Card(props) {
  const {
    imageURL,
    userName,
    // postId
  } = props;

  return (
    <div>
      <Img src={imageURL} size={85} shape="square" />

      <div>
        <b>{userName}</b>님이 게시글에 댓글을 남겼습니다 :)!{" "}
      </div>
    </div>
  );
}

Card.defaultProps = {
  imageURL: "http://via.placeholder.com/400x300",
};
