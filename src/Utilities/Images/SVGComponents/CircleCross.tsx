import React from "react";
import styled, { css } from "styled-components";
import {
  SvgPropsDefault,
  SvgDefaultContainer,
} from "../../Helpers/TypedStyleHelpers";

const SvgContainer = styled(SvgDefaultContainer)<SvgPropsDefault>`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    ${(props) =>
      props.applicable &&
      css`
        stroke; #ffffff;
      `}

    ${(props) =>
      props.possibleHead &&
      css`
        stroke: #ffffff;
      `}
  }
`;

export const CircleSvg: React.FC<SvgPropsDefault> = (props) => (
  <SvgContainer {...props}>
    <svg fill="none" viewBox="0 0 24 24" stroke="#CCCCCC" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </SvgContainer>
);

export const CrossSvg: React.FC<SvgPropsDefault> = (props) => (
  <SvgContainer {...props}>
    <svg fill="none" viewBox="0 0 24 24" stroke="#666666" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </SvgContainer>
);
