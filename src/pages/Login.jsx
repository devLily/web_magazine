import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import { getCookie, setCookie, deleteCookie } from "../utils/Cookie";
import { actionCreators as userActions } from "../features/user";

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
    //console.log(loginUser.id);
  };

  const saveLoginDB = () => {
    dispatch(userActions.loginFB(id, pwd));
    // console.log("getCookie", getCookie("userPwd"));
    // setCookie("userId", "felix", 3);
    // setCookie("userPwd", "abcd", 3);
    // deleteCookie("userPwd");
  };

  return (
    <SubmitArea>
      <Input
        labelText="아이디"
        type="text"
        inputName="id"
        inputValue={id}
        placeholder="email을 입력해 주십시오"
        inputHandler={loginAccount}
      />
      <Input
        labelText="비밀번호"
        type="password"
        inputName="pwd"
        inputValue={pwd}
        placeholder="패스워드를 입력해 주십시오"
        inputHandler={loginAccount}
      />
      <Button text="로그인하기" clickHandler={saveLoginDB} />
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
  //height: 500px;
`;

//return (
//     <form action="/">
//     <>
//       <Input
//         labelText="아이디"
//         type="text"
//         inputName="id"
//         inputValue={id}
//         placeholder="id를 입력해 주십시오"
//         inputHandler={setLoginAccount}
//       />
//       <Input
//         labelText="비밀번호"
//         type="password"
//         inputName="pwd"
//         inputValue={pwd}
//         placeholder="패스워드를 입력해 주십시오"
//         inputHandler={setLoginAccount}
//       />
//       <Button clickHandler={deleteCookie("userPwd")} />
//       <Button clickHandler={saveLoginDB} />
//     </>
//     </form>
//   );
// }
