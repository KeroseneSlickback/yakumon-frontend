import React, { ChangeEvent, useState } from "react";
import { add } from "date-fns";

interface ScheduleType {
  date: string;
  time: string;
}

function DateTest() {
  const [formData, setFormData] = useState<ScheduleType>({
    date: "",
    time: "",
  });
  const [dateTimeNow, setDateTimeNow] = useState<Date | number>(0);

  const getDateNow = () => {
    const newDateTime = new Date(Date.now());
    setDateTimeNow(newDateTime);
    console.log(newDateTime);
  };

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
    console.log(formData);
    const newDate = new Date(`${formData.date}T${formData.time}:00`);
    console.log(newDate);
    console.log(typeof newDate);
  };

  const addThirty = () => {
    const newTime = add(dateTimeNow, { minutes: 30 });
    console.log(newTime);
  };

  return (
    <div>
      <button onClick={getDateNow}>Date Now</button>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date"></label>
        <input type="date" value={formData.date} onChange={handleDateChange} />
        <input type="time" value={formData.time} onChange={handleTimeChange} />
        <button>Submit</button>
      </form>
      <button onClick={addThirty}>Add 30mins</button>
      <button>Add 1 hour</button>
      <button>Add 2 hour and 15mins</button>
    </div>
  );
}

export default DateTest;
