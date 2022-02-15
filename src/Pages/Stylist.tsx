import React from "react";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import { StyledForm } from "../Components/FormComponents";
import { StylistImg } from "../Components/Page-accessories";

import hairstylist from "../Utilities/Images/hairstylist.jpeg";

const Stylist = () => {
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
          <p>Customer Login Section, welcome message</p>
          <p>Select a store section</p>
        </PageSectionCard>
        <PageSectionCard>
          <p>Schedule section</p>
        </PageSectionCard>
        <PageSectionCard styled>
          <p>Add a comments</p>
          <p>Reserve Now button</p>
        </PageSectionCard>
      </StyledForm>
    </SinglePageContainer>
  );
};

export default Stylist;
