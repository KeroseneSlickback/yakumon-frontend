import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import { ExtraPaddingWrapper } from "../../Components/Containers";
import { CustomerSearchBlock } from "../../Components/CustomerSearchComponents";
import { StyledModalForm } from "../../Components/FormComponents";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
} from "../../Components/ModalComponents";
import { BackendResponseDataType, MessageType } from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface Props {
  storeId: string;
  closeModal(): void;
}

const AddEmployeeModal = (props: Props) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<string>("");
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleFormChange = (id: string) => {
    setEmployee(id);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    const formData = {
      employee,
      store: props.storeId,
      setAsEmployee: true,
    };
    axios
      .patch<BackendResponseDataType>(
        "https://yakumon.herokuapp.com/user/employeeauthenticate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setMessage({
          message: "Successfully added employee",
          warning: false,
        });
        setTimeout(() => {
          props.closeModal();
          navigate(0);
        }, 2000);
      })
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };
  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Add Employee</ModalH3>
      <StyledModalForm onSubmit={handleSubmit}>
        <ExtraPaddingWrapper smallPadding>
          <CustomerSearchBlock
            handleOnChange={handleFormChange}
            selected={employee}
          />
        </ExtraPaddingWrapper>
        {message ? (
          <MessageBox>
            <RegularMessage
              message={message.message}
              warning={message.warning}
            />
          </MessageBox>
        ) : null}
        <ButtonBox>
          <MediumButton register>Add Employee</MediumButton>
        </ButtonBox>
      </StyledModalForm>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default AddEmployeeModal;
