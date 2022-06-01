import axios from "axios";
import React from "react";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import { BackendResponseDataType } from "../../Utilities/types";

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
  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
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
            // confirm delete, return user to owner page?
          }
        });
    } catch (e: any) {
      console.log(e);
      // general error over button
    }
  };
  return (
    <ModalContainer>
      <h3>{props.title}</h3>
      <h4>{props.subTitle}</h4>
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
