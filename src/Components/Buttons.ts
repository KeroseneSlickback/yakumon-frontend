import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const TinyButton = styled.button<{
  register?: boolean;
  log?: boolean;
  faintHighlight?: boolean;
  portal?: boolean;
  warning?: boolean;
  nonConstraint?: boolean;
  bottomPadding?: boolean;
}>`
  color: ${({ theme }) => theme.fontColor};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  padding: 2px 4px;
  font-size: 0.6rem;
  border-radius: 6px;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.primaryAlt};
    color: ${({ theme }) => theme.fontColorAlt};
  }

  ${(props) =>
    props.register &&
    css`
      background-color: ${({ theme }) => theme.secondary};
      &:hover {
        background-color: ${({ theme }) => theme.secondaryAlt};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}
  ${(props) =>
    props.log &&
    css`
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.fontColor};
      &:hover {
        background-color: ${({ theme }) => theme.primaryAlt};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}

  ${(props) =>
    props.portal &&
    css`
      padding: 6px 8px;
      background-color: ${({ theme }) => theme.secondary};
      &:hover {
        background-color: ${({ theme }) => theme.secondaryAlt};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}

    ${(props) =>
    props.warning &&
    css`
      background-color: ${({ theme }) => theme.warning};
      &:hover {
        background-color: ${({ theme }) => theme.warningAlt};
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}

    ${(props) =>
    props.nonConstraint &&
    css`
      align-self: center;
    `}

    ${(props) =>
    props.bottomPadding &&
    css`
      margin-bottom: 12px;
    `}
`;

export const SmallButton = styled(TinyButton)`
  padding: 4px 8px;
  font-size: 0.75rem;
`;

export const MediumButton = styled(TinyButton)`
  padding: 8px 16px;
  font-size: 1rem;
`;

export const LargeButton = styled(TinyButton)`
  padding: 12px 24px;
  font-size: 1.4rem;
`;

export const CenterButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReserveButton = styled(TinyButton)`
  padding: 8px 50px;
  font-size: 1.3rem;
`;

export const ClosedButtonDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const CloseButton = styled.button`
  background-color: inherit;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  &:hover:after,
  &:hover:before {
    background-color: ${(props) => props.theme.fontColor};
  }

  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 20px;
    width: 2px;
    background-color: ${(props) => props.theme.fontColor};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const ScheduleButton = styled(TinyButton)`
  background-color: ${({ theme }) => theme.primaryAlt};
  padding: 6px 10px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScheduleBlankButton = styled.button<{
  applicable?: boolean;
  possibleHead?: boolean;
  chosen?: boolean;
}>`
  background-color: inherit;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: none;
  padding: none;

  @keyframes pulseGreen {
    0% {
      box-shadow: 0 0 1px 2px rgba(168, 240, 208, 0.8);
    }
    50% {
      box-shadow: 0 0 1px 2px rgba(168, 240, 208, 1);
    }
    100% {
      box-shadow: 0 0 1px 2px rgba(168, 240, 208, 0.8);
    }
  }

  ${(props) =>
    props.chosen &&
    css`
      animation: pulseGreen 1.5s ease-in-out infinite;
    `}
`;

export const StyledLinkButton = styled(Link)`
  color: ${({ theme }) => theme.fontColor};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.secondaryAlt};
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 6px;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.secondaryHighlight};
    color: ${({ theme }) => theme.fontColorAlt};
  }
`;

export const EditDeleteButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 12px 0 4px 0;
`;

export const EmptyButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
  text-decoration: none;
`;
