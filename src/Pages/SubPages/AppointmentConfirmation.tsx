import axios from "axios";
import { parseJSON } from "date-fns";
import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
            <TopH1>Appointment Made Successfully</TopH1>
          </PageSectionCard>
          <PageSectionCard styled>
            <div>
              <p>Appointment Date:</p>
              <h2>
                {format(
                  parseJSON(appointment?.timeSlots[0].slotDateTime),
                  "MMMM dd yyyy"
                )}
              </h2>
            </div>
            <div>
              <p>Appointment Time:</p>
              <h2>
                {format(
                  parseJSON(appointment?.timeSlots[0].slotDateTime!),
                  "h:mm b"
                )}
              </h2>
            </div>
            <div>
              <p>With:</p>
              <h2>
                {appointment.employee.firstName} {appointment.employee.lastName}
              </h2>
            </div>
            <div>
              <Link to={`/store/${appointment.employee.store}`}>
                <p>View Store Details</p>
              </Link>
            </div>
          </PageSectionCard>
        </PageSectionCard>
      ) : null}
    </SinglePageContainer>
  );
};

export default AppointmentConfirmation;
