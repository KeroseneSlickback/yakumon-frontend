import axios from "axios";
import { isEqual } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReserveButton } from "../../Components/Buttons";
import {
  PageSectionCard,
  SinglePageContainer,
} from "../../Components/Containers";
import { StyledForm, StyledTextArea } from "../../Components/FormComponents";
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
  MessageType,
  ReturnUserType,
  ScheduleDateType,
  StylistAppointmentType,
} from "../../Utilities/types";

const EmployeeTimeOff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<ReturnUserType | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<MessageType | null>(null);
  const [formError, setFormError] = useState<MessageType | null>(null);
  const [timeOff, setTimeOff] = useState<ScheduleDateType[]>([]);
  const [removeTimeOff, setRemoveTimeOff] = useState<ScheduleDateType[]>([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(timeOff);
    const jwt = localStorage.getItem("jwt");
    const currentTime = new Date();

    const sendingData = {
      createdAt: currentTime,
      timeOff,
    };

    axios
      .post<StylistAppointmentType>(
        "http://localhost:8888/appointment/timeoff",
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
  };

  const selectTime = (timeBlock: ScheduleDateType) => {
    // console.log(timeBlock);
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
          .get<ReturnUserType>(`http://localhost:8888/user/${id}`)
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
        <StyledForm onSubmit={handleFormSubmit}>
          <PageSectionCard>
            <TopH1>Time Off</TopH1>
          </PageSectionCard>
          <PageSectionCard styled>
            <p>
              Select multiple time blocks to list them as "Time off" in your
              schedule.
            </p>
          </PageSectionCard>
          <PageSectionCard noPadding>
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
          <PageSectionCard styled>
            <ButtonBox centered>
              {formError ? (
                <MessageBox>
                  <RegularMessage
                    message={formError.message}
                    warning={formError.warning}
                  />
                </MessageBox>
              ) : null}
              <ReserveButton register>Submit Time Off</ReserveButton>
            </ButtonBox>
          </PageSectionCard>
        </StyledForm>
      )}
    </SinglePageContainer>
  );
};

export default EmployeeTimeOff;
