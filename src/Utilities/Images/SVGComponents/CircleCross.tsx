import React from "react";
import styled from "styled-components";
import {
  SvgPropsDefault,
  SvgDefaultContainer,
} from "../../Helpers/TypedStyleHelpers";

export const SvgContainer = styled(SvgDefaultContainer)<SvgPropsDefault>``;

export const CircleSvg: React.FC<SvgPropsDefault> = (props) => (
  <SvgContainer>
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </SvgContainer>
);

export const CrossSvg: React.FC<SvgPropsDefault> = (props) => (
  <SvgContainer>
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </SvgContainer>
);
