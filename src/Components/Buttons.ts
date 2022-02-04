import styled, { ThemeConsumer } from "styled-components";

export const SmallButton = styled.button`
  color: ${({ theme }) => theme.fontColor};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.alternative};
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.alternativeAlt};
    color: ${({ theme }) => theme.fontColorAlt};
  }
`;
