import React from "react";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { getCookie, setCookie, deleteCookie } from "../utils/Cookie";
import styled from "styled-components";

export default function Login(props) {
  const login = () => {
    console.log("getCookie", getCookie("userPwd"));
    setCookie("userId", "felix", 3);
    setCookie("userPwd", "abcd", 3);
    // deleteCookie("userPwd");
  };
  return (
    // <form action="/">
    <>
      <Input
        labelText="아이디"
        type="text"
        inputName="id"
        // inputValue={id}
        placeholder="id를 입력해 주십시오"
        // inputHandler={setLoginAccount}
      />
      <Input
        labelText="비밀번호"
        type="password"
        inputName="pwd"
        // inputValue={pwd}
        placeholder="패스워드를 입력해 주십시오"
        // inputHandler={setLoginAccount}
      />
      {/* <Button clickHandler={deleteCookie("userPwd")} /> */}
      <Button clickHandler={login} />
    </>
    // </form>
  );
}
