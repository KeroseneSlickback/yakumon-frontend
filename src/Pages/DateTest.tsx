import React, { ChangeEvent, useState, useEffect } from "react";
import { add } from "date-fns";
import {
  scheduleArrayBuild,
  scheduleArrayFiller,
} from "../Modules/Schedule/ScheduleHelpers";
import { storeHours } from "../Utilities/StylistTestData";
import axios from "axios";
import { ReturnUserType } from "../Utilities/types";

interface ScheduleType {
  date: string;
  time: string;
}

function DateTest() {
  const [stylist, setStylist] = useState<ReturnUserType | null>(null);
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
    const preppedArray = await scheduleArrayBuild(
      currentDateTime,
      storeHours,
      outputDays
    );
    if (stylist?.appointments) {
      const filteredArray = await scheduleArrayFiller(
        preppedArray,
        stylist?.appointments
      );
      console.log(filteredArray);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<ReturnUserType>(
            `http://localhost:8888/user/624817f3c3320f65cc2f5856`
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
      <form onSubmit={handleArrayTest}>
        <button>Create Array</button>
      </form>
    </div>
  );
}

export default DateTest;
