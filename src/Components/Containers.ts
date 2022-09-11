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

export const NavBarHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 8px 18px 0 18px;
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

  @media ${devices.tabletS} {
    justify-content: space-around;
  }
`;

export const FooterContainer = styled.footer`
  border-radius: 0.5rem 0.5rem 0 0px;
  background-color: ${({ theme }) => theme.white1};
  padding: 4px 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;

  @media ${devices.tabletS} {
    justify-content: space-evenly;
  }
`;

export const FooterButtonDiv = styled.div`
  display: flex;
  gap: 2px;
`;

export const SinglePageContainer = styled.div<{ limit?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  width: 100%;

  ${(props) =>
    props.limit &&
    css`
      max-width: 400px;
    `}

  @media ${devices.mobileL} {
    width: 90%;
  }
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const PageSplitContainer = styled.div<{ expandable?: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 400px;

  @media ${devices.tabletM} {
    max-width: 800px;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    justify-content: center;
  }

  ${(props) =>
    props.expandable &&
    css`
      @media ${devices.laptop} {
        display: flex;
        max-width: 90%;
      }
    `}
`;

export const PageDivider: any = styled.div<{
  left?: boolean;
  right?: boolean;
  topPadding?: boolean;
  mediumLimit?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${(props) =>
    props.right &&
    css`
      &:not(:first-child) {
        margin-top: -32px;
        @media ${devices.tabletM} {
          margin-top: 0;
        }
      }
    `}

  ${(props) =>
    props.left &&
    css`
      @media ${devices.tabletM} {
        min-width: 350px;
        max-width: 400px;
      }
    `}

  ${(props) =>
    props.topPadding &&
    css`
      @media ${devices.tabletM} {
        padding-top: 16px;
      }
    `}

    ${(props) =>
    props.mediumLimit &&
    css`
      max-width: 500px;
    `}
`;

export const PageSectionCard: any = styled.div<{
  head?: boolean;
  centered?: boolean;
  plainCenter?: boolean;
  styled?: boolean;
  secondary?: boolean;
  noPadding?: boolean;
  smallPaddingBottom?: boolean;
  smallPaddingTopAndBottom?: boolean;
  left?: boolean;
  right?: boolean;
  mobileOverlap?: boolean;
  tabletGrid?: boolean;
  aboveHead?: boolean;
  disconnectedSubmit?: boolean;
  span2?: boolean;
  contentFit?: boolean;
  mediumLimit?: boolean;
  largeLimit?: boolean;
}>`
  color: ${({ theme }) => theme.white1};
  background-color: ${({ theme }) => theme.purple1};
  border-radius: 1rem 1rem 0 0;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:first-child {
    margin-top: 0;
  }

  margin-top: -32px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 8px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;

  &:last-child {
    border-radius: 1rem;
  }

  &:not(:last-child) {
    padding-bottom: 48px;
  }

  ${(props) =>
    props.head &&
    css`
      margin-top: 0;
      box-shadow: none;
    `}

  ${(props) =>
    props.centered &&
    css`
      display: flex;
      padding-top: 48px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}

    ${(props) =>
    props.plainCenter &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}

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
      padding: 0px;
      &:not(:last-child) {
        padding-bottom: 0px;
      }
    `}
    ${(props) =>
    props.smallPaddingBottom &&
    css`
      padding: 0 0 8px 0;
    `}
    ${(props) =>
    props.smallPaddingTopAndBottom &&
    css`
      padding: 16px 0 8px 0;
    `}
    ${(props) =>
    props.mobileOverlap &&
    css`
      padding-bottom: 48px;

      @media ${devices.tabletM} {
        padding-bottom: 16px;
      }
    `}
    ${(props) =>
    props.aboveHead &&
    css`
      &:not(:last-child) {
        padding-bottom: 16px;
      }
    `}
    ${(props) =>
    props.disconnectedSubmit &&
    css`
      margin-top: 16px;
      max-width: 400px;
    `}
    ${(props) =>
    props.span2 &&
    css`
      @media ${devices.tabletM} {
        grid-column: span 2;
      }
    `}

    ${(props) =>
    props.largeLimit &&
    css`
      max-width: 740px;
    `}

    ${(props) =>
    props.contentFit &&
    css`
      width: fit-content;
    `}

    ${(props) =>
    props.mediumLimit &&
    css`
      max-width: 500px;
    `}

    @media ${devices.tabletM} {
    ${(props) =>
      props.tabletGrid &&
      css`
        border-radius: 1rem;
        &:not(:first-child) {
          margin-top: 0px;
        }
        &:not(:last-child) {
          padding-bottom: 16px;
        }
      `}
  }
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

export const ShowCaseContainer = styled.div<{ employee?: boolean }>`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  justify-items: center;

  ${(props) =>
    props.employee &&
    css`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    `}
`;

export const OwnerShowcaseGrid = styled.div`
  margin-top: -32px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
  justify-content: center;
  align-items: center;

  @media ${devices.tabletM} {
    grid-gap: 8px;
  }
`;

export const SelectContainer = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white1};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin: 8px;

  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.3) 0px 0px 4px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 1px inset;
  border-radius: 1rem;
  h3 {
    padding: 8px;
    font-size: 1.1rem;
    align-self: center;
    justify-self: center;
  }

  &:hover {
    background-color: ${({ theme }) => theme.white2};
  }

  @media ${devices.tabletS} {
    width: 300px;
  }

  @media ${devices.tabletL} {
    width: 320px;
  }
`;

export const StoreSelectContainer = styled(SelectContainer)`
  margin: 4px;
  width: 220px;

  @media ${devices.tabletS} {
    width: 220px;
  }

  @media ${devices.tabletL} {
    width: 220px;
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
  div {
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
        @media ${devices.mobileM} {
          font-size: 0.9rem;
        }
      }
      img {
        height: 20px;
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

  @media ${devices.tabletM} {
    grid-template-columns: 1fr;
    grid-gap: 24px;
    justify-items: center;
    margin-bottom: 16px;
  }
`;

export const ReservationTitleBlock = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 16px;
  p {
    text-align: center;
  }
`;

export const ExtraPaddingWrapper = styled.div<{ smallPadding?: boolean }>`
  padding-bottom: 32px;
  ${(props) =>
    props.smallPadding &&
    css`
      padding-bottom: 8px;
    `}
`;

export const ContraintContainer = styled.div`
  width: 50%;
  p {
    margin-top: 16px;
  }
`;
