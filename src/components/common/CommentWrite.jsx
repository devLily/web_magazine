import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { actionCreators as commentActions } from "../../features/comment";

import { Input, Button } from "../elements";

export default function CommentWrite({ postId }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleChangeComment = ({ target }) => {
    setCommentText(target.value);
  };

  const handleKeyDown = (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      writeComment();
    }
  };

  const writeComment = () => {
    if (!commentText) {
      alert("댓글을 입력해주세요!");
      return;
    }
    // 파이어스토어에 추가합니다.
    dispatch(commentActions.addCommentFB(postId, commentText));
    // 입력된 텍스트는 지우기!
    setCommentText("");
  };

  return (
    <React.Fragment>
      <div>
        <Input
          type={"text"}
          inputName={"comment"}
          inputValue={commentText}
          placeholder={"댓글 내용을 입력해주세요 :)"}
          inputHandler={handleChangeComment}
          inputKeyDown={handleKeyDown}
        />
        <Button text="댓글쓰기" clickHandler={writeComment} />
      </div>
    </React.Fragment>
  );
}
