import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

interface Props {
  load: boolean;
}

const FadingDiv = styled.div<{ active?: boolean }>`
  color: ${({ theme }) => theme.black};
  opacity: 0.5;
  display: flex;
  height: 0px;
  flex-direction: column;
  align-items: center;
  transition: 0.5s;

  ${(props) =>
    props.active &&
    css`
      height: 35px;
      margin-top: 2rem;
    `}
`;

const DelayMessageModule = ({ load }: Props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(
        "The backend host has a slow initial start, thank you for your patience."
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (load) {
    return <FadingDiv active={message !== ""}>{message}</FadingDiv>;
  } else {
    return <></>;
  }
};

export default DelayMessageModule;
