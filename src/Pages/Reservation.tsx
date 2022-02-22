import React from "react";
import { BackDrop } from "../Components/Backdrop";
import { MediumButton } from "../Components/Buttons";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import { StyledForm } from "../Components/FormComponents";
import { RegisterLoginDiv, StylistImg } from "../Components/Page-accessories";
import RegisterModal from "../Modules/Modals/RegisterModal";

import hairstylist from "../Utilities/Images/hairstylist.jpeg";

const Reservation = () => {
  const loggedin = false;

  const register = true;

  const login = false;

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
      <StyledForm onSubmit={handleFormSubmit}>
        <PageSectionCard styled>
          <h2>Start Your Reservation</h2>
          {loggedin ? (
            <p>Welcome, Username.</p>
          ) : (
            <RegisterLoginDiv>
              <p>Please Register or Login</p>
              <div>
                <MediumButton register>Register</MediumButton>
                <MediumButton log>Login</MediumButton>
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
      </StyledForm>
      {register || login ? <BackDrop /> : null}
      {register ? <RegisterModal /> : null}
    </SinglePageContainer>
  );
};

export default Reservation;
