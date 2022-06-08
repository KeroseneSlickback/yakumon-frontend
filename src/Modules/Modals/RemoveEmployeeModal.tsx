import React from "react";

type Props = {
  employeeId: string;
  storeId: string;
  closeModal(): void;
};

const RemoveEmployeeModal = (props: Props) => {
  console.log(props);
  return <div>RemoveEmployeeModal</div>;
};

export default RemoveEmployeeModal;
