import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const OverallPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPageContainer = styled.main`
  padding-bottom: 18px;
  flex-grow: 1;
  align-self: stretch;
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
    color: ${({ theme }) => theme.fontColor};
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
  background-color: ${({ theme }) => theme.alternative};
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
export const SinglePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const PageSectionCard = styled.div<{
  homeH1?: boolean;
  styled?: boolean;
  topCard?: boolean;
  noPadding?: boolean;
  center?: boolean;
  secondary?: boolean;
  row?: boolean;
  stylist?: boolean;
  absolute?: boolean;
  smallp?: boolean;
  bottomPadding?: boolean;
  formFormatting?: boolean;
  ownerSection?: boolean;
}>`
  position: relative;
  padding: 18px 18px 36px 18px;
  width: 100%;
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.background};
  border-radius: 1rem 1rem 0 0;
  h2 {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 1.1rem;
  }

  &:not(:first-child) {
    margin-top: -24px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
      rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
  }

  &:last-child {
    border-radius: 1rem;
    padding: 18px;
  }

  ${(props) =>
    props.homeH1 &&
    css`
      h1 {
        padding-bottom: 48px;
        text-align: center;
        margin: 10px;
      }
    `}

  ${(props) =>
    props.styled &&
    css`
      background-color: ${({ theme }) => theme.alternative};
      color: ${({ theme }) => theme.fontColorAlt};
    `}

  ${(props) =>
    props.topCard &&
    css`
      padding: 18px 0px 0px 0px;
      position: relative;
      z-index: -1;
      h3 {
        margin: 0 0 18px 18px;
      }
    `}

    ${(props) =>
    props.noPadding &&
    css`
      padding: 18px 0px 2px 0px;
      h3 {
        margin: 0 18px 10px 18px;
        text-align: center;
      }
    `}
    
    ${(props) =>
    props.bottomPadding &&
    css`
      padding: 18px 0px 36px 0px;
      h3 {
        margin: 0 18px 10px 18px;
        text-align: center;
      }
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
      }
    `}

    ${(props) =>
    props.stylist &&
    css`
      padding: 0 18px 36px 18px;
      display: flex;
      flex-direction: row;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }
    `}

    ${(props) =>
    props.absolute &&
    css`
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      h1 {
        padding-bottom: 18px;
        line-height: 1.75rem;
      }
      div {
        p {
          padding: 10px;
        }
      }
    `}
    ${(props) =>
    props.smallp &&
    css`
      p {
        margin-top: 10px;
        font-size: 0.8rem;
      }
    `}
    ${(props) =>
    props.formFormatting &&
    css`
      div {
        margin-bottom: 4px;
        div {
          margin-top: 12px;
          div {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            margin: 0 10px;
            span {
            }
          }
        }
        p {
          margin: 2px 0;
          font-size: 0.7rem;
        }
        h4 {
          font-size: 0.8rem;
          margin: 6px 0 2px 0;
        }
      }
    `}

    ${(props) =>
    props.ownerSection &&
    css`
      /* display: flex;
      flex-direction: column; */
    `}
`;

export const StoreImgDiv = styled.div<{ ownerSection?: boolean }>`
  height: 100%;
  width: 400px;
  max-width: 100vw;
  z-index: 0;
  object-fit: cover;
  div {
    background-color: ${({ theme }) => theme.alternative};
    border-radius: 1rem 1rem 0 0;
  }

  ${(props) =>
    props.ownerSection &&
    css`
      width: 100%;
      max-width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      gap: 4px;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
        border-radius: 1rem;
      }
    `};
`;

export const CheckboxSpan = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ShowcaseGrid = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(13rem, 1fr));
  justify-content: center;
`;

export const SelectContainer = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColorAlt};
  background-color: ${({ theme }) => theme.alternative};
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
    background-color: ${({ theme }) => theme.backgroundAlt};
  }
`;

export const SelectContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const StoreInfoContainer = styled.div<{ ownerSection?: boolean }>`
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

  ${(props) =>
    props.ownerSection &&
    css`
      margin: 20px 0 10px 0;
    `}
`;

export const StoreDescContainer = styled.div`
  p {
    word-break: break-all;
    white-space: normal;
  }
`;

export const StoreEditContainer = styled.div<{ topCard?: boolean }>`
  background-color: ${({ theme }) => theme.alternativeAlt};
  border: 1px solid ${({ theme }) => theme.background};
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
