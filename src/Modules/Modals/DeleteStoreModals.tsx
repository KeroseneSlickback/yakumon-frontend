import axios from "axios";
import { useState } from "react";
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
  ModalH4,
} from "../../Components/ModalComponents";
import { BackendResponseDataType, MessageType } from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface Props {
  id: string | null;
  closeModal(): void;
  toggleConfirm(): void;
  title: string;
  subTitle: string;
  type: "store" | "user";
}

export const DeleteStoreModal = (props: Props) => {
  return (
    <ModalContainer>
      <ModalH3 paddingBottom>{props.title}</ModalH3>
      <ModalH4 paddingBottom>{props.subTitle}</ModalH4>
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

export const DoubleConfirmDeleteStoreModal = (props: Props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType | null>(null);
  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
    setMessage(null);
    axios
      .delete<BackendResponseDataType>(
        `https://yakumon-backend.onrender.com/${props.type}/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setMessage({
            message: "Store Deleted Successfully",
            warning: false,
          });
          setTimeout(() => {
            navigate(0);
          }, 2000);
        }
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
      <ModalH3 paddingBottom>{props.title}</ModalH3>
      <ModalH4 paddingBottom>{props.subTitle}</ModalH4>
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
