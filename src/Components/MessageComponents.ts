import styled, { css } from "styled-components";

export const MessageContainer = styled.div<{
  regular?: boolean;
  warning?: boolean;
}>`
  border-radius: 0.6rem;
  text-align: center;
  background-color: ${({ theme }) => theme.secondaryAlt};
  animation: fadeIn 75ms ease-in both;

  ${(props) => props.regular && css``};
  ${(props) =>
    props.warning &&
    css`
      background-color: ${({ theme }) => theme.warning};
      color: ${({ theme }) => theme.fontColor};
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
