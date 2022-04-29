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
    startTime: 0,
    endTime: 48,
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
  console.log(services, selectedService, reservation);
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
            const { newReturnArray, earliest, latest } =
              await scheduleArrayBuild(
                startDate,
                storeHours,
                outputDays,
                appointments
              );
            setDateTimeArray(newReturnArray);
            let dateList = newReturnArray.map((day) => {
              return format(day.day, "MM/dd").replace(/^0+/, "");
            });
            let startTime = earliest * 2;
            let endTime = latest * 2;
            let earlyMonth = format(newReturnArray[0].day, "MMM");
            let earlyDay = parseInt(format(newReturnArray[0].day, "d"));
            let laterMonth = format(newReturnArray[outputDays - 1].day, "MMM");
            let laterDay = parseInt(
              format(newReturnArray[outputDays - 1].day, "d")
            );
            setDisplayData((prev) => ({
              ...prev,
              startTime,
              endTime,
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
        <table>
          <thead>
            <tr>
              <th>Prev</th>
              <th colSpan={3}>
                {displayData.earliestDay.month} {displayData.earliestDay.day} -{" "}
                {displayData.earliestDay.month === displayData.latestDay.month
                  ? null
                  : displayData.latestDay.month}{" "}
                {displayData.latestDay.day}
              </th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9 am</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
            </tr>
            <tr>
              <td>10 am</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>11 am</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>12 pm</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
            </tr>
            <tr>
              <td>1 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>2 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>3 pm</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
            </tr>
            <tr>
              <td>4 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>5 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>6 pm</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
              <td>Aval</td>
            </tr>
            <tr>
              <td>7 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>8 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
            <tr>
              <td>9 pm</td>
              <td>Aval</td>
              <td>UnAval</td>
              <td>UnAval</td>
              <td>UnAval</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default ScheduleView;
