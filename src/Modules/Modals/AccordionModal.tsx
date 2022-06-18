import { useRef, useState } from "react";
import styled from "styled-components";

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
    margin: 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    a {
      text-decoration: none;
    }
    div {
      border: none;
    }
  }
`;

interface AccordionProps {
  buttonMessage: string;
  children: React.ReactNode | React.ReactNode[];
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
