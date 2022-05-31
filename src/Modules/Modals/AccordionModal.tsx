import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { UserType } from "../../Utilities/types";

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

  &:hover {
    background-color: ${({ theme }) => theme.secondaryHighlight};
    color: ${({ theme }) => theme.fontColorAlt};
  }
`;

export const AccordionDiv = styled.div<{ height?: any }>`
  padding: 0 18px;
  background-color: ${({ theme }) => theme.alternativeAlt};
  height: 0;
  overflow: hidden;
  transition: height ease 0.2s;
  height: ${({ height }) => height}px;

  div {
    margin: 16px 0;
  }
`;

interface AccordionProps {
  buttonMessage: string;
  children: JSX.Element | JSX.Element[];
}

const AccordionModal = (props: AccordionProps) => {
  const contentEL = useRef<any>(null);
  const [height, setHeight] = useState(0);

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
      </AccordionDiv>
    </>
  );
};

export default AccordionModal;
