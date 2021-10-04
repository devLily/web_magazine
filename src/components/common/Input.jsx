import React from "react";
import styled from "styled-components";

export default function Input(props) {
  const { labelText, type, inputName, inputValue, placeholder, inputHandler } =
    props;
  return (
    <InputWrap>
      <InputLabel htmlFor={inputName}>{labelText}</InputLabel>
      <Inputs
        type={type}
        name={inputName}
        value={inputValue}
        placeholder={placeholder}
        onChange={inputHandler}
        // required
        autoFocus
      />
    </InputWrap>
  );
}

const InputWrap = styled.div`
  /* width: 300px;
  padding: 10px;
  margin: 20px;
  border-top: none;
  border-left: none;
  border-right: none; */
`;

const InputLabel = styled.label`
  display: block;
`;

const Inputs = styled.input`
  width: 300px;
  padding: 10px;
  margin: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  &:required {
    border-color: #ffb319;
    &:invalid {
      border-color: #ffb319;
    }
  }
`;
