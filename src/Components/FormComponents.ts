import styled, { css } from "styled-components";

export const StyledForm = styled.form`
  padding: 8px 0 0 0;
  width: 100%;
`;

export const StyledFormBlock = styled.div<{ password?: boolean }>`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.password &&
    css`
      padding: 14px 0;
    `}
`;

export const StyledLabel = styled.label`
  padding: 8px 0 0 0;
`;

export const StyledTextInput = styled.input`
  height: 28px;
  margin: 4px 0;
  font-size: 0.9rem;
`;
