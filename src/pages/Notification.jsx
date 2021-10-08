import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { realtime } from "../firebase";

import Card from "../components/common/Card";

export default function Notification(props) {
  const [notiList, setNotiList] = React.useState([]);
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    const notiDB = realtime.ref(`noti/${userInfo.uid}/list`);

    // firebase realtime database는 내림차순 정렬을 지원하지 않아요!
    // 데이터를 가져온 후 직접 역순으로 내보내야 합니다!
    const notificationSnaps = notiDB.orderByChild("insert_dt");

    notificationSnaps.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let noti = snapshot.val();

        // reserse()는 배열을 역순으로 뒤집어줘요.
        const newNotiList = Object.keys(noti)
          .reverse()
          .map((s) => {
            return noti[s];
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
