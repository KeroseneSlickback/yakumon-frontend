import React from "react";
import styled, { css } from "styled-components";
import { devices } from "../../../Styles/Variables";
import {
  SvgDefaultContainer,
  SvgPropsDefault,
} from "../../Helpers/TypedStyleHelpers";

const SvgContainer = styled(SvgDefaultContainer)<SvgPropsDefault>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 200px;
  border-radius: 1rem 1rem 0 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.white1};
  svg {
    height: 200px;
    width: 200px;
    stroke: ${({ theme }) => theme.purple1};
    object-fit: contain;
    path {
    }
  }
  ${(props) =>
    props.storeImg &&
    css`
      z-index: 0;
      object-fit: cover;
      border-radius: 1rem 1rem 0 0;
      svg {
        height: 200px;
        width: 500px;
        z-index: 0;
        object-fit: cover;
        border-radius: 1rem 1rem 0 0;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px,
          rgba(0, 0, 0, 0.3) 0px 0px 4px,
          rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
      }
    `}
  ${(props) =>
    props.rearPortal &&
    css`
      width: 160px;
      height: 160px;
      border-radius: 1rem;
    `}

    ${(props) =>
    props.stylist &&
    css`
      height: 120px;
      width: 120px;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
        rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;

      @media ${devices.mobileM} {
        height: 160px;
        width: 160px;
      }
    `}
`;

export const FillerImgSvg: React.FC<SvgPropsDefault> = (props) => (
  <SvgContainer {...props}>
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </SvgContainer>
);
