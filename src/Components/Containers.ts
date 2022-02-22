import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const OverallPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPageContainer = styled.main`
  width: 100%;
  padding-bottom: 18px;
`;

// Navbar containers
export const NavBarHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 6px 6px 6px 6px;
  color: ${({ theme }) => theme.fontColor};

  h1 {
    /* font-size: 1.3rem; */
    padding-left: 6px;
  }
  div,
  svg {
    height: 32px;
    width: 32px;
  }
`;

// Footer containers
export const FooterContainer = styled.footer`
  border-radius: 0.7rem 0.7rem 0 0px;
  background-color: ${({ theme }) => theme.alternative};
  padding: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  p {
    font-size: 10px;
  }
`;

// Page containers
export const SinglePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageSectionCard = styled.div<{
  homeH1?: boolean;
  styled?: boolean;
  noPadding?: boolean;
  center?: boolean;
  secondary?: boolean;
  row?: boolean;
}>`
  padding: 18px 18px 36px 18px;
  width: 100%;
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.background};
  border-radius: 1rem 1rem 0 0;
  h1 {
    font-size: 1.65rem;
    padding: 0px 0px 18px 0px;
    margin: 0 12px;
  }
  h2 {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 1rem;
  }

  &:not(:first-child) {
    margin-top: -24px;
    box-shadow: 4px 4px 12px 2px rgba(0, 0, 0, 0.3);
  }

  &:last-child {
    border-radius: 1rem;
    padding: 18px;
  }

  ${(props) =>
    props.homeH1 &&
    css`
      h1 {
        padding-bottom: 24px;
      }
    `}

  ${(props) =>
    props.styled &&
    css`
      background-color: ${({ theme }) => theme.alternative};
      color: ${({ theme }) => theme.fontColorAlt};
    `}

  ${(props) =>
    props.noPadding &&
    css`
      padding: 18px 0;
    `}
    
    ${(props) =>
    props.center &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

  ${(props) =>
    props.secondary &&
    css`
      background-color: ${({ theme }) => theme.primary};
    `}

    ${(props) =>
    props.row &&
    css`
      display: flex;
      flex-direction: row;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 12px;
        h1 {
          margin: 0;
          line-height: 1.2;
          text-align: center;
        }
      }
    `}
`;

export const ShowcaseGrid = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
`;

export const SelectContainer = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColorAlt};
  background-color: ${({ theme }) => theme.alternative};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  text-align: center;

  h3 {
    margin: auto;
    padding: 4px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.backgroundAlt};
  }
`;

export const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    }
    img {
      height: 20px;
    }
    table {
      td {
        font-size: 0.8rem;
        padding: 0 6px 4px 6px;
      }
    }
  }
`;

export const StoreDescContainer = styled.div``;
