import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { realtime } from "../../firebase";

import styled from "styled-components";

export default function NotiBadge(props) {
  const userInfo = useSelector((state) => state.user.user);
  const [isReadNoti, setIReadNoti] = useState(true);

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${userInfo?.uid}`);

    notiDB.on("value", (snapshot) => {
      if (snapshot.val()) {
        setIReadNoti(snapshot.val().read);
      }
    });

    return () => notiDB.off();
  }, []);

  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${userInfo?.uid}`);
    notiDB.update({ read: true });
  };

  return (
    <AccountLink to={`/noti`} onClick={notiCheck}>
      알림
      {!isReadNoti && <Badge />}
    </AccountLink>
  );
}

const Badge = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  right: -5px;
  top: -5px;
  line-height: 24px;
  background-color: #ffafbd;
  border-radius: 50%;
`;

const AccountLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
