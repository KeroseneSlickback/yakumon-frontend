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
`;

export const ModalH3 = styled.h3<{ paddingBottom?: boolean }>`
  font-size: 1.5rem;
  ${(props) =>
    props.paddingBottom &&
    css`
      padding-bottom: 12px;
    `}
`;

export const ButtonBox = styled.div<{
  centered?: boolean;
  sideBySide?: boolean;
  topPadding?: boolean;
}>`
  ${(props) =>
    props.centered &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}

  ${(props) =>
    props.sideBySide &&
    css`
      display: flex;
      justify-content: space-between;
    `}

    ${(props) =>
    props.topPadding &&
    css`
      margin-top: 16px;
    `}
`;

export const NavLogButtonBox = styled.div`
  padding: 6px;
  display: flex;
  gap: 6px;
`;
