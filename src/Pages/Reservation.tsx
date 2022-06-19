import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { BackDrop } from "../Components/Backdrop";
import { MediumButton, ReserveButton } from "../Components/Buttons";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import {
  ServiceContainer,
  StyledForm,
  StyledTextArea,
} from "../Components/FormComponents";
import { ButtonBox } from "../Components/ModalComponents";
import {
  LoadingIcon,
  LoadingIconContainer,
  RegisterLoginDiv,
  StylistImg,
  TopH1,
} from "../Components/Page-accessories";
import LoginModal from "../Modules/Modals/LoginModal";
import RegisterModal from "../Modules/Modals/RegisterModal";
import AuthContext from "../Utilities/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  MessageType,
  ReservationType,
  ReturnUserType,
  ScheduleDateType,
  StylistAppointmentType,
} from "../Utilities/types";
import { ListItem } from "../Components/CheckboxComponents";
import ScheduleView from "../Modules/Schedule/ScheduleView";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);
  const [stylist, setStylist] = useState<ReturnUserType | null>(null);
  const [stylistImg, setStylistImg] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<MessageType | null>(null);
  const [viewRegister, setViewRegister] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [reservation, setReservation] = useState<ReservationType>({
    slotDateTime: null,
    comments: "",
    service: "",
  });

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (!reservation.slotDateTime || !reservation.service) {
      setFormError((prev) => ({
        ...prev,
        message: "Please Select a Service and Time",
        warning: true,
      }));
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !user?._id) {
      setFormError((prev) => ({
        ...prev,
        message: "Error: User cannot be found.",
        warning: true,
      }));
      return;
    }
    const currentTime = new Date();
    const reservationData = {
      ...reservation,
      employee: id,
      customer: user?._id,
      createAt: currentTime,
    };
    axios
      .post<StylistAppointmentType>(
        "http://localhost:8888/appointment",
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          navigate(`/appointmentConfirm/${res.data._id}`);
        }, 500);
      })
      .catch((e) => {
        setFormError((prev) => ({
          ...prev,
          message: "Error submitting reservation",
          warning: true,
        }));
        console.log(e);
      });
  };

  const selectService = (id: string) => {
    setReservation((prev) => ({
      ...prev,
      service: id,
    }));
  };

  const selectTime = (headSlot: ScheduleDateType) => {
    setReservation((prev) => ({
      ...prev,
      slotDateTime: headSlot.time,
    }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<ReturnUserType>(`http://localhost:8888/user/${id}`)
          .then((response) => {
            setLoad(false);
            setStylist(response.data);
            if (response.data.picture) {
              setStylistImg(response.data.picture.toString("base64"));
            }
          })
          .catch((e) => {
            console.log(e);
            setError({
              message: "Error: Cannot find employee.",
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
        <StyledForm onSubmit={handleFormSubmit}>
          <PageSectionCard row stylist>
            <StylistImg
              src={`data:image/png;base64,${stylistImg}`}
              alt={stylist?.firstName}
            />
            <div>
              <TopH1>
                {stylist?.firstName} {stylist?.lastName}
              </TopH1>
              <h3>{stylist?.title}</h3>
            </div>
          </PageSectionCard>
          <PageSectionCard styled>
            <h2>Start Your Reservation</h2>
            {loggedIn ? (
              <>
                <p>Select a service.</p>
                <ServiceContainer>
                  {stylist?.services
                    ? stylist?.services.map((service) => {
                        return (
                          <ListItem
                            key={service._id}
                            text1={service.serviceName}
                            text2={service.price}
                            handleOnChange={() => selectService(service._id)}
                            selected={reservation.service}
                            id={service._id}
                          ></ListItem>
                        );
                      })
                    : null}
                </ServiceContainer>
              </>
            ) : (
              <RegisterLoginDiv>
                <p>Please Register or Login</p>
                <div>
                  <MediumButton
                    type="button"
                    onClick={toggleRegisterModal}
                    register
                  >
                    Register
                  </MediumButton>
                  <MediumButton type="button" onClick={toggleLoginModal} log>
                    Login
                  </MediumButton>
                </div>
              </RegisterLoginDiv>
            )}
          </PageSectionCard>
          <PageSectionCard noPadding>
            <h3>Select any white section as the start of your reservation.</h3>
            <ScheduleView
              appointments={stylist?.appointments}
              services={stylist?.services}
              selectedService={reservation.service}
              store={stylist?.store}
              handleOnSelect={selectTime}
            />
          </PageSectionCard>
          <PageSectionCard styled>
            <h3>Comments</h3>
            <StyledTextArea
              marginBottom
              name="comments"
              placeholder="Add comments here..."
              value={reservation.comments}
              onChange={handleTextAreaChange}
            ></StyledTextArea>
            <ButtonBox centered>
              {formError ? (
                <MessageBox>
                  <RegularMessage
                    message={formError.message}
                    warning={formError.warning}
                  />
                </MessageBox>
              ) : null}
              <ReserveButton register>Reserve Now</ReserveButton>
            </ButtonBox>
          </PageSectionCard>
        </StyledForm>
      )}

      {viewRegister || viewLogin ? <BackDrop onClick={closeModal} /> : null}
      {viewRegister ? <RegisterModal closeModal={closeModal} /> : null}
      {viewLogin ? <LoginModal closeModal={closeModal} /> : null}
    </SinglePageContainer>
  );
};

export default Reservation;
