import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";

const CheckboxDescription = styled.label<{
  checked?: boolean;
  services?: boolean;
}>`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 40px;
  padding: 8px 12px;
  cursor: pointer;
  p {
    font-size: 0.9rem;
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }
  &:last-child {
    border-radius: 0 0 6px 6px;
  }
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.fontColor};
  }

  /* ${(props) => props.services && css``} */

  ${(props) =>
    props.checked &&
    css`
      color: ${({ theme }) => theme.fontColorAlt};
      background-color: ${({ theme }) => theme.highlight};
      &:nth-child(even) {
        background-color: ${({ theme }) => theme.highlight};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}
`;

const CheckboxInput = styled.input`
  opacity: 0;
  position: fixed;
  width: 0;
`;

export const ListItem: React.FC<{
  text1: string;
  text2: number | string;
  handleOnChange: ChangeEventHandler;
  selected: string;
  id: string | undefined;
  services?: boolean;
}> = ({ text1, text2, handleOnChange, selected, id, services }) => {
  if (services) {
    return (
      <CheckboxDescription checked={id === selected ? true : false} services>
        <CheckboxInput
          type="radio"
          checked={id === selected ? true : false}
          onChange={handleOnChange}
        ></CheckboxInput>
        <p>{text1}</p>
        <p>${text2}</p>
      </CheckboxDescription>
    );
  } else {
    return (
      <CheckboxDescription checked={id === selected ? true : false}>
        <CheckboxInput
          type="radio"
          checked={id === selected ? true : false}
          onChange={handleOnChange}
        ></CheckboxInput>
        <p>
          {text1} {text2}
        </p>
      </CheckboxDescription>
    );
  }
};
