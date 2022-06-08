import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MessageContainer } from "../../Components/MessageComponents";

interface Props {
  message: string;
  warning: boolean;
}

export const MessageBox = styled.div<{ marginTop?: boolean }>`
  margin-bottom: 16px;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 16px;
    `}
`;

const RegularMessage = ({ message, warning }: Props) => {
  if (warning) {
    return <MessageContainer warning>{message}</MessageContainer>;
  } else {
    return <MessageContainer>{message}</MessageContainer>;
  }
};

export default RegularMessage;
