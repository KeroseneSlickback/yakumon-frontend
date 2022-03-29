import React, { useContext, useState } from "react";
import { BackDrop } from "../Components/Backdrop";
import { MediumButton } from "../Components/Buttons";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import { StyledForm } from "../Components/FormComponents";
import { RegisterLoginDiv, StylistImg } from "../Components/Page-accessories";
import RegisterModal from "../Modules/Modals/RegisterModal";
import AuthContext from "../Utilities/AuthContext";

import hairstylist from "../Utilities/Images/hairstylist.jpeg";

const Reservation = () => {
  // Auth context, 'loggedIn'
  const { loggedIn } = useContext(AuthContext);
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
          <p>Welcome, Username.</p>
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
        <p>Schedule section</p>
      </PageSectionCard>
      <PageSectionCard styled>
        <p>Add a comments</p>
        <p>Reserve Now button</p>
      </PageSectionCard>
      {viewRegister || viewLogin ? <BackDrop /> : null}
      {viewRegister ? <RegisterModal closeModal={closeModal} /> : null}
    </SinglePageContainer>
  );
};

export default Reservation;
