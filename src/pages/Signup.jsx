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

  const signUpAccount = (e) => {
    const { name, value } = e.target;
    setSignUpInput({
      ...signUpInput,
      [name]: value,
    });
  };

  const saveSignupDB = (props) => {
    if (pwd !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    //console.log("id:", id, "pwd:", pwd, "nickName:", nickName);
    dispatch(userActions.signupFB(id, pwd, nickName));
  };

  return (
    <SubmitArea>
      <Input
        labelText="아이디"
        type="email"
        inputName="id"
        inputValue={id}
        placeholder="email을 입력해 주십시오"
        inputHandler={signUpAccount}
      />
      <Input
        labelText="닉네임"
        type="text"
        inputName="nickName"
        inputValue={nickName}
        placeholder="사용하실 닉네임을 입력해 주십시오"
        inputHandler={signUpAccount}
      />
      <Input
        labelText="비밀번호"
        type="password"
        inputName="pwd"
        inputValue={pwd}
        placeholder="패스워드를 입력해 주십시오"
        inputHandler={signUpAccount}
      />
      <Input
        labelText="비밀번호"
        type="password"
        inputName="confirmPwd"
        inputValue={confirmPwd}
        placeholder="패스워드를 한번 더 입력해 주십시오"
        inputHandler={signUpAccount}
      />
      <Button text="회원가입하기" clickHandler={saveSignupDB} />
    </SubmitArea>
  );
}

const SubmitArea = styled.div`
  /* border: 1px solid black; */
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 150px;
  /* align-content: center; */
`;

//   return (
//     <>
//       <Input />
//       <Input />
//       <Button clickHandler={saveSignupDB}>회원가입하기</Button>
//     </>
//   );
// }
