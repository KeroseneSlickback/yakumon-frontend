import styled, { css } from "styled-components";

export const ShowcaseImg = styled.img`
  height: 150px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

export const StoreImg = styled.img`
  height: auto;
  width: 100%;
  z-index: 0;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0px 0px 8px 1px rgba(255, 255, 255, 0.5);
`;

export const StylistImg = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.5);
`;

export const RegisterLoginDiv = styled.div`
  div {
    margin: 12px 12px 0 12px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

export const LoadingIconContainer = styled.div<{ absolute?: boolean }>`
  ${(props) =>
    props.absolute &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled(LoadingIconContainer)``;

export const LoadingIcon = styled.div<{ padding?: boolean }>`
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid ${({ theme }) => theme.secondary};
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
  tr {
    display: grid;
    grid-template-columns: 40px 70px 10px 70px;
    justify-items: center;
  }
`;
