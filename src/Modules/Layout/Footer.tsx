import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BackDrop } from "../../Components/Backdrop";
import { FlexibleButton } from "../../Components/Buttons";
import { FooterButtonDiv, FooterContainer } from "../../Components/Containers";
import { DetailP } from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import { UserDeleteConfirm, UserModal } from "../Modals/UserModals";

const Footer = () => {
  const authContext = useContext(AuthContext);
  const [toggleUser, setToggleUser] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const closeModals = () => {
    setToggleUser(false);
    setConfirmDelete(false);
  };

  const toggleModal = () => {
    setToggleUser((prev) => !prev);
  };

  const toggleConfirmDelete = () => {
    setToggleUser(false);
    setConfirmDelete((prev) => !prev);
  };

  return (
    <FooterContainer>
      <DetailP>
        Yakumon is a demonstration reservation app created by Mitchell William
        Spaur
      </DetailP>
      <FooterButtonDiv>
        {authContext.loggedIn ? (
          <div>
            <FlexibleButton onClick={toggleModal}>User Settings</FlexibleButton>
          </div>
        ) : null}
        <div>
          <Link to={"/portal"}>
            <FlexibleButton>Employee/Owner Area</FlexibleButton>
          </Link>
        </div>
      </FooterButtonDiv>

      {toggleUser || confirmDelete ? <BackDrop onClick={closeModals} /> : null}
      {toggleUser ? (
        <UserModal
          closeModal={closeModals}
          confirmDelete={toggleConfirmDelete}
        />
      ) : null}
      {confirmDelete ? (
        <UserDeleteConfirm
          closeModal={closeModals}
          confirmDelete={toggleConfirmDelete}
        />
      ) : null}
    </FooterContainer>
  );
};

export default Footer;
