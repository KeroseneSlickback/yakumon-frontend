import { useState } from "react";
import styled, { css } from "styled-components";

export const AccordionButton = styled.button`
  background-color: ${({ theme }) => theme.alternative};
  cursor: pointer;
  padding: 12px;
  width: 100%;
  border: none;
  outline: none;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.alternativeAlt};
  }
`;

export const AccordionDiv = styled.div<{ active?: boolean }>`
  padding: 0 18px;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 0;
  flex: 0;
  transition: all 1s ease-out;
  /* visibility: hidden; */

  ${(props) =>
    props.active &&
    css`
      height: auto;
      overflow: hidden;
      flex: 1;
      /* visibility: visible; */
    `}
`;

const AccordionModal = () => {
  const [show, setShow] = useState(false);
  const flipFlop = () => {
    setShow((prev) => !prev);
  };
  return (
    <>
      <AccordionButton onClick={flipFlop}>See Stylists</AccordionButton>
      <AccordionDiv active={show ? true : false}>
        <h1>Stylists</h1>
        <h2>Blah</h2>
        <h4>BLAHAHA</h4>
      </AccordionDiv>
    </>
  );
};

export default AccordionModal;
