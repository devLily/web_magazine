import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { actionCreators as userActions } from "../features/user";
import { mailRegCheck } from "../utils/validation";

import { Input, InputWrap, Button } from "../components/elements";

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

  const signUpAccount = (e) => {
    const { name, value } = e.target;
    setSignUpInput({
      ...signUpInput,
      [name]: value,
    });
  };

  const saveSignupDB = () => {
    if (!mailRegCheck(id) || !id) {
      alert("이메일 형식을 다시 확인해주세요!");
      return;
    }
    if (!nickName) {
      alert("사용하실 닉네임을 입력해주세요!");
      return;
    }
    if (!pwd || pwd.length < 5) {
      alert("비밀번호 입력란을 다시 확인해주세요!");
      return;
    }
    if (pwd !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    dispatch(userActions.signupFB(id, pwd, nickName));
  };

  return (
    <SubmitArea>
      <InputWrap>
        <Input
          labelText="아이디"
          type="email"
          inputName="id"
          inputValue={id}
          placeholder="email을 입력해 주십시오"
          inputHandler={signUpAccount}
        />
      </InputWrap>
      <InputWrap>
        <Input
          labelText="닉네임"
          type="text"
          inputName="nickName"
          inputValue={nickName}
          placeholder="사용하실 닉네임을 입력해 주십시오"
          inputHandler={signUpAccount}
        />
      </InputWrap>
      <InputWrap>
        <Input
          labelText="비밀번호"
          type="password"
          inputName="pwd"
          inputValue={pwd}
          placeholder="패스워드를 입력해 주십시오"
          inputHandler={signUpAccount}
        />
      </InputWrap>
      <InputWrap>
        <Input
          labelText="비밀번호확인"
          type="password"
          inputName="confirmPwd"
          inputValue={confirmPwd}
          placeholder="패스워드를 한번 더 입력해 주십시오"
          inputHandler={signUpAccount}
        />
      </InputWrap>
      <Button text="회원가입하기" clickHandler={saveSignupDB} />
    </SubmitArea>
  );
}

const SubmitArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 150px;
`;
