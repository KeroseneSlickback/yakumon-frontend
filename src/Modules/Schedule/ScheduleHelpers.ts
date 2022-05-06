import { time } from "console";
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
  ScheduleDateType,
  StoreDayHour,
  StylistAppointmentType,
} from "../../Utilities/types";

// helper function, flattens stylist's appointment timeSlots to a single array of day/times
const flattenArrayDates = async (stylistArray: StylistAppointmentType[]) => {
  return stylistArray.flatMap((appointment) => {
    return appointment.timeSlots.flatMap((timeslot) => {
      return parseJSON(timeslot.slotDateTime);
    });
  });
};

// helper function that compares an array of dates to given date
// work around due to date-fns having issues with async/await functionality
const compareDatesInArray = async (array: Date[], givenDate: Date) => {
  let findMatching = (date: Date) => {
    return isEqual(date, givenDate);
  };
  return array.findIndex(findMatching);
};

// const compareAndFillArray = async (
//   blankArray: ScheduleArrayType[],
//   takenArray: Date[]
// ) => {
//   let returnArray = [];

//   for (let i = 0; i < blankArray.length; i++) {
//     let slots = blankArray[i].slots;
//     let hour = blankArray[i].hour;
//     let slotsArray: any[] = [];
//     for (let j = 0; j < slots.length; j++) {
//       let slot = slots[j];
//       let filledTimeSlot = await compareDatesInArray(takenArray, slot.time);
//       console.log("CHECK", filledTimeSlot);
//       if (filledTimeSlot >= 0) {
//         slot = {
//           ...slot,
//           available: false,
//           applicable: false,
//         };
//       } else {
//         slot = {
//           ...slot,
//           available: true,
//           applicable: false,
//         };
//       }
//       slotsArray.push(slot);
//     }
//     returnArray.push({
//       hour,
//       slots: slotsArray,
//     });
//   }
//   return returnArray;
// };

const outputByHour = async (
  array: StoreDayHour[],
  givenDate: Date,
  steps: number
) => {
  let open = 25;
  let close = 0;
  let amPmString = "am";
  let builtArray: ScheduleArrayType[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    let openTime = parseFloat(array[i].open.split(":").join("."));
    if (openTime < open) open = openTime;
    let closeTime = parseFloat(array[i].close.split(":").join("."));
    if (closeTime > close) close = closeTime;
  }
  while (open < close) {
    let daysArray = [];
    let timeArray = open
      .toString()
      .split(".")
      .map((x, i) => parseFloat(i === 1 ? x + "0" : x));
    for (let j = 1; j <= steps; j++) {
      let assignedDate = startOfDay(addDays(givenDate, j));
      let assignedWeekday = getDay(assignedDate);
      let workingTime = set(assignedDate, {
        hours: timeArray[0],
        minutes: timeArray[1],
      });
      let storeOpenArray = array[assignedWeekday].open
        .split(":")
        .map((x) => parseFloat(x));
      let storeOpenTime = set(assignedDate, {
        hours: storeOpenArray[0],
        minutes: storeOpenArray[1],
      });
      let storeCloseArray = array[assignedWeekday].close
        .split(":")
        .map((x) => parseFloat(x));
      let storeCloseTime = set(assignedDate, {
        hours: storeCloseArray[0],
        minutes: storeCloseArray[1],
      });
      if (
        array[assignedWeekday].closed ||
        workingTime < storeOpenTime ||
        workingTime >= storeCloseTime
      ) {
        daysArray.push({
          time: workingTime,
          closed: true,
          available: false,
          applicable: false,
        });
      } else {
        daysArray.push({
          time: workingTime,
          closed: false,
          available: true,
          applicable: false,
        });
      }
      if (open === 12) {
        amPmString = "pm";
      }
    }
    if (open % 1 !== 0) {
      if (amPmString === "pm") {
        if (timeArray[0] === 12) {
          builtArray.push({
            hour: `${timeArray[0]}:30 ${amPmString}`,
            slots: daysArray,
          });
        } else {
          builtArray.push({
            hour: `${timeArray[0] - 12}:30 ${amPmString}`,
            slots: daysArray,
          });
        }
      } else {
        builtArray.push({
          hour: `${timeArray[0]}:30 ${amPmString}`,
          slots: daysArray,
        });
      }
    } else {
      if (amPmString === "pm") {
        if (timeArray[0] === 12) {
          builtArray.push({
            hour: `${timeArray[0]}:00 ${amPmString}`,
            slots: daysArray,
          });
        } else {
          builtArray.push({
            hour: `${timeArray[0] - 12}:00 ${amPmString}`,
            slots: daysArray,
          });
        }
      } else {
        builtArray.push({
          hour: `${timeArray[0]}:00 ${amPmString}`,
          slots: daysArray,
        });
      }
    }
    // add .5 to open
    if (open % 1 !== 0) {
      open += 0.7;
    } else {
      open += 0.3;
    }
  }
  return builtArray;
};

/*

First function to be called to prepare an array
Accepts a Date to start building the array following that day so same-day appointments cannot be made
First Date is always current day, then incremented before calling function
Accepts store's open hours in the following:
[
    {
        "open": "8",
        "close": "20",
        "closed": false,
        "_id": "6260eb959a5d941c3ef2af41"
    },
    {
        "open": "9",
        "close": "19",
        "closed": false,
        "_id": "6260eb959a5d941c3ef2af42"
    },
    .........
    {
        "open": "11",
        "close": "14:30",
        "closed": false,
        "_id": "6260eb959a5d941c3ef2af43"
    },
    ...........
]
Function changes the string of numbers into an array to help compile time if time is not a whole number
Accepts output days to know how many days ahead to create
Accepts stylist appointments in the following:
[
    {
        "_id": "626368fcd62e7a3784491f13",
        "timeSlots": [
            {
                "_id": "626368fcd62e7a3784491f0f",
                "slotDateTime": "2022-04-24T01:00:00.000Z",
                "createdAt": "2022-04-21T07:23:00.000Z",
                "owner": "6260eb669a5d941c3ef2af39",
                "employee": "6260eb669a5d941c3ef2af39",
                "__v": 0,
                "appointment": "626368fcd62e7a3784491f13"
            },
            {
                "_id": "626368fcd62e7a3784491f11",
                "slotDateTime": "2022-04-24T01:30:00.000Z",
                "createdAt": "2022-04-21T07:23:00.000Z",
                "owner": "6260eb669a5d941c3ef2af39",
                "employee": "6260eb669a5d941c3ef2af39",
                "__v": 0,
                "appointment": "626368fcd62e7a3784491f13"
            }
        ],
        "service": "6260ebbb9a5d941c3ef2af5c",
        "owner": "6260eb669a5d941c3ef2af39",
        "employee": "6260eb669a5d941c3ef2af39",
        "__v": 0
    },
]
Function calls helper function to flatten the timeSlot dates
Function creates a blank array, then compares date/times to appointment flattened array to set availability

*/

export const scheduleArrayBuild = async (
  startDate: Date,
  storeHours: StoreDayHour[],
  outputDays: number,
  stylistAppointments: StylistAppointmentType[]
) => {
  let timesTakenArray = await flattenArrayDates(stylistAppointments);
  let builtArray = await outputByHour(storeHours, startDate, outputDays);
  console.log(builtArray);
  // return { newReturnArray, earliest, latest };
  return builtArray;
};

export const scheduleBlockFilter = async (
  scheduleArray: ScheduleArrayType[] | null,
  steps: number
) => {
  return scheduleArray?.map((day) => {
    let aggrivateArray: any[] = [];
    let countingArray = [];
    for (let i = 0; i < day.slots.length; i++) {
      let workingTimeSlot = day.slots[i];
      // when an appointment section is found
      if (!workingTimeSlot.available || workingTimeSlot.closed) {
        // when the countingArray meets or exceeds set steps
        if (countingArray.length >= steps) {
          // itterate and alter current array as they are applicable
          let tailCalc = countingArray.length - steps;
          let randomId = Math.floor(Math.random() * 100000);
          let newCountingArray = countingArray.map((obj, index) => {
            // index/counting error
            if (index <= tailCalc) {
              return (obj = {
                ...obj,
                applicable: true,
                id: randomId,
                possibleHead: true,
              });
            } else {
              return (obj = {
                ...obj,
                applicable: true,
                id: randomId,
                possibleHead: false,
              });
            }
          });
          // Then add applicable timeslots to aggrivate array,
          aggrivateArray.push(...newCountingArray);
          // clear current array
          countingArray = [];
          // push non applicable to aggrivate array
          aggrivateArray.push(workingTimeSlot);
          randomId = Math.floor(Math.random() * 100000);
        } else {
          countingArray.push(workingTimeSlot);
          aggrivateArray.push(...countingArray);
          countingArray = [];
        }
      } else if (workingTimeSlot.available && !workingTimeSlot.closed) {
        countingArray.push(workingTimeSlot);
        // clean up
        if (i === day.slots.length - 1) {
          if (countingArray.length >= steps) {
            let tailCalc = countingArray.length - steps;
            let randomId = Math.floor(Math.random() * 100000);
            let newCountingArray = countingArray.map((obj, index) => {
              if (index <= tailCalc) {
                return (obj = {
                  ...obj,
                  applicable: true,
                  id: randomId,
                  possibleHead: true,
                });
              } else {
                return (obj = {
                  ...obj,
                  applicable: true,
                  id: randomId,
                  possibleHead: false,
                });
              }
            });

            randomId = Math.floor(Math.random() * 100000);
            aggrivateArray.push(...newCountingArray);
            countingArray = [];
          } else {
            countingArray.push(workingTimeSlot);
            aggrivateArray.push(...countingArray);
            countingArray = [];
          }
        }
      }
    }
    return aggrivateArray;
  });
};
