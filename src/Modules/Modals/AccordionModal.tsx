import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { UserType } from "../../Utilities/types";

export const AccordionButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryAlt};
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  padding: 4px;
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
  employees: UserType[];
}

const AccordionModal = (props: AccordionProps) => {
  const contentEL = useRef<any>(null);
  const [height, setHeight] = useState(0);

  const flipFlop = () => {
    setHeight(height === 0 ? contentEL.current.scrollHeight : 0);
  };

  useEffect(() => {
    if (height > 0) {
      setHeight(contentEL.current.scrollHeight);
    }
  }, [props.employees]);
  console.log(props);

  return (
    <>
      <AccordionButton onClick={flipFlop}>View Stylists</AccordionButton>
      <AccordionDiv ref={contentEL} height={height}>
        {props.employees.map((employee, index) => {
          return (
            <div key={index}>
              <Link to={`/reservation/${employee._id}`}>
                {employee.firstName} {employee.lastName}
              </Link>
            </div>
          );
        })}
      </AccordionDiv>
    </>
  );
};

export default AccordionModal;
