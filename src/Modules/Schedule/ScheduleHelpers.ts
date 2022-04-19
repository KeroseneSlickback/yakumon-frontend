import {
  addDays,
  addMinutes,
  getDay,
  parseISO,
  parseJSON,
  set,
  startOfDay,
} from "date-fns";
import {
  ScheduleArrayType,
  StoreDayHourFix,
  StylistAppointmentType,
} from "../../Utilities/types";

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
            time: parseJSON(scheduleTime),
            available: false,
            applicable: false,
            closed: true,
          });
        } else {
          hours.push({
            time: parseJSON(scheduleTime),
            available: false,
            applicable: false,
            closed: false,
          });
        }

        while (scheduleTime < endScheduleTime) {
          let workingTime = addMinutes(scheduleTime, 30);
          if (workingTime >= endScheduleTime) {
            break;
          }
          scheduleTime = workingTime;
          if (storeHours[j].closed) {
            hours.push({
              time: parseJSON(workingTime),
              available: false,
              applicable: false,
              closed: false,
            });
          } else {
            hours.push({
              time: parseJSON(workingTime),
              available: true,
              applicable: false,
              closed: false,
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

const flattenArrayDates = async (stylistArray: StylistAppointmentType[]) => {
  return stylistArray.flatMap((appointment) => {
    return appointment.timeSlots.flatMap((timeslot) => {
      return parseJSON(timeslot.slotDateTime);
    });
  });
};

const checkAppointments = async (
  preppedArray: ScheduleArrayType[],
  timeArray: Date[]
) => {
  return preppedArray.map((obj) => {
    return obj.hours.map((hour) => {
      for (let i = 0; i < timeArray.length; i++) {
        console.log(hour);
        // console.log(timeArray[i], typeof parseISO(hour.time));
        // if (timeArray[i] > hour.time || timeArray[i] > hour.time) {
        //   console.log("same!");
        // }
      }
      // if () {
      //   console.log("contains!");
      // }
    });
  });
};

export const scheduleArrayFiller = async (
  preppedArray: ScheduleArrayType[],
  stylistTestData: StylistAppointmentType[]
) => {
  // console.log(preppedArray, stylistTestData);
  // accepts: previously built array, employee's appointments + timeslots
  // outputs: previous array with timeslots changed if employee's timeslots are filled
  // catch: if array slot's closed is true, do nothing

  let timesTakenArray = await flattenArrayDates(stylistTestData);
  // let parsed = parseJSON(timesTakenArray[0]);
  // console.log(typeof parsed);
  console.log(timesTakenArray[0], preppedArray[0].hours[0].time);

  // console.log();

  // let filledArray = await checkAppointments(preppedArray, timesTakenArray);
  // console.log(filledArray);
  let hello = "hello";
  return hello;
};

export const scheduleBlockFilter = () => {
  // accepts: previously filled array and timeslot amount based on service
  // outputs: an array with timeslots' available set true/false
  // catch: if array slot's closed is true, do nothing
};
