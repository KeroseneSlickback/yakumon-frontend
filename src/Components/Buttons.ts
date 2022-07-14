import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { devices } from "../Styles/Variables";

export const TinyButton = styled.button<{
  register?: boolean;
  log?: boolean;
  faintHighlight?: boolean;
  portal?: boolean;
  warning?: boolean;
  nonConstraint?: boolean;
  bottomPadding?: boolean;
  disabledCheck?: boolean;
}>`
  color: ${({ theme }) => theme.white1};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.purple3};
  padding: 3px 6px;
  font-size: 0.6rem;
  border-radius: 0.33rem;
  text-decoration: none;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 1px 1px inset;
  &:hover {
    background-color: ${({ theme }) => theme.purple4};
    color: ${({ theme }) => theme.black};
  }

  ${(props) =>
    props.register &&
    css`
      background-color: ${({ theme }) => theme.green1};
      &:hover {
        background-color: ${({ theme }) => theme.green2};
        color: ${({ theme }) => theme.black};
      }
    `}
  ${(props) =>
    props.log &&
    css`
      background-color: ${({ theme }) => theme.purple3};
      color: ${({ theme }) => theme.white1};
      &:hover {
        background-color: ${({ theme }) => theme.purple4};
        color: ${({ theme }) => theme.black};
      }
    `}

  ${(props) =>
    props.portal &&
    css`
      padding: 6px 8px;
      background-color: ${({ theme }) => theme.green1};
      &:hover {
        background-color: ${({ theme }) => theme.green2};
        color: ${({ theme }) => theme.black};
      }
    `}

    ${(props) =>
    props.warning &&
    css`
      background-color: ${({ theme }) => theme.red1};
      &:hover {
        background-color: ${({ theme }) => theme.red2};
        color: ${({ theme }) => theme.white1};
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
      margin: 12px 0 12px 0;
    `}

    ${(props) =>
    props.disabledCheck &&
    css`
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.purple5};
      color: ${({ theme }) => theme.grey};
      &:hover {
        background-color: ${({ theme }) => theme.purple5};
      }
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

export const CenterButtonDiv = styled.div<{
  sideBySide?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.sideBySide &&
    css`
      justify-content: space-between;
    `}
`;

export const FlexibleButton = styled(TinyButton)`
  @media ${devices.tabletS} {
    padding: 4px 6px;
  }
  @media ${devices.tabletM} {
    font-size: 0.7rem;
  }
  @media ${devices.tabletL} {
    font-size: 0.8rem;
  }
`;

export const LargeFlexibleButton = styled(SmallButton)`
  @media ${devices.tabletS} {
    padding: 6px 8px;
  }

  @media ${devices.tabletL} {
    font-size: 0.85rem;
  }
`;

export const ReserveButton = styled(TinyButton)`
  padding: 8px 50px;
  font-size: 1.3rem;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 1px 1px inset;
`;

export const ClosedButtonDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const CloseButton = styled.button`
  background-color: inherit;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  &:hover:after,
  &:hover:before {
    background-color: ${(props) => props.theme.white1};
  }

  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 24px;
    width: 3px;
    background-color: ${(props) => props.theme.white1};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const ScheduleButton = styled(TinyButton)`
  padding: 6px 10px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 1px 1px inset;
`;

export const ScheduleBlankButton = styled.button<{
  applicable?: boolean;
  possibleHead?: boolean;
  chosen?: boolean;
  enabled?: boolean;
  offChosen?: boolean;
}>`
  ${(props) =>
    props.enabled &&
    css`
      cursor: pointer;
    `}
  background-color: inherit;
  border: none;
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

  @keyframes pulseRed {
    0% {
      box-shadow: 0 0 1px 2px rgba(155, 0, 0, 0.8);
    }
    50% {
      box-shadow: 0 0 1px 2px rgba(155, 0, 0, 1);
    }
    100% {
      box-shadow: 0 0 1px 2px rgba(155, 0, 0, 0.8);
    }
  }

  ${(props) =>
    props.chosen &&
    css`
      /* animation: pulseGreen 1.5s ease-in-out infinite; */

      box-shadow: 0 0 1px 2px rgba(168, 240, 208, 1);
    `}
  ${(props) =>
    props.offChosen &&
    css`
      /* animation: pulseRed 1.5s ease-in-out infinite; */

      box-shadow: 0 0 1px 2px rgba(155, 0, 0, 1);
    `}
`;

export const StyledLinkButton = styled(Link)`
  color: ${({ theme }) => theme.white1};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.green2};
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 2px,
    rgba(255, 255, 255, 0.1) 0px 0px 1px 1px inset;
  &:hover {
    background-color: ${({ theme }) => theme.green3};
    color: ${({ theme }) => theme.black};
  }
`;

export const EditDeleteButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 16px 0 0 0;
`;

export const EmptyButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
  text-decoration: none;
`;
