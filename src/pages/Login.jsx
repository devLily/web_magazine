import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { actionCreators as userActions } from "../features/user";
import { mailRegCheck } from "../utils/validation";

import { Input, InputWrap, Button } from "../components/elements";

import styled from "styled-components";

export default function Login(props) {
  const dispatch = useDispatch();

  const [loginInput, setLoginInput] = useState({
    id: "",
    pwd: "",
  });

  const { id, pwd } = loginInput;

  const loginAccount = (e) => {
    const { name, value } = e.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveLoginDB();
    }
  };

  const saveLoginDB = () => {
    if (!mailRegCheck(id) || !id) {
      alert("이메일 형식을 다시 확인해주세요!");
      return;
    }
    if (!pwd || pwd.length < 5) {
      alert("비밀번호 입력란을 다시 확인해주세요!");
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <SubmitArea>
      <InputWrap>
        <Input
          labelText="아이디"
          type="text"
          inputName="id"
          inputValue={id}
          placeholder="email을 입력해 주십시오"
          inputHandler={loginAccount}
          inputKeyDown={handleKeyDown}
        />
      </InputWrap>
      <InputWrap>
        <Input
          labelText="비밀번호"
          type="password"
          inputName="pwd"
          inputValue={pwd}
          placeholder="패스워드를 입력해 주십시오"
          inputHandler={loginAccount}
          inputKeyDown={handleKeyDown}
        />
      </InputWrap>
      <Button text="로그인하기" clickHandler={saveLoginDB} />
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
