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

const outputBlankSchedule = async (
  array: StoreDayHour[],
  givenDate: Date,
  steps: number
) => {
  let earliest = 25;
  let latest = 0;
  let builtArray: ScheduleArrayType[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    let openTime = parseFloat(array[i].open.split(":").join("."));
    if (openTime < earliest) earliest = openTime;
    let closeTime = parseFloat(array[i].close.split(":").join("."));
    if (closeTime > latest) latest = closeTime;
  }
  for (let j = 1; j <= steps; j++) {
    let hoursArray: ScheduleDateType[] = [];
    let assignedDate = startOfDay(addDays(givenDate, j));
    let startTimeArray = earliest
      .toString()
      .split(".")
      .map((x) => parseFloat(x));
    let scheduleTime = set(assignedDate, {
      hours: startTimeArray[0],
      minutes: startTimeArray[1],
    });
    let endTimeArray = latest
      .toString()
      .split(".")
      .map((x) => parseFloat(x));
    let endTime = set(assignedDate, {
      hours: endTimeArray[0],
      minutes: endTimeArray[1],
    });
    hoursArray.push({
      time: scheduleTime,
    });
    while (scheduleTime < endTime) {
      let workingObj = {};
      let workingTime = addMinutes(scheduleTime, 30);
      if (workingTime >= endTime) break;
      scheduleTime = workingTime;
      workingObj = {
        time: workingTime,
      };
      hoursArray.push(workingObj);
    }
    builtArray.push({
      day: assignedDate,
      hours: hoursArray,
    });
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
  let scheduleArray: ScheduleArrayType[] = [];
  let timesTakenArray = await flattenArrayDates(stylistAppointments);
  let blankScheduleArray = await outputBlankSchedule(
    storeHours,
    startDate,
    outputDays
  );
  console.log(blankScheduleArray);

  // This loop is creating dates based from outputDays # and the startDate
  // Loop creates arrray backwards to make use of unshift() ordering
  for (let i = outputDays; i > 0; i--) {
    // date-fns finds the start of the assigned date
    // starts with initial start date, then decrements with array
    let assignedDate = startOfDay(addDays(startDate, i));
    // date-fns recalls 0-6 for day of the week
    let dayOfWeek = getDay(assignedDate);

    // This loop is looping through store hours
    for (let j = storeHours.length - 1; j >= 0; j--) {
      // this checks for if the storehour day matches with the assignedDate day of the week
      // if it does, do something; if not, skip
      // Store's open/close array is set from Sun-Sat as date-fns uses 0 as Sun, 6 as Sat, so array.length is used as weekday #
      if (j === dayOfWeek) {
        // array to keep the finished day/time objects
        let hoursArray = [];
        // these functions break the "9:30" strings into an array
        let startTimeArray = storeHours[j].open
          .split(":")
          .map((x) => parseFloat(x));
        // Then date-fns creates a
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
        // day/time object initialization to build on
        let workingTimeDateObj = {};
        // compares if created date/time is contained in stylist flattened array
        const comparedDateToArray = await compareDatesInArray(
          timesTakenArray,
          scheduleTime
        );
        // if date is in array, set false to available
        // else, set true
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
            applicable: false,
          };
        }
        // if store is closed that day, set close to true
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
        // finish building object
        workingTimeDateObj = {
          ...workingTimeDateObj,
          time: parseJSON(scheduleTime),
        };
        hoursArray.push(workingTimeDateObj);
        // Previous methods were for the initial date/time, following is for the 30min incremental date/time
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
              applicable: false,
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
        // Once day's hours are built, unshift into array and then decrement is started
        scheduleArray.unshift({
          day: assignedDate,
          hours: hoursArray,
        });
      }
    }
  }
  return scheduleArray;
};

export const scheduleBlockFilter = async (
  scheduleArray: ScheduleArrayType[] | null,
  steps: number
) => {
  return scheduleArray?.map((day) => {
    let aggrivateArray: any[] = [];
    let countingArray = [];
    for (let i = 0; i < day.hours.length; i++) {
      let workingTimeSlot = day.hours[i];
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
        if (i === day.hours.length - 1) {
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
