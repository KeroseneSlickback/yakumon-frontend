import React, { ChangeEvent, useState, useEffect } from "react";
import {
  scheduleArrayBuild,
  scheduleBlockFilter,
} from "../Modules/Schedule/ScheduleHelpers";
import axios from "axios";
import { ReturnUserType, ScheduleArrayType } from "../Utilities/types";

interface ScheduleType {
  date: string;
  time: string;
}

function DateTest() {
  const [stylist, setStylist] = useState<ReturnUserType | null>(null);
  const [array, setArray] = useState<ScheduleArrayType[] | null>(null);
  const [formData, setFormData] = useState<ScheduleType>({
    date: "",
    time: "",
  });
  // const [dateTimeNow, setDateTimeNow] = useState<Date | number>(0);

  // const getDateNow = () => {
  //   const newDateTime = new Date(Date.now());
  //   setDateTimeNow(newDateTime);
  //   console.log(newDateTime);
  // };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
    }));
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      time: e.target.value,
    }));
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const currentDateTime = new Date(Date.now());
    const newDate = new Date(`${formData.date}T${formData.time}:00`);
    console.log(currentDateTime);
    console.log(newDate);
    console.log(formData);
  };

  const handleArrayTest = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const currentDateTime = new Date();
    const outputDays = 4;
    if (stylist?.appointments) {
      if (stylist.store?.hours) {
        const storeHours = stylist.store.hours;
        const preppedArray = await scheduleArrayBuild(
          currentDateTime,
          storeHours,
          outputDays,
          stylist?.appointments
        );
        // setArray(preppedArray);
        console.log(preppedArray);
      }
    }
  };

  const handleOneHour = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newArray = await scheduleBlockFilter(array, 2);
    console.log("One hour", newArray);
  };

  const handleTwoHour = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newArray = await scheduleBlockFilter(array, 1);
    console.log("Two hours", newArray);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<ReturnUserType>(
            `http://localhost:8888/user/6260eb669a5d941c3ef2af39`
          )
          .then((response) => {
            setStylist(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date"></label>
        <input type="date" value={formData.date} onChange={handleDateChange} />
        <input type="time" value={formData.time} onChange={handleTimeChange} />
        <button>Submit</button>
      </form>
      <br />
      <form onSubmit={handleArrayTest}>
        <button>Create Array</button>
      </form>
      <br />
      <form onSubmit={handleOneHour}>
        <button>Select 1 Hour Service</button>
      </form>
      <br />
      <form onSubmit={handleTwoHour}>
        <button>Create 2 Hour Service</button>
      </form>
    </div>
  );
}

export default DateTest;
