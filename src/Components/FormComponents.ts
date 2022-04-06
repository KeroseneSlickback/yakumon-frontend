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
    margin: 4px 4px;
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

export const StyledTextArea = styled.textarea`
  height: 100px;
  width: 100%;
  font-size: 0.9rem;
  white-space: pre-wrap;
  margin: 6px 0;
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  background-color: ${({ theme }) => theme.alternativeAlt};
  margin: 12px 8px;
`;

export const ServiceSelect = styled.div<{ select?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
  margin: 0;
  border-radius: 6px;
  padding: 4px;
  cursor: pointer;

  ${(props) =>
    props.select &&
    css`
      border-bottom: 2px solid ${(props) => props.theme.subduedAlt};
    `}

  p {
    padding: 6px 0;
    margin: 0 8px;
    font-size: 0.8rem;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.fontColor};
  }
`;
