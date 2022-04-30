import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  ErrorContainer,
  LoadingIcon,
  LoadingIconContainer,
} from "../../Components/Page-accessories";
import {
  ReturnStoreType,
  ScheduleArrayType,
  ServiceType,
  StylistAppointmentType,
} from "../../Utilities/types";
import { buildTimeSelectionArray, scheduleArrayBuild } from "./ScheduleHelpers";
import circle from "../../Utilities/Images/SVGs/circle.svg";
import cross from "../../Utilities/Images/SVGs/cross.svg";
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
import { ScheduleButton } from "../../Components/Buttons";

interface SchedulePropTypes {
  appointments?: StylistAppointmentType[];
  services?: ServiceType[];
  selectedService?: string;
  store?: ReturnStoreType;
  reservation?: string;
}

const ScheduleView = ({
  appointments,
  services,
  selectedService,
  store,
  reservation,
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
  const [timeSelection, setTimeSelection] = useState<string[]>([]);
  console.log(store, services, selectedService, reservation);
  console.log(dateTimeArray);

  useEffect(() => {
    setLoad(true);
    // create a new startDate based on previous times the number of steps
    // When next/previous are clicked, increment date from that, but don't allow under 0
    const debounce = setTimeout(() => {
      if (appointments) {
        if (store?.hours) {
          const storeHours = store.hours;
          const preppedArray = async () => {
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
            console.log(dateList);
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
            // let timeLayoutArray = await buildTimeSelectionArray(
            //   startTime,
            //   endTime
            // );
            // console.log(timeLayoutArray);
          };
          preppedArray();
          setLoad(false);
        }
      }
    }, 700);
  }, [appointments]);

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
                <ScheduleButton>Prev</ScheduleButton>
              </StyledTh>
              <StyledTh colSpan={3}>
                {displayData.earliestDay.month} {displayData.earliestDay.day} -{" "}
                {displayData.earliestDay.month === displayData.latestDay.month
                  ? null
                  : displayData.latestDay.month}{" "}
                {displayData.latestDay.day}
              </StyledTh>
              <StyledTh>
                <ScheduleButton>Next</ScheduleButton>
              </StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            <StyledTr>
              <StyledTh></StyledTh>
              {displayData.dateList.map((date) => {
                return <StyledTh>{date}</StyledTh>;
              })}
            </StyledTr>
            {dateTimeArray.map((time) => {
              return (
                <StyledTr>
                  <StyledTh>{time.hour}</StyledTh>
                  {time.slots.map((slot) => {
                    return (
                      <StyledTh>
                        {slot?.closed ? (
                          <CrossSvg />
                        ) : !slot.applicable ? (
                          <CrossSvg />
                        ) : !slot.available ? (
                          <CrossSvg />
                        ) : (
                          <CircleSvg />
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
