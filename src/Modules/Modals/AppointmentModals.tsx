import { format } from "date-fns";
import { parseJSON } from "date-fns/esm";
import React, { useState } from "react";
import styled from "styled-components";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import { MessageType, StylistAppointmentType } from "../../Utilities/types";

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

export const AppointmentModalContainer = styled.div`
  background-color: ${({ theme }) => theme.alternative};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.fontColorAlt};
  padding: 4px;
  margin-bottom: 16px;
`;

export const AppointmentViewDiv = styled.div`
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
  console.log(appointment);
  return (
    <ModalContainer>
      <h3>Appointment View</h3>
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
          <p>{appointment.comments}</p>
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
  const [message, setMessage] = useState<MessageType | null>(null);
  const [formData, setFormData] = useState<Date | null>(null);
  return (
    <ModalContainer>
      <h3>Delete Appointment</h3>
      <ClosedButtonDiv>
        <CloseButton onClick={props.closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
