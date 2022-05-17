import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
} from "../Components/Page-accessories";

const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <SinglePageContainer>
      <PageSectionCard absolute>
        <h1>Reservation created successfully</h1>
        <p>You will be redirected shortly</p>
      </PageSectionCard>
      <LoadingIconContainer>
        <LoadingIcon />
      </LoadingIconContainer>
    </SinglePageContainer>
  );
};

export default Confirmation;
