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
  children: React.ReactNode | React.ReactNode[];
  storeID: string;
}

const AccordionModal = (props: AccordionProps) => {
  const contentEL = useRef<any>(null);
  const [height, setHeight] = useState(0);

  const flipFlop = () => {
    console.log(contentEL.current.scrollHeight);
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
