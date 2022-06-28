import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RegularMessage, { MessageBox } from "../Modules/Messages/RegularMessage";
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
  transition: height ease 0.2s;
  height: ${({ height }) => height}px;
  overflow: scroll;
  max-height: 100px;
`;

const GuestDiv = styled.div`
  margin-top: 6px;
`;

interface Props {
  handleOnChange: (id: string) => void;
  selected: string;
  guest?: boolean;
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
              selectID("Guest", "User", "62b826eebd071eb37cf036f6")
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
