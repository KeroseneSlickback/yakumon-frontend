import { addDays, addMinutes, getDay, set, startOfDay } from "date-fns";
import { ScheduleArrayType, StoreDayHourFix } from "../../Utilities/types";

export const scheduleArrayBuild = (
  startDate: Date,
  storeHours: StoreDayHourFix[],
  outputDays: number
) => {
  let scheduleArray: ScheduleArrayType[] = [];

  // This loop is creating dates based from outputDays # and the startDate
  for (let i = outputDays; i > 0; i--) {
    let assignedDate = startOfDay(addDays(startDate, i));
    let dayOfWeek = getDay(assignedDate);

    // This loop is looping through store hours
    for (let j = storeHours.length - 1; j >= 0; j--) {
      // this checks for if the storehour day matches with the assignedDate day of the week
      // if it does, do something; if not, skip
      if (j === dayOfWeek) {
        let hours = [];
        let startTimeArray = storeHours[j].open
          .split(":")
          .map((x) => parseFloat(x));
        let scheduleTime = set(assignedDate, {
          hours: startTimeArray[0],
          minutes: startTimeArray[1],
        });

        let closeTimeArray = storeHours[j].close
          .split(":")
          .map((x) => parseFloat(x));
        let endScheduleTime = set(assignedDate, {
          hours: closeTimeArray[0],
          minutes: closeTimeArray[1],
        });

        if (storeHours[j].closed) {
          hours.push({
            time: scheduleTime,
            available: false,
            applicable: false,
          });
        } else {
          hours.push({
            time: scheduleTime,
            available: true,
            applicable: true,
          });
        }

        while (scheduleTime < endScheduleTime) {
          // let workingScheduleObject = {};
          let workingTime = addMinutes(scheduleTime, 30);
          if (workingTime >= endScheduleTime) {
            break;
          }
          scheduleTime = workingTime;
          if (storeHours[j].closed) {
            hours.push({
              time: workingTime,
              available: false,
              applicable: false,
            });
          } else {
            hours.push({
              time: workingTime,
              available: true,
              applicable: true,
            });
          }
        }
        scheduleArray.unshift({
          day: assignedDate,
          hours,
        });
      }
    }
  }

  return scheduleArray;
};
