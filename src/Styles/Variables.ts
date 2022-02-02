import { createGlobalStyle } from "styled-components";

// Add further types to this to spread them across for size as well?
declare module "styled-components" {
  interface DefaultTheme {
    hero?: string;
    primary?: string;
    primaryAlt?: string;
    secondary?: string;
    secondaryAlt?: string;
    background?: string;
    backgroundAlt?: string;
    subdued?: string;
    subduedAlt?: string;
    alternative?: string;
    alternativeAlt?: string;
    fontColor?: string;
    fontColorAlt?: string;
    highlightWhite?: string;
    highlightMuted?: string;
    highlightDark?: string;
    warning?: string;
  }
}

// Global variables, themes, Global styles, and media breaks

export const DarkTheme = {
  hero: "#40B590",
  primary: "#c52772",
  primaryAlt: "#cf2e7d",
  secondary: "#a51d62",
  secondaryAlt: "#b42269",
  background: "#08070C",
  backgroundAlt: "#120F1A",
  subdued: "#151221",
  subduedAlt: "#1B182A",
  alternative: "#1E265A",
  alternativeAlt: "#242D6B",
  fontColor: "#f7f7f7",
  fontColorAlt: "#f7f7f7",
  highlightWhite: "#ebeaee",
  highlightMuted: "#CECBD4",
  highlightDark: "#BBB9C1",
  warning: "#9b0832",
};

export const LightTheme = {
  hero: "#40B590",
  primary: "#c52772",
  primaryAlt: "#cf2e7d",
  secondary: "#a51d62",
  secondaryAlt: "#b42269",
  background: "#E0E1EB",
  backgroundAlt: "#E6E7EF",
  subdued: "#F2F3F7",
  subduedAlt: "#F9F9FB",
  alternative: "#1E265A",
  alternativeAlt: "#242D6B",
  fontColor: "#08070C",
  fontColorAlt: "#f7f7f7",
  highlightWhite: "#ebeaee",
  highlightMuted: "#808AAD",
  highlightDark: "#1F326E",
  warning: "#9b0832",
};

export const GlobalStyles = createGlobalStyle` 
  body {
    background-color: ${(props) => props.theme.background};
  }
`;

const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tabletS: "600px",
  tabletM: "768px",
  tabletL: "850px",
  laptop: "1024px",
  laptopL: "1440px",
};

// from tabletMedium => go to mobile design

export const devices = {
  mobileS: `only screen and (min-width: ${sizes.mobileS})`,
  mobileM: `only screen and (min-width: ${sizes.mobileM})`,
  mobileL: `only screen and (min-width: ${sizes.mobileL})`,
  tabletS: `only screen and (min-width: ${sizes.tabletS})`,
  tabletM: `only screen and (min-width: ${sizes.tabletM})`,
  tabletL: `only screen and (min-width: ${sizes.tabletL})`,
  laptop: `only screen and (min-width: ${sizes.laptop})`,
  laptopL: `only screen and (min-width: ${sizes.laptopL})`,
};
