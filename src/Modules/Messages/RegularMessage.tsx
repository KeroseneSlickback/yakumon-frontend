import React, { useEffect, useState } from "react";
import { MessageContainer } from "../../Components/MessageComponents";

interface Props {
  message: string;
  warning: boolean;
}

const RegularMessage = ({ message, warning }: Props) => {
  if (warning) {
    return <MessageContainer warning>{message}</MessageContainer>;
  } else {
    return <MessageContainer>{message}</MessageContainer>;
  }
};

export default RegularMessage;
