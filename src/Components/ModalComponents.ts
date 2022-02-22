import styled, { css } from "styled-components";

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.fontColor};
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 1rem;
  padding: 18px;
  box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.4);

  h3 {
    font-size: 1.5rem;
    padding-bottom: 18px;
  }
`;
