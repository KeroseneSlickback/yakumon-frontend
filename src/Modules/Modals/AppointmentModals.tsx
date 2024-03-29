import axios from "axios";
import { format } from "date-fns";
import { parseJSON } from "date-fns/esm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  ButtonBox,
  ModalContainer,
  ModalH3,
} from "../../Components/ModalComponents";
import { timesArray } from "../../Utilities/Helpers/HelperObjArrays";
import {
  BackendResponseDataType,
  MessageType,
  StylistAppointmentType,
} from "../../Utilities/types";
import RegularMessage, { MessageBox } from "../Messages/RegularMessage";

export const AppointmentModalContainer = styled.div`
  background-color: ${({ theme }) => theme.white1};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.black};
  padding: 4px;
  margin-bottom: 16px;
`;

export const AppointmentViewDiv = styled.div<{ bottomMargin?: boolean }>`
  margin: 6px;
  border-bottom: 1px solid black;
  p {
    font-size: 0.8rem;
    margin-bottom: 4px;
  }
  h4 {
    font-size: 1rem;
    margin: 6px;
  }

  ${(props) =>
    props.bottomMargin &&
    css`
      margin-bottom: 32px;
    `}
`;

type ViewAppointmentProps = {
  closeModal(): void;
  showEditAppointment: (appointment: StylistAppointmentType) => void;
  showDeleteAppointment: (appointment: StylistAppointmentType) => void;
  appointment: StylistAppointmentType;
};

export const ViewAppointmentModal = ({
  appointment,
  closeModal,
  showDeleteAppointment,
  showEditAppointment,
}: ViewAppointmentProps) => {
  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Appointment View</ModalH3>
      <AppointmentModalContainer>
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
      </AppointmentModalContainer>
      <ButtonBox sideBySide>
        <MediumButton
          warning
          onClick={() => showDeleteAppointment(appointment)}
        >
          Delete
        </MediumButton>
        <MediumButton register onClick={() => showEditAppointment(appointment)}>
          Edit
        </MediumButton>
        <MediumButton onClick={closeModal}>Close</MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};

interface DeleteAppointmentProps {
  closeModal(): void;
  appointment: StylistAppointmentType;
}

export const DeleteAppointmentModal = (props: DeleteAppointmentProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleDelete = () => {
    const jwt = localStorage.getItem("jwt");
    setMessage(null);
    axios
      .delete<BackendResponseDataType>(
        `https://yakumon-backend.onrender.com/appointment/${props.appointment?._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setMessage({
            message: "Appointment Deleted Successfully",
            warning: false,
          });
          setTimeout(() => {
            navigate(0);
          }, 2000);
        }
      })
      .catch((e) => {
        setMessage({
          message: `${e.response.data.error}`,
          warning: true,
        });
      });
  };

  return (
    <ModalContainer>
      <ModalH3 paddingBottom>Delete Appointment</ModalH3>
      <h4>Are you sure you want to delete this appointment?</h4>
      {message ? (
        <MessageBox marginTop>
          <RegularMessage message={message.message} warning={message.warning} />
        </MessageBox>
      ) : null}
      <ButtonBox sideBySide topPadding>
        <MediumButton register onClick={handleDelete}>
          Confirm
        </MediumButton>
        <MediumButton warning onClick={props.closeModal}>
          Cancel
        </MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
