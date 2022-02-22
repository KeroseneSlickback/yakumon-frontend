import React, { ChangeEvent, useState } from "react";
import { MediumButton } from "../../Components/Buttons";
import {
  StyledForm,
  StyledFormBlock,
  StyledLabel,
  StyledTextInput,
} from "../../Components/FormComponents";
import { ModalContainer } from "../../Components/ModalComponents";

interface UserRegisterType {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterModal = () => {
  const [formData, setFormData] = useState<UserRegisterType>({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [registerData, setRegisterData] = useState<UserRegisterType | null>(
    null
  );

  const verifyPassword = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
      // Check passwords here as callback
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
      await verifyPassword("pass", "pass");
    } catch (e) {}
    // setRegisterData();
    console.log(registerData);
  };

  return (
    <ModalContainer>
      <h3>Register</h3>
      <h4>Please enter the infomation below to register</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock>
          <StyledLabel>First Name</StyledLabel>
          <StyledTextInput
            required
            name="firstName"
            type="text"
            placeholder="Will"
            value={formData.firstName}
            onChange={handleFormChange}
          />
        </StyledFormBlock>
        <StyledFormBlock>
          <StyledLabel>Last Name</StyledLabel>
          <StyledTextInput
            required
            name="lastName"
            type="text"
            placeholder="Spaur"
            value={formData.lastName}
            onChange={handleFormChange}
          />
        </StyledFormBlock>
        <StyledFormBlock>
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
        </StyledFormBlock>
        <StyledFormBlock>
          <StyledLabel>Username</StyledLabel>
          <StyledTextInput
            required
            name="username"
            type="text"
            placeholder="FantasticSam"
            value={formData.username}
            onChange={handleFormChange}
          />
        </StyledFormBlock>
        <StyledFormBlock password>
          <StyledLabel>Password</StyledLabel>
          <StyledTextInput
            required
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
          />
          <StyledLabel>Verify Password</StyledLabel>
          <StyledTextInput
            required
            name="passwordConfirm"
            type="password"
            placeholder="Verify"
            value={formData.passwordConfirm}
            onChange={handleFormChange}
          />
        </StyledFormBlock>
        <MediumButton register>Register</MediumButton>
      </StyledForm>
    </ModalContainer>
  );
};

export default RegisterModal;
