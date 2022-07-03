import { useEffect, useState } from "react";
import { StoreDayHour } from "../Utilities/types";

interface Props {
  day: StoreDayHour;
  weekday: string;
}

const StoreHour = ({ day, weekday }: Props) => {
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");

  useEffect(() => {
    let openTimeArray = day.open.split(":").map((x) => parseFloat(x));
    let closeTimeArray = day.close.split(":").map((x) => parseFloat(x));
    if (openTimeArray.length > 1) {
      if (openTimeArray[0] === 12) {
        setOpen(`12:${openTimeArray[1]} pm`);
      } else if (openTimeArray[0] > 12) {
        setOpen(`${openTimeArray[0] % 12}:${openTimeArray[1]} pm`);
      } else {
        setOpen(`${openTimeArray[0]}:${openTimeArray[1]} am`);
      }
    } else {
      if (openTimeArray[0] === 12) {
        setOpen("12:00 pm");
      } else if (openTimeArray[0] > 12) {
        setOpen(`${openTimeArray[0] % 12}:00 pm`);
      } else {
        setOpen(`${openTimeArray[0]}:00 am`);
      }
    }
    if (closeTimeArray.length > 1) {
      if (closeTimeArray[0] === 12) {
        setClose(`12:${closeTimeArray[1]} pm`);
      } else if (closeTimeArray[0] > 12) {
        setClose(`${closeTimeArray[0] % 12}:${closeTimeArray[1]} pm`);
      } else {
        setClose(`${closeTimeArray[0]}:${closeTimeArray[1]} am`);
      }
    } else {
      if (closeTimeArray[0] === 12) {
        setClose("12:00 pm");
      } else if (closeTimeArray[0] > 12) {
        setClose(`${closeTimeArray[0] % 12}:00 pm`);
      } else {
        setClose(`${closeTimeArray[0]}:00 am`);
      }
    }
  }, [day]);

  return (
    <tr>
      <td>{weekday}:</td>
      <td>{open}</td>
      <td> - </td>
      <td>{close}</td>
    </tr>
  );
};

export default StoreHour;
