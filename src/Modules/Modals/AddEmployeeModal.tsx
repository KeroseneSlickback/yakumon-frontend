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
import { BackendResponseDataType, MessageType } from "../../Utilities/types";
import RegularMessage from "../Messages/RegularMessage";

interface Props {
  toggleModal(): void;
  storeId: string;
}

const AddEmployeeModal = (props: Props) => {
  const [employee, setEmployee] = useState<string>("");
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployee(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const formData = {
      employee,
      store: props.storeId,
      setAsEmployee: true,
    };
    console.log(formData);
    axios
      .patch<BackendResponseDataType>(
        "http://localhost:8888/user/employeeauthenticate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setMessage((prev) => ({
          ...prev,
          message: "Successfully added employee",
          warning: false,
        }));
        setTimeout(() => {
          props.toggleModal();
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
        setMessage((prev) => ({
          ...prev,
          message: "An Error has Occurred",
          warning: true,
        }));
      });
  };
  return (
    <ModalContainer>
      <h3>Add Employee</h3>
      <h4>Please enter the employee's ID.</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormBlock>
          <div>
            <StyledLabel>Employee ID:</StyledLabel>
            <StyledTextInput
              required
              name="employee"
              type="text"
              placeholder="6260eb669a..."
              value={employee}
              onChange={handleFormChange}
            ></StyledTextInput>
          </div>
          {message ? (
            <RegularMessage
              message={message.message}
              warning={message.warning}
            />
          ) : null}
          <ButtonBox>
            <MediumButton register>Add Employee</MediumButton>
          </ButtonBox>
        </StyledFormBlock>
      </StyledForm>
      <ClosedButtonDiv>
        <CloseButton onClick={props.toggleModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default AddEmployeeModal;
