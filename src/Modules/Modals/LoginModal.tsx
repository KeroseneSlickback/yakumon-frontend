import axios from "axios";
import React, { ChangeEvent, useContext, useState } from "react";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  StyledModalBlock,
  StyledLabel,
  StyledTextInput,
  StyledModalForm,
} from "../../Components/FormComponents";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
  ModalH4,
} from "../../Components/ModalComponents";
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
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("jwt", res.data.token.split(" ")[1]);
        setMessage({
          message: "Successfully Logged In!",
          warning: false,
        });
        setTimeout(() => {
          authContext.login();
          closeModal();
        }, 1000);
      })
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
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
      <ModalH3 paddingBottom>Login</ModalH3>
      <ModalH4 paddingBottom>Please enter your infomation</ModalH4>
      <StyledModalForm onSubmit={handleSubmit}>
        <StyledModalBlock>
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
        </StyledModalBlock>
      </StyledModalForm>

      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default LoginModal;
