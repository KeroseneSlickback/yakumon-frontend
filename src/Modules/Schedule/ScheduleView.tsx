import React from "react";
import { SchedulePropTypes } from "../../Utilities/types";

const ScheduleView = ({
  appointments,
  services,
  selectedService,
  store,
}: SchedulePropTypes) => {
  console.log(appointments, services, selectedService, store);
  return (
    <table>
      <thead>
        <tr>
          <th>Prev Week</th>
          <th colSpan={3}>April 9 - 12</th>
          <th>Next Week</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th></th>
          <th>4/9</th>
          <th>4/10</th>
          <th>4/11</th>
          <th>4/12</th>
        </tr>
        <tr>
          <td>9 am</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
        </tr>
        <tr>
          <td>10 am</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>11 am</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>12 pm</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
        </tr>
        <tr>
          <td>1 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>2 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>3 pm</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
        </tr>
        <tr>
          <td>4 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>5 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>6 pm</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
          <td>Aval</td>
        </tr>
        <tr>
          <td>7 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>8 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
        <tr>
          <td>9 pm</td>
          <td>Aval</td>
          <td>UnAval</td>
          <td>UnAval</td>
          <td>UnAval</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScheduleView;
