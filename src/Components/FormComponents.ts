import styled, { css } from "styled-components";
import { devices } from "../Styles/Variables";

export const StyledForm = styled.form`
  padding: 8px 0 0 0;
  width: 100%;
  @media ${devices.mobileL} {
    max-width: 400px;
  }
`;

export const StyledFormBlock = styled.div<{
  topPadding?: boolean;
}>`
  ${(props) =>
    props.topPadding &&
    css`
      margin-top: 16px;
    `}
`;

export const StyledModalBlock = styled.div<{
  sideBySide?: boolean;
  nonDivMargin?: boolean;
}>`
  display: flex;
  flex-direction: column;

  div {
    margin: 4px;
    p {
      margin: 2px 0;
      font-size: 0.7rem;
    }
  }

  ${(props) =>
    props.nonDivMargin &&
    css`
      div {
        margin: 0px 0px 4px 0px;
      }
    `}

  ${(props) =>
    props.sideBySide &&
    css`
      flex-direction: row;
      div {
        display: flex;
        flex-direction: column;
        width: 100%;
        input {
          width: 100%;
        }
      }
    `}
`;

export const StyledLabel = styled.label``;

export const StyledTextInput = styled.input`
  width: 100%;
  height: 28px;
  margin: 4px 0;
  font-size: 0.9rem;
`;

export const StyledTextArea = styled.textarea<{
  large?: boolean;
  marginBottom?: boolean;
}>`
  height: 100px;
  width: 100%;
  font-size: 0.9rem;
  white-space: pre-wrap;
  margin: 6px 0;
  ${(props) =>
    props.large &&
    css`
      height: 160px;
    `}
  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 16px;
    `}
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.white2};
  margin: 8px 0px;
`;

export const StyledFormSelect = styled.select<{ compact?: boolean }>`
  background-color: ${({ theme }) => theme.white1};
  margin: 4px 0 14px 0;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.compact &&
    css`
      margin: 4px 0;
    `}
`;

export const StyledImgInput = styled.input`
  margin-top: 8px;
  max-width: 200px;
`;

export const StoreHourContainer = styled.div`
  margin: 8px 0;
`;

export const StoreHourGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
`;
