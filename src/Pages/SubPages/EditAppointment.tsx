import axios from "axios";
import { parseJSON } from "date-fns";
import { format } from "date-fns/esm";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReserveButton } from "../../Components/Buttons";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { StyledForm, StyledTextArea } from "../../Components/FormComponents";
import { ButtonBox } from "../../Components/ModalComponents";
import {
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
} from "../../Components/Page-accessories";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import { AppointmentViewDiv } from "../../Modules/Modals/AppointmentModals";
import ScheduleView from "../../Modules/Schedule/ScheduleView";
import {
  MessageType,
  ReservationType,
  UserType,
  ScheduleDateType,
  StylistAppointmentType,
} from "../../Utilities/types";

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

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<MessageType | null>(null);
  const [appointment, setAppointment] = useState<StylistAppointmentType | null>(
    null
  );
  const [user, setUser] = useState<UserType | null>(null);
  const [reservation, setReservation] = useState<ReservationType>({
    slotDateTime: null,
    comments: "",
    service: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    const parsedUser: UserType = user !== null ? JSON.parse(user) : null;
    setError(null);
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<StylistAppointmentType>(
            `http://localhost:8888/appointment/${id}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then((res) => {
            setLoad(false);
            setAppointment(res.data);
            setReservation((prev) => ({
              ...prev,
              slotDateTime: res.data.timeSlots[0].slotDateTime,
              service: res.data.service._id,
              comments: res.data.comments,
            }));
            console.log(res.data);
          })
          .catch((e) => {
            setError({
              message: `${e.response.data.error}`,
              warning: true,
            });
          });
        await axios
          .get<UserType>(`http://localhost:8888/user/${parsedUser._id}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((e) => {
            setError({
              message: `${e.response.data.error}`,
              warning: true,
            });
          });
      };
      getData();
    }, 300);
    return () => clearTimeout(debounce);
  }, []);

  const selectTime = (headSlot: ScheduleDateType) => {
    console.log(headSlot);
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const jwt = localStorage.getItem("jwt");
    const currentTime = new Date();
    const editReservationData = {
      slotDateTime: reservation.slotDateTime,
      createdAt: currentTime,
      comments: reservation.comments,
    };
    axios
      .patch<StylistAppointmentType>(
        `http://localhost:8888/appointment/${appointment?._id}`,
        editReservationData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setFormError({
          message: "Successfully edited appointment",
          warning: false,
        });
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      })
      .catch((e) => {
        setFormError({
          message: `${e.response.data.error}`,
          warning: true,
        });
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
      ) : appointment !== null ? (
        <StyledForm onSubmit={handleFormSubmit}>
          <PageSectionCard topCard center bottomPadding>
            <TopH1>Edit Appointment</TopH1>
          </PageSectionCard>
          <PageSectionCard styled>
            <h3>Reservation Details</h3>
            <AppointmentViewDiv>
              <p>Customer:</p>
              <h4>
                {appointment.owner.firstName} {appointment.owner.lastName}
              </h4>
            </AppointmentViewDiv>
            <AppointmentViewDiv>
              <p>Phone Number:</p>
              <h4>{appointment.owner.phoneNumber}</h4>
            </AppointmentViewDiv>
            <AppointmentViewDiv>
              <p>Appointment Date:</p>
              <h4>
                {format(
                  parseJSON(appointment?.timeSlots[0].slotDateTime),
                  "MMMM dd yyyy"
                )}
              </h4>
            </AppointmentViewDiv>
            <AppointmentViewDiv>
              <p>Appointment Time:</p>
              <h4>
                {format(
                  parseJSON(appointment?.timeSlots[0].slotDateTime!),
                  "h:mm b"
                )}
              </h4>
            </AppointmentViewDiv>
            <AppointmentViewDiv>
              <p>Appointment Duration:</p>
              <h4>{timesArray[appointment.timeSlots.length]}</h4>
            </AppointmentViewDiv>
            <AppointmentViewDiv>
              <p>Service:</p>
              <h4>{appointment.service.serviceName}</h4>
            </AppointmentViewDiv>
            <AppointmentViewDiv>
              <p>Comment:</p>
              {appointment.comments.split("\n").map((str, i) => {
                return <p key={i}>{str}</p>;
              })}
            </AppointmentViewDiv>
          </PageSectionCard>
          <PageSectionCard noPadding>
            <h3>Select a date/time to edit</h3>
            {user ? (
              <ScheduleView
                appointments={user.appointments}
                services={user.services}
                selectedService={reservation.service}
                store={user.store}
                user={user}
                handleOnSelect={selectTime}
                edit={true}
                editAppointmentTimeslots={appointment.timeSlots}
              />
            ) : null}
          </PageSectionCard>
          <PageSectionCard styled>
            <h3>Comments</h3>
            <StyledTextArea
              marginBottom
              name="comments"
              placeholder="Add comments here..."
              value={reservation.comments}
              onChange={handleTextAreaChange}
            />
            <ButtonBox centered>
              {formError ? (
                <MessageBox>
                  <RegularMessage
                    message={formError.message}
                    warning={formError.warning}
                  />
                </MessageBox>
              ) : null}
              <ReserveButton register>Edit</ReserveButton>
            </ButtonBox>
          </PageSectionCard>
        </StyledForm>
      ) : null}
    </SinglePageContainer>
  );
};

export default EditAppointment;
