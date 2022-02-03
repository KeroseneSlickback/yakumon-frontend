import React from "react";
import styled from "styled-components";

export const SvgContainer = styled.div<{
  height?: number;
  width?: number;
}>`
  height: 50px;
  width: 50px;
  & svg {
    height: ${(props) => (props.height ? `${props.height}px` : "100%")};
    width: ${(props) => (props.height ? `${props.height}px` : "100%")};
  }
`;

interface SvgProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
}

export const SvgIcon: React.FC<SvgProps> = (props) => {
  const { Icon } = props;
  return (
    <SvgContainer {...props}>
      <Icon />
    </SvgContainer>
  );
};
