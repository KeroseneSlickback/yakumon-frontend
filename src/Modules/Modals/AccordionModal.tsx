import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { BackDrop } from "../../Components/Backdrop";
import { SmallButton } from "../../Components/Buttons";
import { UserType } from "../../Utilities/types";
import AddEmployeeModal from "./AddEmployeeModal";

export const AccordionButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryAlt};
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  padding: 6px;
  width: 100%;
  align-self: center;
  border: none;
  outline: none;
  transition: 0.2s;
  border-radius: 0.4rem;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHighlight};
    color: ${({ theme }) => theme.fontColorAlt};
  }
`;

export const AccordionDiv = styled.div<{ height?: any }>`
  padding: 0px 18px;
  background-color: ${({ theme }) => theme.alternativeAlt};
  overflow: hidden;
  transition: height ease 0.2s;
  height: ${({ height }) => height}px;
  border-radius: 0.4rem;

  div {
    margin: 16px 0 4px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    button {
      margin-left: 2px;
    }
  }
`;

interface AccordionProps {
  buttonMessage: string;
  children: JSX.Element | JSX.Element[];
  storeID: string;
}

const AccordionModal = (props: AccordionProps) => {
  const contentEL = useRef<any>(null);
  const [height, setHeight] = useState(0);
  const [addEmployee, setAddEmployee] = useState(false);

  const toggleModal = () => {
    setAddEmployee((prev) => !prev);
  };

  const flipFlop = () => {
    setHeight(height === 0 ? contentEL.current.scrollHeight : 0);
  };

  return (
    <>
      <AccordionButton onClick={flipFlop}>
        {props.buttonMessage}
      </AccordionButton>
      <AccordionDiv ref={contentEL} height={height}>
        {props.children}
        <SmallButton onClick={toggleModal} bottomPadding>
          Add Employee
        </SmallButton>
      </AccordionDiv>
      {addEmployee ? <BackDrop onClick={toggleModal} /> : null}
      {addEmployee ? (
        <AddEmployeeModal toggleModal={toggleModal} storeId={props.storeID} />
      ) : null}
    </>
  );
};

export default AccordionModal;
