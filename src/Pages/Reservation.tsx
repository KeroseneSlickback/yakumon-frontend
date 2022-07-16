import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { BackDrop } from "../Components/Backdrop";
import { MediumButton, ReserveButton } from "../Components/Buttons";
import {
  PageSectionCard,
  ReservationImgHeaderContainer,
  ReservationTitleBlock,
  SinglePageContainer,
  PageDivider,
} from "../Components/Containers";
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
  TopH2,
  TopH3,
} from "../Components/Page-accessories";
import LoginModal from "../Modules/Modals/LoginModal";
import RegisterModal from "../Modules/Modals/RegisterModal";
import AuthContext from "../Utilities/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  MessageType,
  ReservationType,
  UserType,
  ScheduleDateType,
  StylistAppointmentType,
} from "../Utilities/types";
import { ListItem } from "../Components/CheckboxComponents";
import ScheduleView from "../Modules/Schedule/ScheduleView";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";
import { FillerImgSvg } from "../Utilities/Images/SVGComponents/FillerImgSvg";
import { timesArrayShort } from "../Utilities/Helpers/HelperObjArrays";
import { useFindWindowSize } from "../Utilities/Hooks/useFindWindowSize";

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { width } = useFindWindowSize();
  const { loggedIn, user: AuthUser } = useContext(AuthContext);
  const [user, setUser] = useState<UserType | null>(null);
  const [userImg, setUserImg] = useState<string | null>(null);
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
    if (!jwt || !AuthUser?._id) {
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
      customer: AuthUser?._id,
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

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<UserType>(`http://localhost:8888/user/${id}`)
          .then((response) => {
            setLoad(false);
            setUser(response.data);
            if (response.data.picture) {
              setUserImg(response.data.picture.toString("base64"));
            }
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
  }, [id]);

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
        <>
          <StyledForm onSubmit={handleFormSubmit} expandable>
            <PageDivider left>
              <PageSectionCard head>
                <ReservationImgHeaderContainer>
                  {userImg ? (
                    <StylistImg
                      src={`data:image/png;base64,${userImg}`}
                      alt={user?.firstName}
                    />
                  ) : (
                    <FillerImgSvg stylist />
                  )}
                  <ReservationTitleBlock>
                    <TopH1 noPadding>
                      {user?.firstName} {user?.lastName}
                    </TopH1>
                    <p>{user?.title}</p>
                  </ReservationTitleBlock>
                </ReservationImgHeaderContainer>
              </PageSectionCard>
              <PageSectionCard styled mobileOverlap>
                <TopH2 extraBottomPadding>Start Your Reservation</TopH2>
                {loggedIn ? (
                  <>
                    {user?.services && user.services.length > 0 ? (
                      <>
                        <p>Select a service.</p>
                        <ServiceContainer>
                          {user.services
                            ? user.services.map((service) => {
                                return (
                                  <ListItem
                                    key={service._id}
                                    text1={service.serviceName}
                                    text2={timesArrayShort[service.timeSpan]}
                                    text3={service.price}
                                    handleOnChange={() =>
                                      selectService(service._id)
                                    }
                                    selected={reservation.service}
                                    id={service._id}
                                    services
                                  ></ListItem>
                                );
                              })
                            : null}
                        </ServiceContainer>
                      </>
                    ) : (
                      <p>
                        This employee hasn't made services yet. Please check
                        back later.
                      </p>
                    )}
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
                      <MediumButton
                        type="button"
                        onClick={toggleLoginModal}
                        log
                      >
                        Login
                      </MediumButton>
                    </div>
                  </RegisterLoginDiv>
                )}
              </PageSectionCard>
            </PageDivider>
            <PageDivider right topPadding>
              <PageSectionCard smallPaddingBottom>
                <TopH3>
                  Select any white section as the start of your reservation.
                </TopH3>
                <ScheduleView
                  appointments={user?.appointments}
                  services={user?.services}
                  selectedService={reservation.service}
                  store={user?.store}
                  handleOnSelect={selectTime}
                />
              </PageSectionCard>
              <PageSectionCard styled>
                <p>Comments</p>
                <StyledTextArea
                  name="comments"
                  placeholder="Add comments here..."
                  value={reservation.comments}
                  onChange={handleTextAreaChange}
                ></StyledTextArea>
              </PageSectionCard>
            </PageDivider>
            <PageSectionCard secondary disconnectedSubmit span2>
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
        </>
      )}

      {viewRegister || viewLogin ? <BackDrop onClick={closeModal} /> : null}
      {viewRegister ? <RegisterModal closeModal={closeModal} /> : null}
      {viewLogin ? <LoginModal closeModal={closeModal} /> : null}
    </SinglePageContainer>
  );
};

export default Reservation;
