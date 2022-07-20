import axios from "axios";
import React, { ChangeEvent, useContext, useState } from "react";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  StyledModalForm,
  StyledModalBlock,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
} from "../../Components/ModalComponents";
import AuthContext from "../../Utilities/AuthContext";
import {
  BackendResponseDataType,
  MessageType,
  ModalCloseProp,
  UserRegisterType,
} from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

const RegisterModal = ({ closeModal }: ModalCloseProp) => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState<UserRegisterType>({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [message, setMessage] = useState<MessageType | null>(null);

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      verifyPassword(formData.password, formData.passwordConfirmation);
      axios
        .post<BackendResponseDataType>(
          "https://yakumon.herokuapp.com/user/",
          formData
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("jwt", response.data.token.split(" ")[1]);
          setMessage({
            message: "Successfully Registered!",
            warning: false,
          });
          setTimeout(() => {
            authContext.login();
            closeModal();
          }, 1000);
        });
    } catch (e: any) {
      if (e.response) {
        if (e.response.data.keyPattern.hasOwnProperty("username")) {
          setMessage({
            message: "Username taken.",
            warning: true,
          });
        }
      } else if (e instanceof Error) {
        if (e.message === "no match") {
          setMessage({
            message: "Passwords don't match.",
            warning: true,
          });
        } else if (e.message === "too short") {
          setMessage({
            message: "Password too short",
            warning: true,
          });
        }
      }
    }
  };

  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Register</ModalH3>
      <h4>Please enter the infomation below to register</h4>
      <StyledModalForm onSubmit={handleSubmit}>
        <StyledModalBlock sideBySide>
          <div>
            <StyledLabel>First Name</StyledLabel>
            <StyledTextInput
              required
              name="firstName"
              type="text"
              placeholder="Veronica"
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
              placeholder="Williams"
              value={formData.lastName}
              onChange={handleFormChange}
            />
          </div>
        </StyledModalBlock>
        <StyledModalBlock sideBySide>
          <div>
            <StyledLabel>Phone Number</StyledLabel>
            <StyledTextInput
              required
              name="phoneNumber"
              type="text"
              placeholder="111-333-4444"
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
              placeholder="Username"
              value={formData.username}
              onChange={handleFormChange}
            />
          </div>
        </StyledModalBlock>
        <StyledModalBlock>
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
        </StyledModalBlock>
        <StyledModalBlock>
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
          {message ? (
            <MessageBox>
              <RegularMessage
                message={message.message}
                warning={message.warning}
              />
            </MessageBox>
          ) : null}
        </StyledModalBlock>
        <ButtonBox smallTopPadding>
          <MediumButton register>Register</MediumButton>
        </ButtonBox>
      </StyledModalForm>
      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default RegisterModal;
