import React from "react";
import styled from "styled-components";
import { theme } from "../../Styles/Variables";

export interface SvgPropsDefault {
  width?: number;
  height?: number;
  applicable?: boolean;
  possibleHead?: boolean;
  chosen?: boolean;
  storeImg?: boolean;
  ownerSection?: boolean;
}

export interface SvgProps extends SvgPropsDefault {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

// export interface SvgPropsDefault {
//   height?: number;
//   width?: number;
// }

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
    fill: ${({ theme }) => theme.hero};
    & rect {
      fill: "#a08ec2";
    }
  }
`;

// export const SvgIcon: React.FC<SvgProps> = (props) => {
//   const { Icon } = props;
//   return (
//     <SvgContainer {...props}>
//       <Icon />
//     </SvgContainer>
//   );
// };
