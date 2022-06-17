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
import {
  MessageType,
  ReturnUserType,
  ServiceType,
} from "../../Utilities/types";

import location from "../../Utilities/Images/SVGs/location.svg";
import clock from "../../Utilities/Images/SVGs/clock.svg";
import phone from "../../Utilities/Images/SVGs/phone.svg";
import site from "../../Utilities/Images/SVGs/site.svg";
import close from "../../Utilities/Images/SVGs/close.svg";
import edit from "../../Utilities/Images/SVGs/edit.svg";
import StoreHour from "../../Components/StoreHour";
import { EmptyButton, SmallButton } from "../../Components/Buttons";
import { BackDrop } from "../../Components/Backdrop";
import {
  EditServiceModal,
  NewServiceModal,
  RemoveServiceModal,
} from "../../Modules/Modals/ServiceModals";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

interface RemoveServiceProps {}

const EmployeeSection = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [user, setUser] = useState<ReturnUserType | null>(null);
  const [removeService, setRemoveService] = useState<string | null>(null);
  const [editService, setEditService] = useState<ServiceType | null>(null);
  const [newService, setNewService] = useState<boolean>(false);

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

  const closeModal = () => {
    setRemoveService(null);
    setEditService(null);
    setNewService(false);
  };

  const showRemoveService = (serviceId: string) => {
    setRemoveService(serviceId);
  };

  const showEditService = (service: ServiceType) => {
    setEditService(service);
  };

  const showNewService = () => {
    setNewService(true);
  };

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
      ) : user ? (
        <>
          <PageSectionCard topCard center bottomPadding>
            <TopH1>Welcome, {authContext.user?.firstName}</TopH1>
          </PageSectionCard>
          {user.store ? (
            <PageSectionCard styled ownerSection>
              <TopH1 storePage>{user.store.storeName}</TopH1>
              <StoreImgDiv ownerSection>
                {user.store.picture ? (
                  <StoreImg
                    ownerSection
                    src={`data:image/png;base64,${user.store.picture}`}
                    alt={user.store.storeName}
                  />
                ) : (
                  <FillerImgSvg ownerSection />
                )}
              </StoreImgDiv>
              <StoreInfoContainer ownerSection>
                <span>
                  <img src={location} alt="location" />
                  <a
                    href={user.store.locationLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.store.location}
                  </a>
                </span>
                {user.store?.storeWebsite ? (
                  <span>
                    <img src={site} alt="site" />
                    <a
                      href={user.store.storeWebsite}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Website
                    </a>
                  </span>
                ) : null}
                <span>
                  <img src={phone} alt="phone" />
                  <p>{user.store.phoneNumber}</p>
                </span>
                <span>
                  <img src={clock} alt="clock" />
                  <div>
                    <StoreHourTable>
                      <tbody>
                        {user.store?.hours.map((day, dayIndex) => {
                          return (
                            <StoreHour
                              key={day._id}
                              day={day}
                              weekday={weekdaysArray[dayIndex]}
                            />
                          );
                        })}
                      </tbody>
                    </StoreHourTable>
                  </div>
                </span>
              </StoreInfoContainer>
              <AccordionModal buttonMessage="View Services">
                {user.services ? (
                  <>
                    {user.services.map((service, serviceIndex) => {
                      return (
                        <div key={serviceIndex}>
                          <p>{service.serviceName}</p>
                          <div>
                            <EmptyButton
                              onClick={() => showEditService(service)}
                            >
                              <img src={edit} alt="edit service" />
                            </EmptyButton>
                            <EmptyButton
                              onClick={() => showRemoveService(service._id)}
                            >
                              <img src={close} alt="remove service" />
                            </EmptyButton>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
                <SmallButton bottomPadding onClick={showNewService}>
                  Add Service
                </SmallButton>
              </AccordionModal>
            </PageSectionCard>
          ) : null}
          <PageSectionCard>Appointment Section</PageSectionCard>
        </>
      ) : null}
      {removeService || editService || newService ? (
        <BackDrop onClick={closeModal} />
      ) : null}
      {newService ? <NewServiceModal closeModal={closeModal} /> : null}
      {editService ? <EditServiceModal closeModal={closeModal} /> : null}
      {removeService ? <RemoveServiceModal closeModal={closeModal} /> : null}
    </SinglePageContainer>
  );
};

export default EmployeeSection;
