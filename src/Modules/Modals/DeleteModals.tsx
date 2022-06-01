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
  id: string | null;
  closeModal(): void;
  toggleConfirm(): void;
  title: string;
  subTitle: string;
  type: "store" | "user";
};

export const DeleteModal = (props: Props) => {
  return (
    <ModalContainer>
      <h3>{props.title}</h3>
      <h4>{props.subTitle}</h4>
      <ButtonBox sideBySide topPadding>
        <MediumButton register onClick={props.toggleConfirm}>
          Confirm
        </MediumButton>
        <MediumButton warning onClick={props.closeModal}>
          Cancel
        </MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

export const DoubleConfirmDeleteModal = (props: Props) => {
  const [message, setMessage] = useState<MessageType | null>(null);
  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
    setMessage(null);
    try {
      axios
        .delete<BackendResponseDataType>(
          `http://localhost:8888/${props.type}/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setMessage({
              message: "Store Deleted Successfully",
              warning: false,
            });
          }
        });
    } catch (e: any) {
      setMessage({
        message: "An Error has Occured",
        warning: true,
      });
    }
  };
  return (
    <ModalContainer>
      <h3>{props.title}</h3>
      <h4>{props.subTitle}</h4>
      {message ? (
        <MessageBox marginTop>
          <RegularMessage message={message.message} warning={message.warning} />
        </MessageBox>
      ) : null}
      <ButtonBox sideBySide topPadding>
        <MediumButton register onClick={handleDelete}>
          Confirm
        </MediumButton>
        <MediumButton warning onClick={props.closeModal}>
          Cancel
        </MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
