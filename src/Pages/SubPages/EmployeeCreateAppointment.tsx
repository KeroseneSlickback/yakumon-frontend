import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { ReserveButton } from "../../Components/Buttons";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import {
  ServiceContainer,
  StyledForm,
  StyledTextArea,
} from "../../Components/FormComponents";
import { ButtonBox } from "../../Components/ModalComponents";
import {
  DetailP,
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
} from "../../Components/Page-accessories";
import AuthContext from "../../Utilities/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  MessageType,
  NewAppointmentType,
  UserType,
  ScheduleDateType,
  StylistAppointmentType,
} from "../../Utilities/types";
import { ListItem } from "../../Components/CheckboxComponents";
import ScheduleView from "../../Modules/Schedule/ScheduleView";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import { CustomerSearchBlock } from "../../Components/CustomerSearchComponents";

const EmployeeCreateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stylist, setStylist] = useState<UserType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<MessageType | null>(null);
  const [reservation, setReservation] = useState<NewAppointmentType>({
    slotDateTime: null,
    comments: "",
    service: "",
    customer: "",
  });

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
        setFormError({
          message: `${e.response.data.error}`,
          warning: true,
        });
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

  const handleCustomerSelect = (id: string) => {
    setReservation((prev) => ({
      ...prev,
      customer: id,
    }));
  };
  console.log(reservation);

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<UserType>(`http://localhost:8888/user/${id}`)
          .then((res) => {
            setLoad(false);
            setStylist(res.data);
          })
          .catch((e) => {
            setError({
              message: `${e.response.data.error}`,
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
          <PageSectionCard>
            <TopH1>New Appointment</TopH1>
            <CustomerSearchBlock
              handleOnChange={handleCustomerSelect}
              selected={reservation.customer}
              guest
            />
          </PageSectionCard>
          <PageSectionCard styled>
            <h2>Select a service.</h2>
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
                        services
                      ></ListItem>
                    );
                  })
                : null}
            </ServiceContainer>
          </PageSectionCard>
          <PageSectionCard noPadding>
            {stylist ? (
              <ScheduleView
                appointments={stylist?.appointments}
                services={stylist?.services}
                selectedService={reservation.service}
                store={stylist?.store}
                handleOnSelect={selectTime}
                unlockDates
              />
            ) : null}
          </PageSectionCard>
          <PageSectionCard styled>
            <h3>Comments</h3>
            <DetailP>
              For Guest User, please enter the customer's infomation below.
            </DetailP>
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
    </SinglePageContainer>
  );
};

export default EmployeeCreateAppointment;
