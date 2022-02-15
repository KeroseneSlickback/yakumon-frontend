import styled, { css } from "styled-components";

export const TinyButton = styled.button`
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
`;

export const SmallButton = styled(TinyButton)`
  padding: 4px 8px;
  font-size: 0.75rem;
`;

export const MediumButton = styled(TinyButton)`
  padding: 8px 16px;
  font-size: 1rem;
`;
