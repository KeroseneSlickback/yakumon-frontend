import axios from "axios";
import { parseJSON } from "date-fns";
import { format } from "date-fns/esm";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
} from "../../Components/Page-accessories";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import { MessageType, StylistAppointmentType } from "../../Utilities/types";

const AppointmentConfirmation = () => {
  const { id } = useParams();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<MessageType | null>(null);
  const [appointment, setAppointment] = useState<StylistAppointmentType | null>(
    null
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
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
            {appointment.employee.store ? (
              <div>
                <Link to={`/store/${appointment.employee.store._id}`}>
                  <p>View Store Details</p>
                </Link>
              </div>
            ) : null}
          </PageSectionCard>
        </PageSectionCard>
      ) : null}
    </SinglePageContainer>
  );
};

export default AppointmentConfirmation;
