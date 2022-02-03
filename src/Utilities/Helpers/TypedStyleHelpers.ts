import styled from "styled-components";

export interface SvgProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  color?: string;
}

export interface SvgContainerProps {
  height?: number;
  width?: number;
  color?: string;
}

export const SvgDefaultContainer = styled.div<SvgContainerProps>`
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  & svg {
    height: ${({ height }) => (height ? `${height}px` : "100%")};
    width: ${({ width }) => (width ? `${width}px` : "100%")};
    & rect {
      height: ${({ height }) => (height ? `${height}px` : 150)};
      width: ${({ width }) => (width ? `${width}px` : 150)};
    }
  }
`;
