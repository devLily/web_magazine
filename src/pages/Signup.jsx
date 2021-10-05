import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../features/user";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
// import { getCookie, setCookie, deleteCookie } from "../utils/Cookie";

import styled from "styled-components";

export default function Signup(props) {
  const dispatch = useDispatch();
  const [signUpInput, setSignUpInput] = useState({
    id: "",
    nickName: "",
    pwd: "",
    confirmPwd: "",
  });

  const { id, nickName, pwd, confirmPwd } = signUpInput;

  const SignUpAccount = (e) => {
    const { name, value } = e.target;
    setSignUpInput({
      ...signUpInput,
      [name]: value,
    });
  };

  const saveSignupDB = (props) => {
    dispatch(userActions.signupFB(id, nickName, pwd));
  };
  return (
    <>
      <Input />
      <Input />
      <Button clickHandler={saveSignupDB}>회원가입하기</Button>
    </>
  );
}
