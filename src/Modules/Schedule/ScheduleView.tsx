import { format, addDays, subDays, isBefore } from "date-fns";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";
import {
  ReturnStoreType,
  ScheduleArrayType,
  ScheduleDateType,
  ServiceType,
  StylistAppointmentType,
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
import { compareAsc } from "date-fns/esm";

interface SchedulePropTypes {
  appointments?: StylistAppointmentType[];
  services?: ServiceType[];
  selectedService?: string;
  store?: ReturnStoreType;
  handleOnSelect: (params: any) => any;
}

const ScheduleView = ({
  appointments,
  services,
  selectedService,
  store,
  handleOnSelect,
}: SchedulePropTypes) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [outputDays, setOutputDays] = useState<number>(4);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [dateTimeArray, setDateTimeArray] = useState<ScheduleArrayType[]>([]);
  const [displayData, setDisplayData] = useState({
    dateList: ["1/1", "1/2", "1/3", "1/4"],
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
    setLoad(true);
    // create a new startDate based on previous times the number of steps
    // When next/previous are clicked, increment date from that, but don't allow under 0
    setTimeout(() => {
      if (appointments) {
        if (store?.hours) {
          const storeHours = store.hours;
          const prepArray = async () => {
            const blankScheduleArray = await scheduleArrayBuild(
              startDate,
              storeHours,
              outputDays,
              appointments
            );
            setDateTimeArray(blankScheduleArray);
            let dateList = blankScheduleArray[0].slots.map((day) => {
              return format(day.time, "MM/dd").replace(/^0+/, "");
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
          };
          prepArray();
          setLoad(false);
        }
      }
    }, 700);
  }, [appointments, startDate]);

  useEffect(() => {
    // Find timeSpan of given array of objects of services
    if (services) {
      setLoad(true);
      let foundService = services.find(
        (service) => service._id === selectedService
      );
      if (foundService?.timeSpan) {
        let timeSpan = foundService.timeSpan;
        setTimeout(() => {
          const rePrepArray = async () => {
            const selectedScheduleArray = await scheduleSectionFilter(
              dateTimeArray,
              timeSpan
            );
            setDateTimeArray(selectedScheduleArray);
          };
          rePrepArray();
          setLoad(false);
        }, 700);
      }
    }
  }, [selectedService]);

  const incrementDate = () => {
    const newDate = addDays(startDate, outputDays);
    setStartDate(newDate);
  };

  const decrementDate = () => {
    const today = new Date();
    const newDate = subDays(startDate, outputDays);
    if (isBefore(addDays(newDate, 1), today)) {
      // Pop up a warning?
      return;
    } else {
      setStartDate(newDate);
    }
  };

  const chosenStartDate = (chosenSlot: ScheduleDateType) => {
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
            if (compareAsc(chosenSlot.time, slot.time) <= 0) {
              if (chosenSlot.id === slot.id) {
                counter += 1;
                return { ...slot, chosen: true };
              }
            }
          }
          return slot;
        }),
      };
    });
    setDateTimeArray(chosenArray);
    handleOnSelect(chosenSlot);
  };

  return (
    <>
      {error ? (
        <ErrorContainer>
          <h3>There was an error.</h3>
        </ErrorContainer>
      ) : load ? (
        <LoadingIconContainer>
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
                return <StyledTh key={index}>{date}</StyledTh>;
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
                        {slot?.closed ? (
                          <CrossSvg key={index2} />
                        ) : !slot.available ? (
                          <CrossSvg key={index2} />
                        ) : slot.possibleHead ? (
                          <ScheduleBlankButton
                            applicable={slot.applicable ? true : false}
                            possibleHead={slot.possibleHead ? true : false}
                            chosen={slot.chosen ? true : false}
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
