import axios from "axios";
import { parseJSON } from "date-fns";
import { format } from "date-fns/esm";
import { areIntervalsOverlappingWithOptions } from "date-fns/fp";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
} from "../../Components/Page-accessories";
import { StylistAppointmentType } from "../../Utilities/types";

const AppointmentConfirmation = () => {
  const { id } = useParams();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<StylistAppointmentType | null>(
    null
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
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
            setError(false);
            setAppointment(res.data);
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
            setError(true);
          });
      };
      getData();
    }, 300);
    return () => clearTimeout(debounce);
  }, []);
  console.log(appointment?.employee.firstName);

  return (
    <SinglePageContainer>
      {error ? (
        <ErrorContainer absolute>
          <h3>There was an error.</h3>
        </ErrorContainer>
      ) : load ? (
        <LoadingIconContainer absolute>
          <LoadingIcon />
        </LoadingIconContainer>
      ) : appointment !== null ? (
        <PageSectionCard absolute>
          <PageSectionCard>
            <TopH1>Your Reservation Details:</TopH1>
          </PageSectionCard>
          <PageSectionCard styled>
            <div>
              <span>Appointment Date:</span>
              <span>
                {format(
                  parseJSON(appointment?.timeSlots[0].slotDateTime),
                  "MMMM dd yyyy"
                )}
              </span>
            </div>
            <div>
              <span>Appointment Time:</span>
              <span>
                {format(
                  parseJSON(appointment?.timeSlots[0].slotDateTime!),
                  "k:m"
                )}
              </span>
            </div>
            <div>
              <span>With:</span>
              <span>{appointment.employee}</span>
            </div>
            <div>
              <span>At: </span>
              <span></span>
            </div>
          </PageSectionCard>
        </PageSectionCard>
      ) : null}
    </SinglePageContainer>
  );
};

export default AppointmentConfirmation;
