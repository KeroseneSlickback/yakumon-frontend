import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";

const CheckboxDescription = styled.label<{
  checked?: boolean;
  guest?: boolean;
}>`
  display: grid;
  width: 100%;
  grid-template-columns: 0.75fr 1fr 40px;
  padding: 8px 12px;
  cursor: pointer;
  p {
    font-size: 0.9rem;
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.white1};
  }

  &:hover {
    background-color: ${({ theme }) => theme.green6};
  }

  ${(props) =>
    props.checked &&
    css`
      color: ${({ theme }) => theme.black};
      background-color: ${({ theme }) => theme.green5};
      &:nth-child(even) {
        background-color: ${({ theme }) => theme.green5};
        color: ${({ theme }) => theme.black};
      }
    `}

  ${(props) =>
    props.guest &&
    css`
      background-color: ${({ theme }) => theme.purple1};
      color: ${({ theme }) => theme.white1};
      &:first-child {
        border-radius: 0.5rem;
      }
      &:hover {
        background-color: ${({ theme }) => theme.purple2};
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
  text3?: number | string;
  handleOnChange: ChangeEventHandler;
  selected: string;
  id: string | undefined;
  services?: boolean;
  guest?: boolean;
}> = ({
  text1,
  text2,
  text3,
  handleOnChange,
  selected,
  id,
  services,
  guest,
}) => {
  if (services) {
    return (
      <CheckboxDescription checked={id === selected ? true : false}>
        <CheckboxInput
          type="radio"
          checked={id === selected ? true : false}
          onChange={handleOnChange}
        ></CheckboxInput>
        <p>{text1}</p>
        <p>{text2}</p>
        <p>${text3}</p>
      </CheckboxDescription>
    );
  } else {
    return (
      <CheckboxDescription
        checked={id === selected ? true : false}
        guest={guest ? true : false}
      >
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
