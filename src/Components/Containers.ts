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
    font-size: 1.3rem;
    padding-left: 6px;
  }
  div,
  svg {
    height: 40px;
    width: 40px;
  }
`;

// Footer containers
export const FooterContainer = styled.footer`
  border-radius: 8px 8px 0 0px;
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

export const PageSection = styled.div<{
  styled?: boolean;
  noPadding?: boolean;
  center?: boolean;
  overlap?: boolean;
}>`
  padding: 18px;
  width: 100%;
  color: ${({ theme }) => theme.fontColor};
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
  ${(props) =>
    props.styled &&
    css`
      background-color: ${({ theme }) => theme.alternative};
      box-shadow: 0px 0px 2px 0px rgba(255, 255, 255, 0.5);
      border-radius: 12px;
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
    props.overlap &&
    css`
      margin-top: -24px;
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
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  text-align: center;
  transition: 0.3;

  h3 {
    margin: auto;
    padding: 4px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.backgroundAlt};
  }
`;

export const StorePageSection = styled(PageSection)`
  display: flex;
  flex-direction: column;
`;

export const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: ${({ theme }) => theme.fontColorAlt};
    padding: 4px;
    border-radius: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      flex-direction: column;
    }
    a,
    p {
      padding-left: 6px;
      font-size: 0.8rem;
    }
    img {
      height: 25px;
    }
  }
`;

export const StoreDescContainer = styled.div``;
