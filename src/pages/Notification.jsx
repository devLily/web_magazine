import React from "react";

import Card from "../components/common/Card";

export default function Notification(props) {
  const noti = [
    { userName: "bbokari", postId: "post1" },
    { userName: "mean0", postId: "post2" },
    { userName: "mean0", postId: "post3" },
    { userName: "mean0", postId: "post4" },
  ];

  return (
    <React.Fragment>
      {noti.map((n) => {
        return <Card {...n} key={n.post_id} />;
      })}
    </React.Fragment>
  );
}
