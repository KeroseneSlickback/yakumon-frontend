import styled, { css } from "styled-components";
import { devices } from "../Styles/Variables";

export const ShowcaseImg = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;

export const TopH1 = styled.h1<{
  extraPadding?: boolean;
  noPadding?: boolean;
  lessPadding?: boolean;
}>`
  padding: 8px 0 40px 0;
  font-size: 1.65rem;
  text-align: center;

  ${(props) =>
    props.extraPadding &&
    css`
      padding: 24px 18px 32px 18px;
    `}
  ${(props) =>
    props.noPadding &&
    css`
      padding: 0;
    `}
    ${(props) =>
    props.lessPadding &&
    css`
      padding: 8px 0 16px 0;
    `}
`;

export const TopH2 = styled.h2<{ extraBottomPadding?: boolean }>`
  font-size: 1.25rem;
  ${(props) =>
    props.extraBottomPadding &&
    css`
      padding-bottom: 8px;
    `}
`;

export const TopH3 = styled.h3`
  padding: 16px 18px;
  text-align: center;
`;

export const StoreImg = styled.img<{ rearPortal?: boolean }>`
  height: 100%;
  width: 100%;
  max-height: 50vh;
  z-index: 0;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;

  ${(props) =>
    props.rearPortal &&
    css`
      width: 70%;
      height: 70%;
      max-height: 35vh;
      border-radius: 1rem;
    `}
`;

export const StylistImg = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;

  @media ${devices.mobileM} {
    height: 160px;
    width: 160px;
  }
`;

export const RegisterLoginDiv = styled.div`
  div {
    margin: 12px 12px 0 12px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

export const LoadingIconContainer = styled.div<{
  absolute?: boolean;
  marginBottom?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.absolute &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 28px;
    `}
`;

export const ErrorContainer = styled(LoadingIconContainer)``;

export const LoadingIcon = styled.div<{ padding?: boolean }>`
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid ${({ theme }) => theme.green3};
  width: 60px;
  height: 60px;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.padding &&
    css`
      margin: 20px;
    `}
`;

export const StoreHourTable = styled.table`
  width: 100%;
  tr {
    display: grid;
    grid-template-columns: 52px 1fr 10px 1fr;
    @media ${devices.mobileM} {
      grid-template-columns: 62px 1fr 10px 1fr;
    }

    td {
      justify-self: center;
      &:first-child {
        justify-self: end;
      }
      &:nth-child(2) {
        justify-self: end;
      }
      &:nth-child(4) {
        justify-self: start;
      }
    }
  }
`;

export const ServiceDetailDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const DetailP = styled.p`
  font-size: 0.7rem;
  margin-top: 3px;
`;

export const AppointmentConfirmContainer = styled.div`
  div {
    padding: 8px;
    text-align: center;
    p {
      margin-bottom: 8px;
    }
    h2 {
      font-size: 1.3rem;
    }
  }
`;
