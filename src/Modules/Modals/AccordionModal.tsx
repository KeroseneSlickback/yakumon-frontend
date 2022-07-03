import { useRef, useState } from "react";
import styled from "styled-components";

export const AccordionButton = styled.button`
  background-color: ${({ theme }) => theme.green3};
  color: ${({ theme }) => theme.white1};
  cursor: pointer;
  padding: 6px;
  width: 100%;
  align-self: center;
  border: none;
  outline: none;
  transition: 0.2s;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.green4};
    color: ${({ theme }) => theme.black};
  }
`;

export const AccordionDiv = styled.div<{ height?: any }>`
  padding: 0px 18px;
  background-color: ${({ theme }) => theme.white2};
  overflow: hidden;
  transition: height ease 0.2s;
  height: ${({ height }) => height}px;
  border-radius: 0.5rem;

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
