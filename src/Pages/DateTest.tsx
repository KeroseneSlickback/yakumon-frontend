import React, { ChangeEvent, useState } from "react";
import { add } from "date-fns";
import { scheduleArrayBuild } from "../Modules/Schedule/ScheduleHelpers";

interface ScheduleType {
  date: string;
  time: string;
}

function DateTest() {
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

  const storeHours = [
    {
      open: "9:30",
      close: "19:30",
      closed: true,
      _id: "6248182cc3320f65cc2f485a",
    },
    {
      open: "9",
      close: "19",
      closed: true,
      _id: "6248182cc3320f65cc2f585a",
    },
    {
      open: "9",
      close: "19",
      closed: false,
      _id: "6248182cc3320f65cc2f585b",
    },
    {
      open: "9",
      close: "19",
      closed: false,
      _id: "6248182cc3320f65cc2f585c",
    },
    {
      open: "9",
      close: "19",
      closed: false,
      _id: "6248182cc3320f65cc2f585d",
    },
    {
      open: "9",
      close: "19",
      closed: false,
      _id: "6248182cc3320f65cc2f585e",
    },
    {
      open: "9",
      close: "19",
      closed: false,
      _id: "6248182cc3320f65cc2f585f",
    },
  ];

  const handleArrayTest = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const currentDateTime = new Date();
    const outputDays = 4;
    const preppedArray = scheduleArrayBuild(
      currentDateTime,
      storeHours,
      outputDays
    );
    console.log(preppedArray);
  };

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
