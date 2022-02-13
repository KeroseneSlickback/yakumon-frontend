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
  background-color: ${({ theme }) => theme.primary};
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
export const SinglePageContainer = styled.div``;

export const PageSection = styled.div<{
  styled?: boolean;
}>`
  padding: 18px;
  h1 {
    font-size: 1.65rem;
    padding: 0px 0px 18px 0px;
  }
  h2 {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 1.2rem;
  }
  ${(props) =>
    props.styled &&
    css`
      background-color: ${({ theme }) => theme.primaryAlt};
      box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      h2 {
        color: ${({ theme }) => theme.fontColorAlt};
      }
    `}
`;

export const ShowcaseGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
`;

export const SelectContainer = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  text-align: center;
  padding: 8px 2px;
  transition: 0.3;

  h4 {
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

export const StoreImgInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 50vw;
    width: 50vw;
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const StoreInfoContainer = styled.div`
  padding-left: 18px;
  a,
  p {
    padding-top: 2px;
    font-size: 0.7rem;
  }
  span {
    display: flex;
    flex-direction: column;
  }
`;

export const StoreDescContainer = styled.div``;
