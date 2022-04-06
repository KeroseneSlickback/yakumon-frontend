import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { BackDrop } from "../Components/Backdrop";
import { MediumButton, ReserveButton } from "../Components/Buttons";
import { PageSectionCard, SinglePageContainer } from "../Components/Containers";
import {
  ServiceContainer,
  ServiceSelect,
  StyledForm,
  StyledTextArea,
} from "../Components/FormComponents";
import { ButtonBox } from "../Components/ModalComponents";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
  RegisterLoginDiv,
  StylistImg,
} from "../Components/Page-accessories";
import LoginModal from "../Modules/Modals/LoginModal";
import RegisterModal from "../Modules/Modals/RegisterModal";
import AuthContext from "../Utilities/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ReservationType, ReturnUserType } from "../Utilities/types";

const Reservation = () => {
  const { id } = useParams();
  const [stylist, setStylist] = useState<ReturnUserType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { loggedIn, user } = useContext(AuthContext);
  const [viewRegister, setViewRegister] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [reservation, setReservation] = useState<ReservationType>({
    employee: "",
    customer: "",
    slotDateTime: null,
    createdAt: null,
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

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectService = (id: string) => {
    setReservation((prev) => ({
      ...prev,
      service: id,
    }));
  };

  useEffect(() => {
    setLoad(true);
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<ReturnUserType>(`http://localhost:8888/user/${id}`)
          .then((response) => {
            setLoad(false);
            setError(false);
            setStylist(response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
            setError(true);
          });
      };
      getData();
    }, 500);
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
      ) : (
        <StyledForm onSubmit={handleFormSubmit}>
          <PageSectionCard row stylist>
            <StylistImg
              src={`data:image/png;base64,${stylist?.picture}`}
              alt={stylist?.firstName}
            />
            <div>
              <h1>
                {stylist?.firstName} {stylist?.lastName}
              </h1>
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
                          <ServiceSelect
                            onClick={() => selectService(service._id)}
                            key={service._id}
                          >
                            <p>{service.serviceName}</p>
                            <p>${service.price}</p>
                          </ServiceSelect>
                        );
                      })
                    : null}
                </ServiceContainer>
              </>
            ) : (
              <RegisterLoginDiv>
                <p>Please Register or Login</p>
                <div>
                  <MediumButton onClick={toggleRegisterModal} register>
                    Register
                  </MediumButton>
                  <MediumButton onClick={toggleLoginModal} log>
                    Login
                  </MediumButton>
                </div>
              </RegisterLoginDiv>
            )}
          </PageSectionCard>
          <PageSectionCard>
            <h3>Schedule section</h3>
          </PageSectionCard>
          <PageSectionCard styled>
            <h3>Comments</h3>
            <StyledTextArea
              name="comments"
              placeholder="Add commnets here..."
              value={reservation.comments}
              onChange={handleTextAreaChange}
            ></StyledTextArea>
            <ButtonBox centered>
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
