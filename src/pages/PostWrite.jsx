import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../features/post";
import { Img, Button, Text } from "../components/elements";

import styled from "styled-components";

export default function PostWrite(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [postText, setPostText] = useState("");

  const goBack = () => {
    history.replace("/");
  };

  const saveContents = (e) => {
    setPostText(e.target.value);
  };

  if (!isLoggedIn) {
    return (
      <WranBox>
        <Text bold color="#3A6073" size="20px">
          앗, 혹시 아직 로그인 전이신가요? <br />
          로그인후에 게시글을 작성할 수 있어요!
        </Text>
        <Button text="로그인 하기" clickHandler={goBack} />
      </WranBox>
    );
  }

  return (
    <SectionWrap>
      <Text>게시글 작성</Text>
      <br />
      <Fileinput type="file" value="" accept="image/png, image/jpeg" />
      <Text bold>미리보기</Text>
      <Img
        src="data:image/jpeg;base64,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"
        alt="filex"
      />
      <Label htmlFor="post">게시글 내용</Label>
      <textarea
        name="post"
        id="post"
        cols="30"
        rows="10"
        value={postText}
        onChange={saveContents}
      />
      <BtnWrap>
        <Button
          text="게시글 작성"
          clickHandler={() => {
            dispatch(postActions.addPostFB(postText));
          }}
        />
      </BtnWrap>
    </SectionWrap>
  );
}

const SectionWrap = styled.div`
  border: 1px solid pink;
  box-sizing: border-box;
  padding-top: 100px;
  /* display: flex; */
  align-items: center;
  /* text-align: center; */
  width: 100%;
  height: 100%;
`;

const WranBox = styled.div`
  padding-top: 200px;
  text-align: center;
`;
const TextEffect = styled.h3`
  float: left;
  /* color: #ffc300; */
  color: #4b6cb7;
`;

const Fileinput = styled.input`
  /* border-bottom: 1px solid black; */
  width: 100%;
`;

const Label = styled.label`
  display: block;
  /* text-align: start; */
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

// const Container = styled.div`
//   position: relative;
//   align-items: center;
//   display: flex;
//   border: 1px solid rgba(0, 0, 0, 0.3);
// `;

// const Inputs = styled.input`
//   height: 100%;
//   left: 0;
//   position: absolute;
//   top: 0;
//   width: 100%;
//   opacity: 0;
// `;

// {/* <div class="avatar">
//     <!-- Avatar image -->
//     <img class="avatar__image" src="..." />
// </div>

// .avatar {
//   /* Rounded border */
//   border-radius: 50%;
//   height: 64px;
//   width: 64px;
// }

// .avatar__image {
//   /* Rounded border */
//   border-radius: 50%;

//   /* Take full size */
//   height: 100%;
//   width: 100%;
// } */}
