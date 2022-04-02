import React, { useContext, useState } from "react";
import { BackDrop } from "../Components/Backdrop";
import { MediumButton, ReserveButton } from "../Components/Buttons";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import { StyledTextArea } from "../Components/FormComponents";
import { ButtonBox } from "../Components/ModalComponents";
import { RegisterLoginDiv, StylistImg } from "../Components/Page-accessories";
import LoginModal from "../Modules/Modals/LoginModal";
import RegisterModal from "../Modules/Modals/RegisterModal";
import AuthContext from "../Utilities/AuthContext";

import hairstylist from "../Utilities/Images/hairstylist.jpeg";

const Reservation = () => {
  const { loggedIn, user } = useContext(AuthContext);
  const [viewRegister, setViewRegister] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);

  const closeModal = () => {
    setViewRegister(false);
    setViewLogin(false);
  };

  const toggleRegisterModal = () => {
    setViewRegister(true);
  };

  const toggleLoginModal = () => {
    setViewLogin(true);
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <SinglePageContainer>
      <form onSubmit={handleFormSubmit}>
        <PageSectionCard row>
          <StylistImg src={hairstylist} alt="hairstylist" />
          <div>
            <h1>Stylist Name</h1>
            <h3>Head Hair Stylist</h3>
          </div>
        </PageSectionCard>
        <PageSectionCard styled>
          <h2>Start Your Reservation</h2>
          {loggedIn ? (
            <p>Welcome, {user?.username}.</p>
          ) : (
            <RegisterLoginDiv>
              <p>Please Register or Login</p>
              <div>
                <MediumButton onClick={toggleRegisterModal} register>
                  Register
                </MediumButton>
                <MediumButton onClick={toggleLoginModal} log>
                  Login
                </MediumButton>
              </div>
            </RegisterLoginDiv>
          )}
        </PageSectionCard>
        <PageSectionCard>
          <h3>Schedule section</h3>
        </PageSectionCard>
        <PageSectionCard styled>
          <h3>Comments</h3>
          <StyledTextArea>Add comments here...</StyledTextArea>
          <ButtonBox centered>
            <ReserveButton register>Reserve Now</ReserveButton>
          </ButtonBox>
        </PageSectionCard>
      </form>

      {viewRegister || viewLogin ? <BackDrop onClick={closeModal} /> : null}
      {viewRegister ? <RegisterModal closeModal={closeModal} /> : null}
      {viewLogin ? <LoginModal closeModal={closeModal} /> : null}
    </SinglePageContainer>
  );
};

export default Reservation;
