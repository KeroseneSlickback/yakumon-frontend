import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { devices } from "../Styles/Variables";

export const OverallPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPageContainer = styled.main`
  padding-bottom: 16px;
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Navbar containers
export const NavBarHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  a {
    padding: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    color: ${({ theme }) => theme.white1};
    text-decoration: none;
    font-size: 1.2rem;
    max-width: max-content;
  }

  h1 {
    padding-left: 6px;
  }
`;

// Footer containers
export const FooterContainer = styled.footer`
  border-radius: 0.5rem 0.5rem 0 0px;
  background-color: ${({ theme }) => theme.white1};
  padding: 4px 6px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
`;

export const FooterButtonDiv = styled.div`
  display: flex;
  gap: 2px;
`;

// Page containers
export const SinglePageContainer = styled.div<{ homePage?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;

  ${(props) =>
    props.homePage &&
    css`
      @media ${devices.mobileL} {
        width: 90%;
      }
    `}
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const PageSectionCard: any = styled.div<{
  styled?: boolean;
  secondary?: boolean;
  noPadding?: boolean;
  smallPaddingBottom?: boolean;
}>`
  width: 100%;
  color: ${({ theme }) => theme.white1};
  background-color: ${({ theme }) => theme.purple1};
  border-radius: 1rem 1rem 0 0;
  padding: 16px 18px;

  &:not(:first-child) {
    margin-top: -32px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
      rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
  }

  &:last-child {
    border-radius: 1rem;
  }

  ${(props) =>
    props.styled &&
    css`
      background-color: ${({ theme }) => theme.white1};
      color: ${({ theme }) => theme.black};
    `}

  ${(props) =>
    props.secondary &&
    css`
      background-color: ${({ theme }) => theme.purple3};
    `}

    ${(props) =>
    props.noPadding &&
    css`
      padding: 0;
    `}

    ${(props) =>
    props.smallPaddingBottom &&
    css`
      padding: 0 0 8px 0;
    `}
`;

export const StoreImgDiv = styled.div<{ rearPortal?: boolean }>`
  width: 100%;
  object-fit: cover;

  ${(props) =>
    props.rearPortal &&
    css`
      display: flex;
      justify-content: center;
    `};
`;

export const CheckboxSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ShowcaseGrid = styled.div`
  margin-top: 16px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(13rem, 1fr));
  justify-content: center;

  @media ${devices.tabletS} {
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(13rem, 1fr));
  }

  @media ${devices.tabletM} {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(13rem, 1fr));
  }
`;

export const SelectContainer = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white1};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
  border-radius: 1rem;
  h3 {
    padding: 8px;
    align-self: center;
    justify-self: center;
  }

  &:hover {
    background-color: ${({ theme }) => theme.white2};
  }
`;

export const SelectContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  h3 {
    text-align: center;
  }
`;

export const StoreInfoContainer = styled.div<{ rearPortal?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;
  div {
    display: flex;
    flex-direction: column;
    width: 75%;
    span {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      &:not(:first-child) {
        padding-top: 8px;
      }
      a,
      p {
        padding-left: 8px;
        font-size: 0.8rem;
        margin: auto 0;
        @media ${devices.mobileM} {
          font-size: 0.9rem;
        }
        @media ${devices.mobileL} {
          font-size: 1rem;
        }
      }
      img {
        height: 20px;
      }
      table {
        td {
          font-size: 0.8rem;
          padding: 0 6px 4px 6px;
          @media ${devices.mobileM} {
            font-size: 0.9rem;
          }
          @media ${devices.mobileL} {
            font-size: 1rem;
          }
        }
      }
    }
  }

  ${(props) =>
    props.rearPortal &&
    css`
      padding: 16px 0 16px 0;
    `}
`;

export const StoreDescContainer = styled.div`
  padding-bottom: 32px;
  p {
    word-break: break;
    white-space: normal;
    margin-top: 12px;
  }
`;

export const StoreEditContainer = styled.div<{ topCard?: boolean }>`
  background-color: ${({ theme }) => theme.white2};
  border: 1px solid ${({ theme }) => theme.purple1};
  border-radius: 0.5rem;
  padding: 0px 6px;
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1.1rem;
    margin: 8px 0;
  }
  p,
  td {
    color: black;
  }
  ${(props) =>
    props.topCard &&
    css`
      padding: 6px;
    `}
`;

export const ReservationImgHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding-bottom: 32px;
`;

export const ReservationTitleBlock = styled.div`
  display: grid;
  grid-gap: 8px;
`;

export const ServiceContainerWrapper = styled.div`
  padding-bottom: 32px;
`;

export const EmployeeStoreContainer = styled.div`
  padding-bottom: 32px;
`;
