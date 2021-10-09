import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { realtime } from "../../firebase";

export default function NotiBadge() {
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
  }, [userInfo?.uid]);

  return (
    <AccountLink to={`/noti`}>
      알림
      {!isReadNoti && <Badge />}
    </AccountLink>
  );
}

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  background-color: #ffafbd;
  border-radius: 50%;
`;

const AccountLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
