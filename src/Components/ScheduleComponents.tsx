import styled, { css } from "styled-components";

export const StyledTable = styled.table``;

export const StyledThead = styled.thead``;

export const StyledTbody = styled.tbody``;

export const StyledTr = styled.tr<{ head?: boolean; dateList?: boolean }>`
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  justify-items: center;

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.purple3};
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  ${(props) =>
    props.head &&
    css`
      margin: 0 18px;
      grid-template-columns: 1fr 3fr 1fr;
      padding-bottom: 12px;
    `}
  ${(props) =>
    props.dateList &&
    css`
      padding-bottom: 4px;
    `}
`;

export const StyledTh = styled.th<{
  alternate?: boolean;
  thirty?: boolean;
  heading?: boolean;
  block?: boolean;
  column?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2px;
  svg {
    height: 25px;
    width: 25px;
  }

  ${(props) =>
    props.thirty &&
    css`
      font-size: 0.7rem;
    `}
  ${(props) =>
    props.heading &&
    css`
      font-size: 1.3rem;
    `}

    ${(props) =>
    props.block &&
    css`
      &:nth-child(n + 2):nth-last-child(n + 1) {
        border-left: 1px solid rgba(255, 255, 255, 0.5);
      }
    `}
    ${(props) =>
    props.column &&
    css`
      flex-direction: column;
      p {
        font-size: 0.75rem;
      }
    `}
`;
