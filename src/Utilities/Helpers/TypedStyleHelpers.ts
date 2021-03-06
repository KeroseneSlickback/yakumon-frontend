import React from "react";
import styled from "styled-components";

export interface SvgPropsDefault {
  width?: number;
  height?: number;
  applicable?: boolean;
  possibleHead?: boolean;
  chosen?: boolean;
  storeImg?: boolean;
  rearPortal?: boolean;
  stylist?: boolean;
}

export interface SvgProps extends SvgPropsDefault {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const SvgDefaultContainer = styled.div<SvgPropsDefault>`
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  & svg {
    height: ${({ height }) => (height ? `${height}px` : "100%")};
    width: ${({ width }) => (width ? `${width}px` : "100%")};
    & path {
      height: ${({ height }) => (height ? `${height}px` : "100%")};
      width: ${({ width }) => (width ? `${width}px` : "100%")};
    }
  }
`;

export const SvgContainer = styled(SvgDefaultContainer)<SvgPropsDefault>`
  & svg {
    fill: ${({ theme }) => theme.green1};
    & rect {
      fill: "#a08ec2";
    }
  }
`;
