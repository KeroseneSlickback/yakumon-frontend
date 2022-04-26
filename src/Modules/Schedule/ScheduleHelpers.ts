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
  StoreDayHour,
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
  storeHours: StoreDayHour[],
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
