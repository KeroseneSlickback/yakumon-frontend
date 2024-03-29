import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
} from "../../Components/ModalComponents";
import { BackendResponseDataType, MessageType } from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface Props {
  employeeId: string;
  storeId: string;
  closeModal(): void;
}

const RemoveEmployeeModal = (props: Props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleRemoval = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage(null);
    const jwt = localStorage.getItem("jwt");
    const formData = {
      employee: props.employeeId,
      store: props.storeId,
      setAsEmployee: false,
    };
    axios
      .patch<BackendResponseDataType>(
        "https://yakumon-backend.onrender.com/user/employeeauthenticate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setMessage({
          message: "Successfully removed employee",
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
      <ModalH3 paddingBottom>Remove Employee</ModalH3>
      <h4>Are you sure you want to remove this employee?</h4>
      {message ? (
        <MessageBox marginTop>
          <RegularMessage message={message.message} warning={message.warning} />
        </MessageBox>
      ) : null}
      <ButtonBox topPadding>
        <MediumButton warning onClick={handleRemoval}>
          Confirm Removal
        </MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export default RemoveEmployeeModal;
