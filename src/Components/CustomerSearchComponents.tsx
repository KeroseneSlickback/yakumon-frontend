import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";
import { MessageType, UserType } from "../Utilities/types";
import { ListItem } from "./CheckboxComponents";
import { StyledLabel, StyledTextInput } from "./FormComponents";

const CustomerSearchDiv = styled.div``;

const CustomerResultsDiv = styled.div<{
  height?: number;
}>`
  background-color: ${({ theme }) => theme.white1};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.black};
  overflow: hidden;
  transition: height ease 0.2s;
  height: ${({ height }) => height}px;
  overflow: auto;
  max-height: 160px;
`;

const GuestDiv = styled.div`
  margin-top: 4px;
`;

interface Props {
  handleOnChange: (id: string) => void;
  selected: string;
  guest?: boolean;
}

export const CustomerSearchBlock = (props: Props) => {
  const contentEL = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [customers, setCustomers] = useState<UserType[] | null>(null);
  const [searchResults, setSearchResults] = useState<UserType[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [customerError, setCustomerError] = useState<MessageType | null>(null);

  useEffect(() => {
    setCustomerError(null);
    const debounce = setTimeout(() => {
      const getData = () => {
        axios
          .get<UserType[]>("https://yakumon-backend.onrender.com/user/all")
          .then((res) => {
            setCustomers(res.data);
          })
          .catch(() => {
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
      if (searchResults && searchResults.length > 0 && contentEL.current) {
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
              user.firstName
                .toLowerCase()
                .includes(search.replace(/\s+/g, "").toLowerCase()) ||
              user.lastName
                .toLowerCase()
                .includes(search.replace(/\s+/g, "").toLowerCase())
            );
          });
          setSearchResults(searchedList);
        }
      }
    }, 400);
    return () => clearTimeout(debounce);
  }, [search, customers]);

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
        required
      />
      {customerError ? (
        <MessageBox>
          <RegularMessage
            message={customerError.message}
            warning={customerError.warning}
          />
        </MessageBox>
      ) : (
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
      )}
      {props.guest ? (
        <GuestDiv>
          <ListItem
            text1="Guest"
            text2="User?"
            handleOnChange={() =>
              selectID("Guest", "User", "62d7b3b0b2163f98a5cbb426")
            }
            selected={props.selected}
            id="62b826eebd071eb37cf036f6"
            guest
          />
        </GuestDiv>
      ) : null}
    </CustomerSearchDiv>
  );
};
