import {
  format,
  addDays,
  subDays,
  isBefore,
  isEqual,
  compareAsc,
} from "date-fns";
import { useContext, useEffect, useState } from "react";
import {
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";
import {
  ReturnStoreType,
  ReturnUserType,
  ScheduleArrayType,
  ScheduleDateType,
  ServiceType,
  StylistAppointmentType,
  timeSlotType,
} from "../../Utilities/types";
import { scheduleArrayBuild, scheduleSectionFilter } from "./ScheduleHelpers";
import {
  CircleSvg,
  CrossSvg,
} from "../../Utilities/Images/SVGComponents/CircleCross";
import {
  StyledTable,
  StyledTbody,
  StyledTh,
  StyledThead,
  StyledTr,
} from "../../Components/ScheduleComponents";
import { ScheduleBlankButton, ScheduleButton } from "../../Components/Buttons";
import AuthContext from "../../Utilities/AuthContext";

interface SchedulePropTypes {
  appointments?: StylistAppointmentType[];
  services?: ServiceType[];
  selectedService?: string;
  store?: ReturnStoreType;
  handleOnSelect: (params: any) => any;
  user?: ReturnUserType;
  edit?: boolean;
  editAppointmentTimeslots?: timeSlotType[];
  unlockDates?: boolean;
  timeOff?: boolean;
}

const ScheduleView = ({
  appointments,
  services,
  selectedService,
  store,
  handleOnSelect,
  user,
  edit,
  editAppointmentTimeslots,
  unlockDates,
  timeOff,
}: SchedulePropTypes) => {
  const authContext = useContext(AuthContext);
  const [employeeCheck, setEmployeeCheck] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [outputDays, setOutputDays] = useState<number>(4);
  const [load, setLoad] = useState<boolean>(false);
  const [dateTimeArray, setDateTimeArray] = useState<ScheduleArrayType[]>([]);
  const [displayData, setDisplayData] = useState({
    dateList: [
      { date: "1/1", weekday: "Mon" },
      { date: "1/2", weekday: "Tues" },
      { date: "1/3", weekday: "Wed" },
      { date: "1/4", weekday: "Thurs" },
    ],
    earliestDay: {
      month: "April",
      day: 30,
    },
    latestDay: {
      month: "April",
      day: 3,
    },
  });

  useEffect(() => {
    if (user?._id === authContext.user?._id) {
      if (selectedService) {
        setEmployeeCheck(false);
      } else {
        setEmployeeCheck(true);
      }
      setStartDate(subDays(new Date(), 1));
    }
  }, []);

  useEffect(() => {
    setLoad(true);
    // create a new startDate based on previous times the number of steps
    // When next/previous are clicked, increment date from that, but don't allow under 0
    setTimeout(() => {
      if (appointments && store?.hours) {
        const storeHours = store.hours;
        const prepArray = async () => {
          let blankScheduleArray = [];
          if (edit) {
            blankScheduleArray = await scheduleArrayBuild(
              startDate,
              storeHours,
              outputDays,
              appointments,
              editAppointmentTimeslots
            );
          } else {
            blankScheduleArray = await scheduleArrayBuild(
              startDate,
              storeHours,
              outputDays,
              appointments
            );
          }
          if (selectedService || timeOff) {
            if (services) {
              let foundService = services.find(
                (service) => service._id === selectedService
              );
              let timeSpan = 0;
              if (foundService) {
                timeSpan = foundService.timeSpan;
              } else if (timeOff) {
                timeSpan = 1;
              }
              const selectedScheduleArray = await scheduleSectionFilter(
                blankScheduleArray,
                timeSpan
              );
              setDateTimeArray(selectedScheduleArray);
              let dateList = selectedScheduleArray[0].slots.map((day) => {
                let date = format(day.time, "MM/dd").replace(/^0+/, "");
                let weekday = format(day.time, "EEE");
                return { date, weekday };
              });
              let earlyMonth = format(
                selectedScheduleArray[0].slots[0].time,
                "MMM"
              );
              let earlyDay = parseInt(
                format(selectedScheduleArray[0].slots[0].time, "d")
              );
              let laterMonth = format(
                selectedScheduleArray[0].slots[outputDays - 1].time,
                "MMM"
              );
              let laterDay = parseInt(
                format(selectedScheduleArray[0].slots[outputDays - 1].time, "d")
              );
              setDisplayData((prev) => ({
                ...prev,
                dateList,
                earliestDay: {
                  month: earlyMonth,
                  day: earlyDay,
                },
                latestDay: {
                  month: laterMonth,
                  day: laterDay,
                },
              }));
            }
          } else {
            setDateTimeArray(blankScheduleArray);
            let dateList = blankScheduleArray[0].slots.map((day) => {
              let date = format(day.time, "MM/dd").replace(/^0+/, "");
              let weekday = format(day.time, "EEE");
              return { date, weekday };
            });
            let earlyMonth = format(blankScheduleArray[0].slots[0].time, "MMM");
            let earlyDay = parseInt(
              format(blankScheduleArray[0].slots[0].time, "d")
            );
            let laterMonth = format(
              blankScheduleArray[0].slots[outputDays - 1].time,
              "MMM"
            );
            let laterDay = parseInt(
              format(blankScheduleArray[0].slots[outputDays - 1].time, "d")
            );
            let weekDayList = blankScheduleArray[0].slots.map((day) => {
              return format(day.time, "EEE");
            });
            setDisplayData((prev) => ({
              ...prev,
              dateList,
              weekDayList,
              earliestDay: {
                month: earlyMonth,
                day: earlyDay,
              },
              latestDay: {
                month: laterMonth,
                day: laterDay,
              },
            }));
          }
        };
        prepArray();
        setLoad(false);
      }
    }, 500);
  }, [appointments, startDate, selectedService]);

  const incrementDate = () => {
    const newDate = addDays(startDate, outputDays);
    setStartDate(newDate);
  };

  const decrementDate = () => {
    const today = new Date();
    const newDate = subDays(startDate, outputDays);
    if (isBefore(addDays(newDate, 1), today)) {
      if (unlockDates) {
        setStartDate(newDate);
      }
      return;
    } else {
      setStartDate(newDate);
    }
  };

  const chosenStartDate = (chosenSlot: ScheduleDateType) => {
    if (timeOff) {
      if (chosenSlot.chosen) {
        let selectedTimeSpan = 1;
        let counter = 0;
        let chosenArray = dateTimeArray.map((hour) => {
          return {
            hour: hour.hour,
            slots: hour.slots.map((slot) => {
              slot.applicable = false;
              if (counter !== selectedTimeSpan) {
                if (isEqual(chosenSlot.time, slot.time)) {
                  counter += 1;
                  return { ...slot, chosen: false };
                }
              }
              return slot;
            }),
          };
        });
        if (!employeeCheck) {
          setDateTimeArray(chosenArray);
        }
      } else {
        let selectedTimeSpan = 1;
        let counter = 0;
        let chosenArray = dateTimeArray.map((hour) => {
          return {
            hour: hour.hour,
            slots: hour.slots.map((slot) => {
              slot.applicable = false;
              if (counter !== selectedTimeSpan) {
                if (isEqual(chosenSlot.time, slot.time)) {
                  counter += 1;
                  return { ...slot, chosen: true };
                }
              }
              return slot;
            }),
          };
        });
        if (!employeeCheck) {
          setDateTimeArray(chosenArray);
        }
      }
    } else {
      let chosenService = services?.find(
        (service) => service._id === selectedService
      );
      let counter = 0;
      let chosenArray = dateTimeArray.map((hour) => {
        return {
          hour: hour.hour,
          slots: hour.slots.map((slot) => {
            slot.chosen = false;
            slot.applicable = false;
            if (counter !== chosenService?.timeSpan) {
              if (chosenSlot.id == slot.id) {
                if (compareAsc(slot.time, chosenSlot.time) >= 0) {
                  counter += 1;
                  return { ...slot, chosen: true };
                }
              }
            }
            return slot;
          }),
        };
      });
      if (!employeeCheck) {
        setDateTimeArray(chosenArray);
      }
    }
    handleOnSelect(chosenSlot);
  };

  return (
    <>
      {load ? (
        <LoadingIconContainer marginBottom>
          <LoadingIcon padding />
        </LoadingIconContainer>
      ) : (
        <StyledTable>
          <StyledThead>
            <StyledTr head>
              <StyledTh>
                <ScheduleButton onClick={decrementDate} type="button">
                  <span>Prev</span>
                </ScheduleButton>
              </StyledTh>
              <StyledTh heading>
                {displayData.earliestDay.month} {displayData.earliestDay.day} -{" "}
                {displayData.earliestDay.month === displayData.latestDay.month
                  ? null
                  : displayData.latestDay.month}{" "}
                {displayData.latestDay.day}
              </StyledTh>
              <StyledTh>
                <ScheduleButton onClick={incrementDate} type="button">
                  <span>Next</span>
                </ScheduleButton>
              </StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            <StyledTr dateList>
              <StyledTh></StyledTh>
              {displayData.dateList.map((date, index) => {
                return (
                  <StyledTh column key={index}>
                    <p>{date.weekday}</p> <h6>{date.date}</h6>
                  </StyledTh>
                );
              })}
            </StyledTr>
            {dateTimeArray.map((time, index1) => {
              return (
                <StyledTr key={index1}>
                  <StyledTh
                    thirty={time.hour.includes("30") ? true : false}
                    key={index1}
                  >
                    {time.hour}
                  </StyledTh>
                  {time.slots.map((slot, index2) => {
                    return (
                      <StyledTh block key={index2}>
                        {slot.timeOff ? (
                          <ScheduleBlankButton
                            onClick={
                              timeOff ? () => chosenStartDate(slot) : undefined
                            }
                            offChosen={slot.chosen ? true : false}
                            type="button"
                          >
                            <p>Off</p>
                          </ScheduleBlankButton>
                        ) : slot?.closed ? (
                          <CrossSvg key={index2} />
                        ) : !slot.available &&
                          employeeCheck &&
                          slot.appointmentId ? (
                          <ScheduleBlankButton
                            chosen
                            enabled
                            onClick={() => chosenStartDate(slot)}
                            type="button"
                          >
                            <CrossSvg key={index2} />
                          </ScheduleBlankButton>
                        ) : !slot.available && slot.appointmentId ? (
                          <ScheduleBlankButton type="button">
                            <CrossSvg key={index2} />
                          </ScheduleBlankButton>
                        ) : slot.possibleHead ? (
                          <ScheduleBlankButton
                            applicable={slot.applicable ? true : false}
                            possibleHead={slot.possibleHead ? true : false}
                            chosen={slot.chosen ? true : false}
                            enabled
                            onClick={() => chosenStartDate(slot)}
                            type="button"
                          >
                            <CircleSvg
                              applicable={slot.applicable ? true : false}
                              possibleHead={slot.possibleHead ? true : false}
                              chosen={slot.chosen ? true : false}
                              key={index2}
                            />
                          </ScheduleBlankButton>
                        ) : (
                          <ScheduleBlankButton
                            applicable={slot.applicable ? true : false}
                            chosen={slot.chosen ? true : false}
                            type="button"
                          >
                            <CircleSvg
                              applicable={slot.applicable ? true : false}
                              chosen={slot.chosen ? true : false}
                              key={index2}
                            />
                          </ScheduleBlankButton>
                        )}
                      </StyledTh>
                    );
                  })}
                </StyledTr>
              );
            })}
          </StyledTbody>
        </StyledTable>
      )}
    </>
  );
};

export default ScheduleView;
