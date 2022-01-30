import React, { ChangeEvent, useEffect, useState } from "react";

function Home() {
  const [formData, setFormData] = useState("");

  const getDateNow = () => {
    console.log(Date.now());
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <button onClick={getDateNow}>Date Now</button>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date"></label>
        <input type="date" value={formData} onChange={handleDateChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Home;
