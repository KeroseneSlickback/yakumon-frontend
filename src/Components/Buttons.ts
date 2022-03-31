import styled, { css } from "styled-components";

export const TinyButton = styled.button<{ register?: boolean; log?: boolean }>`
  color: ${({ theme }) => theme.fontColor};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  padding: 2px 4px;
  font-size: 0.6rem;
  border-radius: 6px;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.primaryAlt};
    color: ${({ theme }) => theme.fontColorAlt};
  }

  ${(props) =>
    props.register &&
    css`
      background-color: ${({ theme }) => theme.secondary};
      &:hover {
        background-color: ${({ theme }) => theme.secondaryAlt};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}
  ${(props) =>
    props.log &&
    css`
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.fontColor};
      &:hover {
        background-color: ${({ theme }) => theme.primaryAlt};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}
`;

export const SmallButton = styled(TinyButton)`
  padding: 4px 8px;
  font-size: 0.75rem;
`;

export const MediumButton = styled(TinyButton)`
  padding: 8px 16px;
  font-size: 1rem;
`;

export const ReserveButton = styled(TinyButton)`
  padding: 8px 50px;
  font-size: 1.3rem;
`;

export const ClosedButtonDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const CloseButton = styled.button`
  background-color: inherit;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  &:hover:after,
  &:hover:before {
    background-color: ${(props) => props.theme.fontColor};
  }

  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 20px;
    width: 2px;
    background-color: ${(props) => props.theme.fontColor};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
