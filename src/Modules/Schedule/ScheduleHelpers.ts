import { addDays, getDay, isEqual, parseJSON, set, startOfDay } from "date-fns";
import {
  ScheduleArrayType,
  StoreDayHour,
  StylistAppointmentType,
  TimeSlotType,
} from "../../Utilities/types";

interface TakenArrayType {
  time: Date;
  appointmentId: string;
  timeOff?: boolean;
  blockOrder?: number;
}

// helper function, flattens stylist's appointment timeSlots to a single array of day/times
const flattenArrayDates = async (stylistArray: StylistAppointmentType[]) => {
  return stylistArray.flatMap((appointment) => {
    return appointment.timeSlots.flatMap((timeslot) => {
      return {
        time: parseJSON(timeslot.slotDateTime),
        appointmentId: timeslot.appointment,
        timeOff: timeslot.timeOff ? timeslot.timeOff : false,
        blockOrder: timeslot.blockOrder,
      };
    });
  });
};

const flattenEditAppointment = async (timeSlots: TimeSlotType[]) => {
  return timeSlots.flatMap((timeslot) => {
    return {
      time: parseJSON(timeslot.slotDateTime),
      appointmentId: timeslot.appointment,
      timeOff: timeslot.timeOff ? timeslot.timeOff : false,
    };
  });
};

// helper function that compares an array of dates to given date
// work around due to date-fns having issues with async/await functionality
const compareDatesInArray = async (
  array: TakenArrayType[],
  givenDate: Date
) => {
  let findMatching = (obj: any) => {
    return isEqual(obj.time, givenDate);
  };
  const foundId = array.findIndex(findMatching);
  return array[foundId];
};

const compareAndFillArray = async (
  blankArray: ScheduleArrayType[],
  takenArray: TakenArrayType[],
  flattenedEditAppointment?: TakenArrayType[]
) => {
  let returnArray = [];

  for (let i = 0; i < blankArray.length; i++) {
    let slots = blankArray[i].slots;
    let hour = blankArray[i].hour;
    let slotsArray: any[] = [];
    for (let j = 0; j < slots.length; j++) {
      let slot = slots[j];
      let filledTimeSlot = await compareDatesInArray(takenArray, slot.time);
      let editTimeSlot;
      if (flattenedEditAppointment) {
        editTimeSlot = await compareDatesInArray(
          flattenedEditAppointment,
          slot.time
        );
      }
      if (filledTimeSlot !== undefined) {
        if (editTimeSlot) {
          slot = {
            ...slot,
            available: true,
            applicable: false,
            appointmentId: editTimeSlot.appointmentId,
            timeOff: filledTimeSlot.timeOff,
            blockOrder: filledTimeSlot.blockOrder,
          };
        } else {
          slot = {
            ...slot,
            available: false,
            applicable: false,
            appointmentId: filledTimeSlot.appointmentId,
            timeOff: filledTimeSlot.timeOff,
            blockOrder: filledTimeSlot.blockOrder,
          };
        }
      } else {
        slot = {
          ...slot,
          available: true,
          applicable: false,
        };
      }
      slotsArray.push(slot);
    }
    returnArray.push({
      hour,
      slots: slotsArray,
    });
  }
  return returnArray;
};

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

export const scheduleArrayBuild = async (
  startDate: Date,
  storeHours: StoreDayHour[],
  outputDays: number,
  stylistAppointments: StylistAppointmentType[],
  editAppointmentTimeslots?: TimeSlotType[]
) => {
  let timesTakenArray = await flattenArrayDates(stylistAppointments);
  let builtArray = await outputByHour(storeHours, startDate, outputDays);
  let checkedArray;
  if (editAppointmentTimeslots) {
    let flattenedEditAppointment = await flattenEditAppointment(
      editAppointmentTimeslots
    );
    checkedArray = await compareAndFillArray(
      builtArray,
      timesTakenArray,
      flattenedEditAppointment
    );
  } else {
    checkedArray = await compareAndFillArray(builtArray, timesTakenArray);
  }

  return checkedArray;
};

export const scheduleSectionFilter = async (
  scheduleArray: ScheduleArrayType[],
  steps: number
) => {
  let reorderedArray: any[] = [];
  let workingHourArray: string[] = [];
  for (let i = 0; i < scheduleArray.length; i++) {
    let workingTimeSection = scheduleArray[i].slots;
    workingHourArray.push(scheduleArray[i].hour);
    for (let j = 0; j < workingTimeSection.length; j++) {
      let workingSlot = workingTimeSection[j];
      if (!reorderedArray[j]) {
        reorderedArray.push([workingSlot]);
      } else {
        reorderedArray[j].push(workingSlot);
      }
    }
  }
  let setArray: any[] = [];
  for (let i = 0; i < reorderedArray.length; i++) {
    let aggrivateArray: any[] = [];
    let workingDay = reorderedArray[i];
    let countingArray: any[] = [];
    for (let j = 0; j <= workingDay.length; j++) {
      let workingTime = workingDay[j];
      if (!workingTime) {
        if (countingArray.length >= steps) {
          let tailCalc = countingArray.length - steps;
          let randomId = Math.floor(Math.random() * 100000);
          let newCountingArray = countingArray.map((obj, index) => {
            if (index <= tailCalc) {
              return (obj = {
                ...obj,
                applicable: false,
                id: randomId,
                possibleHead: true,
                chosen: false,
              });
            } else {
              return (obj = {
                ...obj,
                applicable: false,
                id: randomId,
                possibleHead: false,
                chosen: false,
              });
            }
          });
          randomId = Math.floor(Math.random() * 100000);
          aggrivateArray.push(...newCountingArray);
          countingArray = [];
        } else {
          aggrivateArray.push(...countingArray);
          countingArray = [];
        }
      } else {
        if (workingTime.available && !workingTime.closed) {
          countingArray.push(workingTime);
        } else {
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
                  chosen: false,
                });
              } else {
                return (obj = {
                  ...obj,
                  applicable: true,
                  id: randomId,
                  possibleHead: false,
                  chosen: false,
                });
              }
            });
            aggrivateArray.push(...newCountingArray);
            countingArray = [];
            aggrivateArray.push(workingTime);
            randomId = Math.floor(Math.random() * 100000);
          } else {
            countingArray.push(workingTime);
            aggrivateArray.push(...countingArray);
            countingArray = [];
          }
        }
      }
    }
    setArray.push(aggrivateArray);
  }
  let finalArray = [];
  for (let i = 0; i < setArray.length; i++) {
    let workingTimeSection = setArray[i];
    for (let j = 0; j < workingTimeSection.length; j++) {
      let workingSlot = workingTimeSection[j];
      if (!finalArray[j]) {
        finalArray.push({
          hour: workingHourArray[j],
          slots: [workingSlot],
        });
      } else {
        finalArray[j].slots.push(workingSlot);
      }
    }
  }
  return finalArray;
};
