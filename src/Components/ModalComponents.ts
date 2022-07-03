import styled, { css } from "styled-components";

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.purple1};
  color: ${({ theme }) => theme.white1};
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 1rem;
  padding: 18px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 8px,
    rgba(255, 255, 255, 0.3) 0px 0px 4px,
    rgba(255, 255, 255, 0.05) 0px 0px 4px 1px inset;
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
  smallTopPadding?: boolean;
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
    ${(props) =>
    props.smallTopPadding &&
    css`
      margin-top: 6px;
    `}
`;

export const NavLogButtonBox = styled.div`
  padding: 6px;
  display: flex;
  gap: 6px;
`;
