import React, { useContext, useState } from "react";
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
import AuthContext from "../../Utilities/AuthContext";
import { MessageType } from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

interface Props {
  closeModal(): void;
}

const LogoutModal = (props: Props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.removeItem("owner");
    localStorage.removeItem("employee");
    authContext.logout();
    setMessage({
      message: "Logout Successful",
      warning: false,
    });
    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Logout</ModalH3>
      <h4>Are you use you want to logout?</h4>
      {message ? (
        <MessageBox marginTop>
          <RegularMessage message={message.message} warning={message.warning} />
        </MessageBox>
      ) : null}
      <ButtonBox sideBySide topPadding>
        <MediumButton register onClick={handleLogout}>
          Confirm
        </MediumButton>
        <MediumButton warning onClick={props.closeModal}>
          Cancel
        </MediumButton>
        <ClosedButtonDiv>
          <CloseButton onClick={props.closeModal} />
        </ClosedButtonDiv>
      </ButtonBox>
    </ModalContainer>
  );
};

export default LogoutModal;
