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
import { scheduleArrayBuild } from "./ScheduleHelpers";

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
  const [displayDate, setDisplayDate] = useState({ start: "", end: "" });
  console.log(appointments, services, selectedService, store, reservation);

  useEffect(() => {
    setLoad(true);
    // create a new startDate based on previous times the number of steps
    // When next/previous are clicked, increment date from that, but don't allow under 0
    const debounce = setTimeout(() => {
      if (appointments) {
        if (store?.hours) {
          const storeHours = store.hours;
          const preppedArray = async () => {
            const preppedData = await scheduleArrayBuild(
              startDate,
              storeHours,
              outputDays,
              appointments
            );
            setDateTimeArray(preppedData);
            console.log(preppedData);
          };
          preppedArray();
          setLoad(false);
        }
      }
    }, 700);
  }, [appointments]);

  return (
    <>
      {" "}
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
              <th colSpan={3}>April 9 - 12</th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <th>4/9</th>
              <th>4/10</th>
              <th>4/11</th>
              <th>4/12</th>
            </tr>
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
