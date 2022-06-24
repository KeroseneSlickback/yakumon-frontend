import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { MessageType, ReturnUserType } from "../Utilities/types";
import { ListItem } from "./CheckboxComponents";
import { StyledLabel, StyledTextInput } from "./FormComponents";

export const CustomerSearchDiv = styled.div`
  margin: 16px 0 8px 0;
`;

interface Props {
  handleOnChange: (id: string) => void;
  selected: string;
}

export const CustomerSearchBlock = (props: Props) => {
  const [customers, setCustomers] = useState<ReturnUserType[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [customerError, setCustomerError] = useState<MessageType | null>(null);
  console.log(props);

  useEffect(() => {
    setLoad(true);
    setCustomerError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<ReturnUserType[]>("http://localhost:8888/user/all")
          .then((res) => {
            setCustomers(res.data);
            setLoad(false);
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
            setCustomerError({
              message: "Could not find Users",
              warning: true,
            });
          });
      };
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, []);

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     setCustomers((prev) => ({
  //       ...prev,
  //       return prev.filter()
  //     }))
  //   }, 100)
  //   return () => clearTimeout(debounce)
  // }, [search]);

  const selectID = (customerId: string) => {
    props.handleOnChange(customerId);
  };

  return (
    <CustomerSearchDiv>
      <StyledLabel>Search Users</StyledLabel>
      <StyledTextInput
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {customers
          ? customers.map((customer) => {
              return (
                <ListItem
                  key={customer._id}
                  text1={customer.firstName}
                  text2={customer.lastName}
                  handleOnChange={() => selectID(customer._id)}
                  selected={props.selected}
                  id={customer._id}
                />
              );
            })
          : null}
      </div>
    </CustomerSearchDiv>
  );
};
