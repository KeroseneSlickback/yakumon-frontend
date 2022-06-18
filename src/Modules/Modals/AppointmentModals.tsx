import { format } from "date-fns";
import { parseJSON } from "date-fns/esm";
import React from "react";
import styled from "styled-components";
import {
  CloseButton,
  ClosedButtonDiv,
  MediumButton,
} from "../../Components/Buttons";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { ButtonBox, ModalContainer } from "../../Components/ModalComponents";
import { StylistAppointmentType } from "../../Utilities/types";

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

const AppointmentModalContainer = styled.div`
  background-color: ${({ theme }) => theme.alternative};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.fontColorAlt};
  padding: 4px;
  margin-bottom: 16px;
`;

const AppointmentViewDiv = styled.div`
  margin: 6px;
  border-bottom: 1px solid black;
  h4 {
    font-size: 1.3rem;
    margin: 6px;
  }
`;

type Props = {
  closeModal(): void;
  appointment: StylistAppointmentType;
};

export const ViewAppointmentModal = ({ appointment, closeModal }: Props) => {
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
      </AppointmentModalContainer>
      <ButtonBox sideBySide>
        <MediumButton warning>Delete</MediumButton>
        <MediumButton register>Edit</MediumButton>
        <MediumButton onClick={closeModal}>Close</MediumButton>
      </ButtonBox>
      <ClosedButtonDiv>
        <CloseButton onClick={closeModal} />
      </ClosedButtonDiv>
    </ModalContainer>
  );
};
