import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { apiKey } from "../firebase";

export default function Permit(props) {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  if (isLoggedIn && isSession) {
    return <Fragment>{props.children}</Fragment>
  }

  return null;
}
