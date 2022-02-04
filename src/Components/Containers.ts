import styled, { css } from "styled-components";

export const OverallPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainPageContainer = styled.main`
  width: 100%;
`;

// Navbar containers
export const NavBarHeader = styled.header`
  width: 100%;
  height: 62px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 6px;

  h1 {
    font-size: 1.7rem;
    padding-left: 6px;
  }
  div,
  svg {
    height: 50px;
    width: 50px;
  }
`;

// Footer containers
export const FooterContainer = styled.footer`
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

export const PageSection = styled.div<{ styled?: boolean }>`
  padding: 18px;
  h2 {
    font-size: 1.4rem;
    padding: 18px 0px;
  }
  h3 {
    font-size: 1.1rem;
  }
  ${(props) =>
    props.styled &&
    css`
      background-color: ${({ theme }) => theme.subdued};
      border: solid 2px black;
      border-radius: 12px;
    `}
`;

export const SelectContainers = styled.div`
  background-color: inherit;
`;
