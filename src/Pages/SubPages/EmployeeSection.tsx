import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageSectionCard,
  SinglePageContainer,
  StoreImgDiv,
  StoreInfoContainer,
} from "../../Components/Containers";
import {
  DetailP,
  LoadingIcon,
  LoadingIconContainer,
  ServiceDetailDiv,
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
  ScheduleDateType,
  ServiceType,
  StylistAppointmentType,
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
import ScheduleView from "../../Modules/Schedule/ScheduleView";
import {
  DeleteAppointmentModal,
  ViewAppointmentModal,
} from "../../Modules/Modals/AppointmentModals";

const weekdaysArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const timesArray = [
  "0 minutes",
  "30 minutes",
  "1 hour",
  "1h 30 minutes",
  "2 hours",
  "2h 30 minutes",
  "3 hours",
  "3h 30 minutes",
  "4 hours",
  "4h 30 minutes",
];

const EmployeeSection = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [user, setUser] = useState<ReturnUserType | null>(null);
  const [removeService, setRemoveService] = useState<string | null>(null);
  const [editService, setEditService] = useState<ServiceType | null>(null);
  const [newService, setNewService] = useState<boolean>(false);
  const [appointmentLookup, setAppointmentLookup] =
    useState<StylistAppointmentType | null>(null);
  const [deleteAppointment, setDeleteAppointment] =
    useState<StylistAppointmentType | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<ReturnUserType>(`http://localhost:8888/user/${user?._id}`)
          .then((res) => {
            setLoad(false);
            setUser(res.data);
            console.log(res.data);
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
    setAppointmentLookup(null);
    setDeleteAppointment(null);
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

  const showEditAppointment = (appointment: StylistAppointmentType) => {
    closeModal();
    navigate(`/portal/editAppointment/${appointment._id}`);
  };

  const showDeleteAppointment = (appointment: StylistAppointmentType) => {
    closeModal();
    setDeleteAppointment(appointment);
  };

  const parseServiceTime = (timeSpan: number) => {
    return timesArray[timeSpan];
  };

  const selectTime = (headSlot: ScheduleDateType) => {
    const jwt = localStorage.getItem("jwt");
    setAppointmentLookup(null);
    axios
      .get<StylistAppointmentType>(
        `http://localhost:8888/appointment/${headSlot.appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        setAppointmentLookup(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
                          <ServiceDetailDiv>
                            <p>{service.serviceName}</p>
                            <DetailP>
                              Time: {parseServiceTime(service.timeSpan)}
                            </DetailP>
                            <DetailP>Price: ${service.price}</DetailP>
                          </ServiceDetailDiv>
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
          <PageSectionCard noPadding>
            <h3>Appointments</h3>
            <ScheduleView
              appointments={user.appointments}
              services={user.services}
              handleOnSelect={selectTime}
              store={user.store}
              user={user}
            />
          </PageSectionCard>
          <PageSectionCard styled>Create Appointment</PageSectionCard>
        </>
      ) : null}
      {removeService ||
      editService ||
      newService ||
      appointmentLookup ||
      deleteAppointment ? (
        <BackDrop onClick={closeModal} />
      ) : null}
      {newService ? <NewServiceModal closeModal={closeModal} /> : null}
      {editService ? (
        <EditServiceModal closeModal={closeModal} service={editService} />
      ) : null}
      {removeService ? (
        <RemoveServiceModal closeModal={closeModal} serviceId={removeService} />
      ) : null}
      {appointmentLookup ? (
        <ViewAppointmentModal
          closeModal={closeModal}
          appointment={appointmentLookup}
          showDeleteAppointment={showDeleteAppointment}
          showEditAppointment={showEditAppointment}
        />
      ) : null}
      {deleteAppointment ? (
        <DeleteAppointmentModal
          closeModal={closeModal}
          appointment={deleteAppointment}
        />
      ) : null}
    </SinglePageContainer>
  );
};

export default EmployeeSection;
