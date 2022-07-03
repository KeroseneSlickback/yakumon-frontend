import styled, { css } from "styled-components";

interface Props {
  message: string;
  warning: boolean;
}

export const MessageBox = styled.div<{
  marginTop?: boolean;
  absolute?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 16px;
    `}

  ${(props) =>
    props.absolute &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
    `}
`;

const MessageContainer = styled.div<{
  warning?: boolean;
}>`
  border-radius: 0.5rem;
  text-align: center;
  background-color: ${({ theme }) => theme.green4};
  animation: fadeIn 75ms ease-in both;

  ${(props) =>
    props.warning &&
    css`
      background-color: ${({ theme }) => theme.red1};
      color: ${({ theme }) => theme.white1};
    `};

  @keyframes fadeIn {
    from {
      opacity: 0;
      margin: 0;
      padding: 0;
      transform: translate3d(0, -10%, 0);
    }
    to {
      opacity: 1;
      padding: 10px;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const RegularMessage = ({ message, warning }: Props) => {
  if (warning) {
    return <MessageContainer warning>{message}</MessageContainer>;
  } else {
    return <MessageContainer>{message}</MessageContainer>;
  }
};

export default RegularMessage;
