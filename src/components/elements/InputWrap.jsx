import React from "react";

import styled from "styled-components";

export default function InputWrap(props) {
  return <StyledInputWrap>{props.children}</StyledInputWrap>;
}
const StyledInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
