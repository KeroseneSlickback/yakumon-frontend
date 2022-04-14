import { addDays, getDay, parseISO, set, startOfDay } from "date-fns";
import { ScheduleArrayType, StoreDayHourFix } from "../../Utilities/types";

// export const exampleOutput: ScheduleArrayType[] = [
//   {
//     day: "2022-04-20T00:00:02.779Z",
//     hours: [
//       {
//         time: "2022-04-20T09:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T09:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T10:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T10:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T11:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T11:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T12:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T12:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T13:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T13:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T14:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T14:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T15:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T15:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T16:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T16:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T17:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T17:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T18:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T18:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//     ],
//   },
//   {
//     day: "2022-04-20T00:00:02.779Z",
//     hours: [
//       {
//         time: "2022-04-20T09:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T09:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T10:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T10:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T11:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T11:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T12:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T12:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T13:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T13:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T14:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T14:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T15:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T15:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T16:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T16:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T17:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T17:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T18:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-20T18:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//     ],
//   },
//   {
//     day: "2022-04-21T00:00:02.779Z",
//     hours: [
//       {
//         time: "2022-04-21T09:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T09:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T10:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T10:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T11:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T11:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T12:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T12:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T13:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T13:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T14:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T14:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T15:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T15:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T16:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T16:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T17:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T17:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T18:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-21T18:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//     ],
//   },
//   {
//     day: "2022-04-22T00:00:02.779Z",
//     hours: [
//       {
//         time: "2022-04-22T09:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T09:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T10:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T10:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T11:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T11:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T12:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T12:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T13:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T13:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T14:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T14:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T15:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T15:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T16:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T16:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T17:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T17:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T18:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-22T18:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//     ],
//   },
//   {
//     day: "2022-04-23T00:00:02.779Z",
//     hours: [
//       {
//         time: "2022-04-23T09:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T09:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T10:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T10:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T11:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T11:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T12:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T12:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T13:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T13:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T14:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T14:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T15:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T15:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T16:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T16:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T17:00:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T17:30:02.779Z",
//         available: false,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T18:00:02.779Z",
//         available: true,
//         applicable: false,
//       },
//       {
//         time: "2022-04-23T18:30:02.779Z",
//         available: true,
//         applicable: false,
//       },
//     ],
//   },
// ];

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
      let hours = [];
      // Check if there's a match

      // this checks for if the storehour day matches with the assignedDate day of the week
      // if it does, do something; if not, skip
      if (j === dayOfWeek) {
        console.log(storeHours[j], assignedDate);
        // let startTime = parseFloat(storeHours[j].open.replace(/:/g, "."));
        // let closeTime = parseFloat(storeHours[j].close.replace(/:/g, "."));
        // let increment = startTime += 0.3
        // console.log(startTime, closeTime);

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

        while (
          scheduleTime < endScheduleTime ||
          scheduleTime > endScheduleTime
        ) {
          let workingScheduleObject = {};

          if (storeHours[j].closed) {
            console.log("closed");
            return;
          } else {
            console.log("not closed");
          }
        }

        if (storeHours[j].closed) {
          // If store closed, apply a true to 'storeClosure' in object
        } else {
          // mark it as false
        }
      }
    }

    // scheduleArray.unshift({
    //   day: assignedDate,
    //   hours: [
    //     {
    //       time: "2022-04-23T18:30:02.779Z",
    //       available: true,
    //       applicable: false,
    //     },
    //   ],
    // });
  }

  return scheduleArray;
};

/*

Within the loop:

intitial for loop runs for each outputDay needed,
  if given 4, runs for four
  calls date-fns for the startDate's next day at the start
  adds that as


  what if given 19:30 or 9:19?  
*/
