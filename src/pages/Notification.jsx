import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { realtime } from "../firebase";

import Card from "../components/common/Card";

export default function Notification(props) {
  const [notiList, setNotiList] = React.useState([]);
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!userInfo) return;

    const notiDB = realtime.ref(`noti/${userInfo.uid}/list`);

    const notificationSnaps = notiDB.orderByChild("insertDate");

    notificationSnaps.once("value", (snapshot) => {
      if (snapshot.exists()) {
        const noti = snapshot.val();
        const newNotiList = Object.keys(noti)
          .reverse()
          .map((shot) => {
            return noti[shot];
          });
        setNotiList(newNotiList);
      }
    });
  }, [userInfo]);

  return (
    <React.Fragment>
      {notiList.map((noti) => {
        return <Card {...noti} key={noti.postId} />;
      })}
    </React.Fragment>
  );
}
