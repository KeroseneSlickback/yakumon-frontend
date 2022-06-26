import axios from "axios";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MessageType, ReturnUserType } from "../Utilities/types";
import { ListItem } from "./CheckboxComponents";
import { StyledLabel, StyledTextInput } from "./FormComponents";

const CustomerSearchDiv = styled.div`
  margin: 16px 0 8px 0;
`;

const CustomerResultsDiv = styled.div<{ height?: any }>`
  background-color: ${({ theme }) => theme.alternative};
  border-radius: 6px;
  color: ${({ theme }) => theme.fontColorAlt};
  overflow: hidden;
  transition: height ease 0.1s;
  height: ${({ height }) => height}px;
`;

interface Props {
  handleOnChange: (id: string) => void;
  selected: string;
}

export const CustomerSearchBlock = (props: Props) => {
  const contentEL = useRef<any>(null);
  const [height, setHeight] = useState(0);
  const [customers, setCustomers] = useState<ReturnUserType[] | null>(null);
  const [searchResults, setSearchResults] = useState<ReturnUserType[] | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [customerError, setCustomerError] = useState<MessageType | null>(null);

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

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchResults && searchResults.length > 0) {
        setHeight(contentEL.current.scrollHeight);
      }
    }, 100);
    return () => clearTimeout(debounce);
  }, [searchResults]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (customers) {
        setSearchResults(null);
        setHeight(0);
        if (search !== "") {
          const searchedList = customers.filter((user) => {
            return (
              user.firstName.toLowerCase().includes(search.toLowerCase()) ||
              user.lastName.toLowerCase().includes(search.toLowerCase())
            );
          });
          setSearchResults(searchedList);
        }
      }
    }, 400);
    return () => clearTimeout(debounce);
  }, [search]);

  const selectID = (
    customerFirst: string,
    customerLast: string,
    customerId: string
  ) => {
    setSearch(`${customerFirst} ${customerLast}`);
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
      <CustomerResultsDiv ref={contentEL} height={height}>
        {searchResults
          ? searchResults.map((customer) => {
              return (
                <ListItem
                  key={customer._id}
                  text1={customer.firstName}
                  text2={customer.lastName}
                  handleOnChange={() =>
                    selectID(
                      customer.firstName,
                      customer.lastName,
                      customer._id
                    )
                  }
                  selected={props.selected}
                  id={customer._id}
                />
              );
            })
          : null}
      </CustomerResultsDiv>
    </CustomerSearchDiv>
  );
};
