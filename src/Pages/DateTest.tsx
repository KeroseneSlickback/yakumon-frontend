import React, { useState } from "react";
import axios from "axios";
import { BackendResponseDataType } from "../Utilities/types";

function DateTest() {
  const [image, setImage] = useState("");

  const handleImageUpload = (e: any) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const formdata = new FormData();
    formdata.append("picture", image);
    try {
      axios
        .patch<BackendResponseDataType>(
          "http://localhost:8888/store/6260eb959a5d941c3ef2af40/picture",
          formdata,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Submit Image</label>
        <input
          type="file"
          name="picture"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageUpload}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default DateTest;
