import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";

const NotAuthorized = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <SinglePageContainer>
      <PageSectionCard absolute>
        <h1>Not Authorized</h1>
        <p>You will be redirected shortly</p>
      </PageSectionCard>
      <LoadingIconContainer>
        <LoadingIcon />
      </LoadingIconContainer>
    </SinglePageContainer>
  );
};

export default NotAuthorized;
