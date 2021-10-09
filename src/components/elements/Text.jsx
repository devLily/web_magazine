import React from "react";
import styled from "styled-components";

export default function Text(props) {
  const { bold, color, size, padding, margin, children } = props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    padding: padding,
    margin: margin,
  };
  return <P {...styles}>{children}</P>;
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "15px",
  padding: "0px",
  margin: "0px",
};

const P = styled.p`
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;
