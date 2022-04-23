import {
  addDays,
  addMinutes,
  getDay,
  isEqual,
  parseJSON,
  set,
  startOfDay,
} from "date-fns";
import {
  ScheduleArrayType,
  StoreDayHourFix,
  StylistAppointmentType,
} from "../../Utilities/types";

const flattenArrayDates = async (stylistArray: StylistAppointmentType[]) => {
  return stylistArray.flatMap((appointment) => {
    return appointment.timeSlots.flatMap((timeslot) => {
      return parseJSON(timeslot.slotDateTime);
    });
  });
};

const compareDatesInArray = async (array: Date[], givenDate: Date) => {
  let findMatching = (date: Date) => {
    return isEqual(date, givenDate);
  };
  return array.findIndex(findMatching);
};

export const scheduleArrayBuild = async (
  startDate: Date,
  storeHours: StoreDayHourFix[],
  outputDays: number,
  stylistAppointments: StylistAppointmentType[]
) => {
  let scheduleArray: ScheduleArrayType[] = [];
  let timesTakenArray = await flattenArrayDates(stylistAppointments);

  // This loop is creating dates based from outputDays # and the startDate
  for (let i = outputDays; i > 0; i--) {
    let assignedDate = startOfDay(addDays(startDate, i));
    let dayOfWeek = getDay(assignedDate);

    // This loop is looping through store hours
    for (let j = storeHours.length - 1; j >= 0; j--) {
      // this checks for if the storehour day matches with the assignedDate day of the week
      // if it does, do something; if not, skip
      if (j === dayOfWeek) {
        let hoursArray = [];

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

        let workingTimeDateObj = {};

        const comparedDateToArray = await compareDatesInArray(
          timesTakenArray,
          scheduleTime
        );

        if (comparedDateToArray >= 0) {
          workingTimeDateObj = {
            ...workingTimeDateObj,
            available: false,
            applicable: false,
          };
        } else {
          workingTimeDateObj = {
            ...workingTimeDateObj,
            available: true,
            applicable: true,
          };
        }

        if (storeHours[j].closed) {
          workingTimeDateObj = {
            ...workingTimeDateObj,
            closed: true,
          };
        } else {
          workingTimeDateObj = {
            ...workingTimeDateObj,
            closed: false,
          };
        }

        workingTimeDateObj = {
          ...workingTimeDateObj,
          time: parseJSON(scheduleTime),
        };

        hoursArray.push(workingTimeDateObj);

        while (scheduleTime < endScheduleTime) {
          let workingTime = addMinutes(scheduleTime, 30);
          if (workingTime >= endScheduleTime) {
            break;
          }
          scheduleTime = workingTime;

          const comparedDateToArray = await compareDatesInArray(
            timesTakenArray,
            scheduleTime
          );

          if (comparedDateToArray >= 0) {
            workingTimeDateObj = {
              ...workingTimeDateObj,
              available: false,
              applicable: false,
            };
          } else {
            workingTimeDateObj = {
              ...workingTimeDateObj,
              available: true,
              applicable: true,
            };
          }

          if (storeHours[j].closed) {
            workingTimeDateObj = {
              ...workingTimeDateObj,
              closed: true,
            };
          } else {
            workingTimeDateObj = {
              ...workingTimeDateObj,
              closed: false,
            };
          }

          workingTimeDateObj = {
            ...workingTimeDateObj,
            time: parseJSON(workingTime),
          };

          hoursArray.push(workingTimeDateObj);
        }
        scheduleArray.unshift({
          day: assignedDate,
          hours: hoursArray,
        });
      }
    }
  }
  return scheduleArray;
};

// const checkAppointments = async (
//   preppedArray: ScheduleArrayType[],
//   timeArray: Date[]
// ) => {
//   return preppedArray.map((obj) => {
//     return obj.hours.map((hour) => {
//       for (let i = 0; i < timeArray.length; i++) {
//         console.log(typeof hour, typeof timeArray[i]);
//         // if (timeArray[i] > hour.time || timeArray[i] < hour.time) {
//         //   console.log("same!");
//         // }
//       }
//       // if () {
//       //   console.log("contains!");
//       // }
//     });
//   });
// };

// export const scheduleArrayFiller = async (
//   preppedArray: ScheduleArrayType[],
//   stylistTestData: StylistAppointmentType[]
// ) => {
//   // accepts: previously built array, employee's appointments + timeslots
//   // outputs: previous array with timeslots changed if employee's timeslots are filled
//   // catch: if array slot's closed is true, do nothing

//   let timesTakenArray = await flattenArrayDates(stylistTestData);
//   // let parsed = parseJSON(timesTakenArray[0]);
//   // console.log(typeof parsed);
//   console.log(timesTakenArray[0], preppedArray[0].hours[1].time);
//   let compared = compareAsc(timesTakenArray[0], preppedArray[0].hours[1].time);
//   console.log(compared);

//   // console.log();

//   // let filledArray = await checkAppointments(preppedArray, timesTakenArray);
//   // console.log(filledArray);
//   let hello = "hello";
//   return hello;
// };

export const scheduleBlockFilter = async (
  scheduleArray: ScheduleArrayType[] | null,
  steps: number
) => {
  return scheduleArray?.map((day) => {
    let aggrivateArray: any[] = [];
    let countingArray = [];
    let countingIndexs = [];
    for (let i = 0; i < day.hours.length; i++) {
      let workingTimeSlot = day.hours[i];
      if (workingTimeSlot.applicable && !workingTimeSlot.closed) {
        countingArray.push(workingTimeSlot);
        countingIndexs.push(day.hours.indexOf(workingTimeSlot));

        if (countingArray.length === steps) {
          aggrivateArray.push(countingArray);
          countingArray = [];
        }

        // if (countingArray.length < steps) {
        // } else if (countingArray.length === steps) {
        //   countingArray.push(workingTimeSlot);
        //   countingIndexs.push(day.hours.indexOf(workingTimeSlot));
        //   aggrivateArray.push(...countingArray);
        //   countingArray = [];
        // }
      }
      // find the indexes and alter the objects then return
      // day.hours[i] = {
      //   ...day.hours[i],
      //   applicable: true,
      // };
    }
    console.log(aggrivateArray, countingArray, countingIndexs);
    // take countingArray
  });
  // accepts: previously filled array and timeslot amount based on service
  // outputs: an array with timeslots' available set true/false
  // catch: if array slot's closed is true, do nothing
  console.log(scheduleArray, steps);
};

/*

  maps through array to enter each day
  within each day, breaks into each 30min block
  if 

*/
