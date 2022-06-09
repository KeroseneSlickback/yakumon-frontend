import axios from "axios";
import React, { useState } from "react";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import { BackendResponseDataType, MessageType } from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

type Props = {
  employeeId: string;
  storeId: string;
  closeModal(): void;
};

const RemoveEmployeeModal = (props: Props) => {
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleRemoval = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const formData = {
      employee: props.employeeId,
      store: props.storeId,
      setAsEmployee: false,
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
          message: "Successfully removed employee",
          warning: false,
        }));
        setTimeout(() => {
          props.closeModal();
        }, 2000);
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
      <h3>Remove Employee</h3>
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
