import styled, { css } from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 28px;
`;

export const StyledThead = styled.thead``;

export const StyledTbody = styled.tbody``;

export const StyledTr = styled.tr<{ head?: boolean }>`
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  justify-items: center;
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.primary};
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
  ${(props) =>
    props.head &&
    css`
      grid-template-columns: repeat(3, 1fr);
      padding-bottom: 16px;
    `}
`;

export const StyledTh = styled.th<{
  alternate?: boolean;
  thirty?: boolean;
  heading?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px 0;
  svg {
    height: 24px;
    width: 24px;
  }

  ${(props) =>
    props.thirty &&
    css`
      font-size: 0.7rem;
    `}
  ${(props) =>
    props.heading &&
    css`
      font-size: 1.4rem;
    `}
`;
