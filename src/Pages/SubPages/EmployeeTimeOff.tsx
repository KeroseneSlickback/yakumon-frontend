import axios from "axios";
import { isEqual } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReserveButton } from "../../Components/Buttons";
import {
  ExtraPaddingWrapper,
  PageDivider,
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { StyledForm } from "../../Components/FormComponents";
import { ButtonBox } from "../../Components/ModalComponents";
import {
  LoadingIcon,
  LoadingIconContainer,
  TopH1,
} from "../../Components/Page-accessories";
import RegularMessage, {
  MessageBox,
} from "../../Modules/Messages/RegularMessage";
import ScheduleView from "../../Modules/Schedule/ScheduleView";
import {
  BackendResponseDataType,
  MessageType,
  UserType,
  ScheduleDateType,
  StylistAppointmentType,
} from "../../Utilities/types";

const EmployeeTimeOff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<MessageType | null>(null);
  const [timeOff, setTimeOff] = useState<ScheduleDateType[]>([]);
  const [removeTimeOff, setRemoveTimeOff] = useState<ScheduleDateType[]>([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const jwt = localStorage.getItem("jwt");
    const currentTime = new Date();

    try {
      if (timeOff.length > 0) {
        const sendingData = {
          createdAt: currentTime,
          timeOff,
        };

        axios
          .post<StylistAppointmentType>(
            "http://localhost:8888/timeoff",
            sendingData,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then((res) => {
            console.log("Fine", res);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      if (removeTimeOff.length > 0) {
        axios
          .delete<BackendResponseDataType>("http://localhost:8888/timeoff", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            data: {
              removeTimeOff,
            },
          })
          .then((res) => {
            console.log("Fine", res);
          })
          .catch((e) => {
            console.log(e.response);
          });
      }
      setFormError({
        message: "Time successfully updated",
        warning: false,
      });
      setTimeout(() => {
        navigate("/portal/employee");
      }, 2000);
    } catch (e) {
      setFormError({
        message: "An error had Occured",
        warning: true,
      });
    }
  };

  const selectTime = (timeBlock: ScheduleDateType) => {
    if (timeBlock.timeOff) {
      if (removeTimeOff.length > 0) {
        const foundTimeBlock = removeTimeOff.find((prevBlock) =>
          isEqual(prevBlock.time, timeBlock.time)
        );
        if (foundTimeBlock) {
          setRemoveTimeOff((removeTimeOff) =>
            removeTimeOff.filter((item) => !isEqual(item.time, timeBlock.time))
          );
        } else {
          setRemoveTimeOff([...removeTimeOff, timeBlock]);
        }
      } else {
        setRemoveTimeOff([...removeTimeOff, timeBlock]);
      }
    } else {
      if (timeOff.length > 0) {
        const foundTimeBlock = timeOff.find((prevBlock) =>
          isEqual(prevBlock.time, timeBlock.time)
        );
        if (foundTimeBlock) {
          setTimeOff((timeOff) =>
            timeOff.filter((item) => !isEqual(item.time, timeBlock.time))
          );
        } else {
          setTimeOff([...timeOff, timeBlock]);
        }
      } else {
        setTimeOff([...timeOff, timeBlock]);
      }
    }
  };

  useEffect(() => {
    setLoad(true);
    setError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<UserType>(`http://localhost:8888/user/${id}`)
          .then((res) => {
            setLoad(false);
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
        <>
          <PageSectionCard title aboveHead>
            <TopH1>Time Off</TopH1>
          </PageSectionCard>
          <StyledForm onSubmit={handleFormSubmit}>
            <PageDivider left>
              <PageSectionCard styled>
                <p>
                  Select multiple time blocks to list them as "Time off" in your
                  schedule.
                </p>
                <br />
                <p>
                  You may select previously selected sections to revert them to
                  open time.
                </p>
              </PageSectionCard>
            </PageDivider>
            <PageDivider right>
              <PageSectionCard smallPaddingTopAndBottom>
                {user ? (
                  <ScheduleView
                    appointments={user?.appointments}
                    services={user?.services}
                    store={user?.store}
                    handleOnSelect={selectTime}
                    timeOff
                    unlockDates
                  />
                ) : null}
              </PageSectionCard>
            </PageDivider>
          </StyledForm>
          <PageSectionCard secondary disconnectedSubmit>
            <ButtonBox centered>
              {formError ? (
                <MessageBox>
                  <RegularMessage
                    message={formError.message}
                    warning={formError.warning}
                  />
                </MessageBox>
              ) : null}
              <ReserveButton register>Submit Time</ReserveButton>
            </ButtonBox>
          </PageSectionCard>
        </>
      )}
    </SinglePageContainer>
  );
};

export default EmployeeTimeOff;
