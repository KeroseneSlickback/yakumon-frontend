import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
} from "../Components/Page-accessories";

const confirmationMessages = [
  "Reservation created successfully",
  "User account created successfully",
  "Store owner account created successfully",
  "Employee account created successfully",
  "Store created successfully",
];

const Confirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const newMessageNumber = parseInt(id);
      const newMessage = confirmationMessages[newMessageNumber];
      setMessage(newMessage);
    }
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <SinglePageContainer>
      <PageSectionCard absolute>
        <h1>{message}</h1>
        <p>You will be redirected shortly</p>
      </PageSectionCard>
      <LoadingIconContainer>
        <LoadingIcon />
      </LoadingIconContainer>
    </SinglePageContainer>
  );
};

export default Confirmation;
