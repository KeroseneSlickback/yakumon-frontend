import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  StyledForm,
  StyledFormBlock,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import {
  ErrorMessage,
  ModalCloseProp,
  ReturnUserType,
  UserRegisterType,
} from "../../Utilities/types";
import RegularMessage from "../Messages/RegularMessage";

const RegisterModal = ({ closeModal }: ModalCloseProp) => {
  const [formData, setFormData] = useState<UserRegisterType>({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const verifyPassword = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
      throw new Error("no match");
    } else if (pass1.length && pass2.length < 6) {
      throw new Error("too short");
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await verifyPassword(formData.password, formData.passwordConfirmation);
      await axios
        .post<ReturnUserType>("http://localhost:8888/user/", formData)
        .then((response) => {
          console.log(response);
          setErrorMessage((prev) => ({
            ...prev,
            message: "Successfully Registered!",
            warning: false,
          }));
        });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "no match") {
          setErrorMessage((prev) => ({
            ...prev,
            message: "Passwords don't match.",
            warning: true,
          }));
        } else {
          setErrorMessage((prev) => ({
            ...prev,
            message: "Password too short",
            warning: true,
          }));
        }
      }
    }
  };

  return (
    <ModalContainer>
      <h3>Register</h3>
      <h4>Please enter the infomation below to register</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock sideBySide>
          <div>
            <StyledLabel>First Name</StyledLabel>
            <StyledTextInput
              required
              name="firstName"
              type="text"
              placeholder="Will"
              value={formData.firstName}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Last Name</StyledLabel>
            <StyledTextInput
              required
              name="lastName"
              type="text"
              placeholder="Spaur"
              value={formData.lastName}
              onChange={handleFormChange}
            />
          </div>
        </StyledFormBlock>
        <StyledFormBlock sideBySide>
          <div>
            <StyledLabel>Phone Number</StyledLabel>
            <StyledTextInput
              required
              name="phoneNumber"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="111 333 4444"
              maxLength={12}
              value={formData.phoneNumber}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Username</StyledLabel>
            <StyledTextInput
              required
              name="username"
              type="text"
              placeholder="FantasticSam"
              value={formData.username}
              onChange={handleFormChange}
            />
          </div>
        </StyledFormBlock>
        <StyledFormBlock>
          <div>
            <StyledLabel>Email</StyledLabel>
            <StyledTextInput
              required
              name="email"
              type="email"
              placeholder="123abc@gmail.com"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
        </StyledFormBlock>
        <StyledFormBlock>
          <div>
            <StyledLabel>Password (min 7 characters)</StyledLabel>
            <StyledTextInput
              required
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <StyledLabel>Verify Password</StyledLabel>
            <StyledTextInput
              required
              name="passwordConfirmation"
              type="password"
              placeholder="Verify"
              value={formData.passwordConfirmation}
              onChange={handleFormChange}
            />
          </div>
          {errorMessage ? (
            <RegularMessage
              message={errorMessage.message}
              warning={errorMessage.warning}
            />
          ) : null}
        </StyledFormBlock>
        <ButtonBox>
          <MediumButton register>Register</MediumButton>
        </ButtonBox>
      </StyledForm>
      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default RegisterModal;
