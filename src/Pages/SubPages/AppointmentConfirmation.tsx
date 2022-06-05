import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StylistAppointmentType } from "../../Utilities/types";

const AppointmentConfirmation = () => {
  const { id } = useParams();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<StylistAppointmentType | null>(
    null
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const debounce = setTimeout(() => {
      const getData = async () => {
        await axios
          .get<StylistAppointmentType>(
            `http://localhost:8888/appointment/${id}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then((res) => {
            setLoad(false);
            setError(false);
            setAppointment(res.data);
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
            setError(true);
          });
      };
      getData();
    }, 300);
    return () => clearTimeout(debounce);
  }, []);

  return <div>AppointmentConfirmation</div>;
};

export default AppointmentConfirmation;
