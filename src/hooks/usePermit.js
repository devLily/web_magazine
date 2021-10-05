import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiKey } from "../firebase";

function usePermit() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  const [isPermitted] = useState(isLoggedIn && isSession);
  return [isPermitted];
}

export default usePermit;
