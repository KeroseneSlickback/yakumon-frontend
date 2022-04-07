import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

const CheckboxInput = styled.input`
  margin: 6px 10px 5.8px 3px;
  border-radius: 2px;
  border: solid 1px #c6c4d2;
  width: 5%;
  float: left;
  background: ${(props) => (props.checked ? "#482474" : "#fbfcff")};
`;
const CheckboxContainer = styled.div`
  margin-bottom: 0px !important;
  margin-top: 2px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;
const CheckboxDescription = styled.p`
  padding-bottom: 1px;
  margin-top: 4px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  text-align: left;
`;

export const ListItem: React.FC<{
  text: string;
  handleOnChange: ChangeEventHandler;
  selected: boolean;
}> = ({ text, handleOnChange, selected }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        type="radio"
        checked={selected}
        onChange={handleOnChange}
      ></CheckboxInput>
      <CheckboxDescription>{text}</CheckboxDescription>
    </CheckboxContainer>
  );
};
