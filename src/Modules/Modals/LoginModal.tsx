import axios from "axios";
import React, { ChangeEvent, useContext, useState } from "react";
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
import AuthContext from "../../Utilities/AuthContext";
import {
  BackendResponseDataType,
  MessageType,
  ModalCloseProp,
  UserLoginType,
} from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

const LoginModal = ({ closeModal }: ModalCloseProp) => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState<UserLoginType>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    axios
      .post<BackendResponseDataType>(
        "http://localhost:8888/user/login",
        formData
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("jwt", response.data.token.split(" ")[1]);
        authContext.login();
        setMessage({
          message: "Successfully Logged In!",
          warning: false,
        });
        setTimeout(() => {
          closeModal();
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
        setMessage({
          message: "Please check username or password",
          warning: true,
        });
      });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ModalContainer>
      <h3>Login</h3>
      <h4>Please enter your infomation</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock>
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
          <div>
            <StyledLabel>Password</StyledLabel>
            <StyledTextInput
              required
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
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
          <ButtonBox>
            <MediumButton register>Login</MediumButton>
          </ButtonBox>
        </StyledFormBlock>
      </StyledForm>
      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default LoginModal;
