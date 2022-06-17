import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageSectionCard,
  SinglePageContainer,
  StoreImgDiv,
  StoreInfoContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
  StoreHourTable,
  StoreImg,
  TopH1,
} from "../../Components/Page-accessories";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import AccordionModal from "../../Modules/Modals/AccordionModal";
import AuthContext from "../../Utilities/AuthContext";
import { FillerImgSvg } from "../../Utilities/Images/SVGComponents/FillerImgSvg";
import { MessageType, ReturnUserType } from "../../Utilities/types";

import location from "../../Utilities/Images/SVGs/location.svg";
import clock from "../../Utilities/Images/SVGs/clock.svg";
import phone from "../../Utilities/Images/SVGs/phone.svg";
import site from "../../Utilities/Images/SVGs/site.svg";
import StoreHour from "../../Components/StoreHour";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const EmployeeSection = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [user, setUser] = useState<ReturnUserType | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<ReturnUserType>(`http://localhost:8888/user/${user?._id}`)
          .then((response) => {
            setLoad(false);
            setUser(response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
            setError({
              message: "Could not find user profile",
              warning: true,
            });
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, []);

  return (
    <SinglePageContainer>
      {error ? (
        <MessageBox absolute>
          <RegularMessage message={error.message} warning={error.warning} />
        </MessageBox>
      ) : load ? (
        <LoadingIconContainer absolute>
          <LoadingIcon />
        </LoadingIconContainer>
      ) : (
        <>
          <PageSectionCard>
            <TopH1>Welcome, {authContext.user?.firstName}</TopH1>
          </PageSectionCard>
          <PageSectionCard styled>
            Store section and services section
          </PageSectionCard>
          <PageSectionCard>Appointment Section</PageSectionCard>
        </>
      )}
    </SinglePageContainer>
  );
};

export default EmployeeSection;
