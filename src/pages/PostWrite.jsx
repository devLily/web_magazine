import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../features/post";
import { actionCreators as imageActions } from "../features/image";
import { Img, Button, Text, Input } from "../components/elements";
// import { storage } from "../firebase";

import styled from "styled-components";

export default function PostWrite(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isUploading = useSelector((state) => state.image.isUpload);
  const preview = useSelector((state) => state.image.preview);
  const postList = useSelector((state) => state.post.list);

  const fileInput = useRef();

  const { history } = props;
  const postId = props.match.params.id;
  const isEdit = postId ? true : false;

  const post = isEdit ? postList.find((post) => post.id === postId) : null;
  const [postText, setPostText] = useState(post ? post.contents : "");

  console.log("post", post);

  useEffect(() => {
    if (isEdit && !post) {
      alert("포스트 정보가 없습니다");
      history.goBack();

      return;
    }

    if (isEdit) {
      dispatch(imageActions.setPreview(post.imageURL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    history.replace("/login");
  };

  const saveContents = (e) => {
    setPostText(e.target.value);
  };

  const selectFile = (e) => {
    console.log(e.target.files);
    if (fileInput.current) {
      console.log(fileInput.current.files);
    }
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    if (!fileInput.current || !fileInput.current.files.length) {
      alert("업로드할 파일을 선택해주세요");
      return;
    }

    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  const sendPost = () => {
    if (!isEdit) {
      dispatch(postActions.addPostFB(postText));
      return;
    }

    dispatch(postActions.editPostFB(post.id, { ...post, contents: postText }));
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
      <Text>{isEdit ? "게시글 수정" : "게시글 작성"}</Text>
      <br />
      <Input
        type="file"
        inputRef={fileInput}
        inputHandler={selectFile}
        disabled={isUploading}
        accept="image/png, image/jpeg"
      />
      <Button text="업로드하기" clickHandler={uploadFB} />
      <Text bold>미리보기</Text>
      <Img
        shape="rectangle"
        src={preview ? preview : "http://via.placeholder.com/400X300"}
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
          text={isEdit ? "게시글 수정" : "게시글 작성"}
          clickHandler={sendPost}
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
// const TextEffect = styled.h3`
//   float: left;
//   /* color: #ffc300; */
//   color: #4b6cb7;
// `;

// const Fileinput = styled.input`
//   /* border-bottom: 1px solid black; */
//   width: 100%;
// `;

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
