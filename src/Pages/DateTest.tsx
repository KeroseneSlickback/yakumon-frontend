import React, { ChangeEvent, useState } from "react";
// import { add } from "date-fns";

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
    const currentDate = new Date(Date.now());
    const newDate = new Date(`${formData.date}T${formData.time}:00`);
    console.log("Current date and time:", currentDate);
    console.log("Scheduled date and time:", newDate);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date"></label>
        <input type="date" value={formData.date} onChange={handleDateChange} />
        <input type="time" value={formData.time} onChange={handleTimeChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default DateTest;
