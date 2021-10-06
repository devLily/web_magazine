import React from "react";
import styled from "styled-components";

export default function Button(props) {
  const { text, clickHandler } = props;

  return (
    <>
      <CommonButton onClick={clickHandler}> {text}</CommonButton>
    </>
  );
}

const CommonButton = styled.button`
  width: 150px;
  padding: 10px;
  margin: 20px;
  border: 0;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  transition: 0.4s ease-in;
  z-index: 1;
  &::before {
    background: #ff96ad;
    content: "";
    z-index: -1;
  }
  &::after {
    background: #ff96ad;
    content: "";
    z-index: -1;
  }
  &:hover {
    border: 2px solid #ff96ad;
    color: #ff96ad;
    background-color: #17181c;
  }
`;
