import React from "react";
import styled, { css } from "styled-components";
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
  background-color: ${({ theme }) => theme.alternative};
  svg {
    height: 200px;
    width: 200px;
    stroke: ${({ theme }) => theme.primary};
    object-fit: contain;
    path {
      /* fill: ${({ theme }) => theme.primary}; */
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
    props.ownerSection &&
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
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
        rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
    `}
`;

// export const FillerImgSvg: React.FC<SvgPropsDefault> = (props) => (
//   <SvgContainer {...props}>
//     <svg preserveAspectRatio="none" viewBox="0 0 48 48">
//       <path d="M13.2 35.5 20 28.7 23.65 32.3 28 26.8 34.95 35.5ZM16 19.5Q14.55 19.5 13.525 18.475Q12.5 17.45 12.5 16Q12.5 14.55 13.525 13.525Q14.55 12.5 16 12.5Q17.45 12.5 18.475 13.525Q19.5 14.55 19.5 16Q19.5 17.45 18.475 18.475Q17.45 19.5 16 19.5ZM10 44Q7.5 44 5.75 42.25Q4 40.5 4 38V10Q4 7.5 5.75 5.75Q7.5 4 10 4H38Q40.5 4 42.25 5.75Q44 7.5 44 10V38Q44 40.5 42.25 42.25Q40.5 44 38 44ZM10 41H38Q39.3 41 40.15 40.125Q41 39.25 41 38V10Q41 8.7 40.15 7.85Q39.3 7 38 7H10Q8.75 7 7.875 7.85Q7 8.7 7 10V38Q7 39.25 7.875 40.125Q8.75 41 10 41Z" />
//     </svg>
//   </SvgContainer>
// );

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
