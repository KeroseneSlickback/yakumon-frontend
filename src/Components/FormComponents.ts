import styled, { css } from "styled-components";

export const StyledForm = styled.form`
  padding: 8px 0 0 0;
  width: 100%;
`;

export const StyledFormBlock = styled.div<{
  sideBySide?: boolean;
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

export const StyledTextArea = styled.textarea<{ large?: boolean }>`
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
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  background-color: ${({ theme }) => theme.alternativeAlt};
  margin: 12px 0px;
`;

export const StyledFormSelect = styled.select<{ compact?: boolean }>`
  background-color: ${({ theme }) => theme.alternative};
  margin: 4px 0 14px 0;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.compact &&
    css`
      margin: 4px 0;
    `}
`;
