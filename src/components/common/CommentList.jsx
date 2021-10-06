import React from "react";
import { Grid, Image, Text } from "../elements";

export default function CommentList() {
  return (
    <React.Fragment>
      <div padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </React.Fragment>
  );
}

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <div is_flex>
      <div is_flex width="auto">
        <Image shape="circle" />
        <Text bold>{user_name}</Text>
      </div>
      <div is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </div>
    </div>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: "2021-01-01 19:00:00",
};
