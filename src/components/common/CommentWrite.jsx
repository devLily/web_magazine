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
    if (e.key === "Enter") {
      writeComment();
    }
  };

  const writeComment = () => {
    if (!commentText) {
      alert("댓글을 입력해주세요!");
      return;
    }
    dispatch(commentActions.addCommentFB(postId, commentText));
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
