import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";

const CheckboxDescription = styled.label<{ checked?: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 40px;
  padding: 8px 12px;
  /* border-radius: 6px; */
  cursor: pointer;
  p {
    font-size: 0.9rem;
  }
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.fontColor};
    ${(props) =>
      props.checked &&
      css`
        background-color: ${({ theme }) => theme.highlight};
      `}
  }
  &:first-child {
    border-radius: 6px 6px 0 0;
  }
  &:last-child {
    border-radius: 0 0 6px 6px;
  }
  ${(props) =>
    props.checked &&
    css`
      background-color: ${({ theme }) => theme.highlight};
    `}
`;

const CheckboxInput = styled.input`
  opacity: 0;
  position: fixed;
  width: 0;
`;

export const ListItem: React.FC<{
  text1: string;
  text2: number;
  handleOnChange: ChangeEventHandler;
  selected: string;
  id: string;
}> = ({ text1, text2, handleOnChange, selected, id }) => {
  return (
    <CheckboxDescription checked={id === selected ? true : false}>
      <CheckboxInput
        type="radio"
        checked={id === selected ? true : false}
        onChange={handleOnChange}
      ></CheckboxInput>
      <p>{text1}</p>
      <p>${text2}</p>
    </CheckboxDescription>
  );
};
