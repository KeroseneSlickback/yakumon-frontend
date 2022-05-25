import { createGlobalStyle } from "styled-components";

// Add further types to this to spread them across for size as well?
declare module "styled-components" {
  interface DefaultTheme {
    hero?: string;
    primary?: string;
    primaryAlt?: string;
    secondary?: string;
    secondaryAlt?: string;
    secondaryHighlight?: string;
    background?: string;
    backgroundAlt?: string;
    subdued?: string;
    subduedAlt?: string;
    alternative?: string;
    alternativeAlt?: string;
    fontColor?: string;
    fontColorAlt?: string;
    highlight?: string;
    highlightAlt?: string;
    warning?: string;
    warningAlt?: string;
  }
}

// Global variables, themes, Global styles, and media breaks

export const theme = {
  hero: "#40B590",
  primary: "#A08EC2",
  primaryAlt: "#B7A9D1",
  secondary: "#60A988",
  secondaryAlt: "#88BFA6",
  secondaryHighlight: "#A8F0D0",
  background: "#907AB8",
  backgroundAlt: "#947FBB",
  alternative: "#F7F7F7",
  alternativeAlt: "#ffffff",
  fontColor: "#f7f7f7",
  fontColorAlt: "#001c00",
  highlight: "#FFFACD",
  highlightAlt: "#FBF9E2",
  warning: "#9b0832",
  warningAlt: "#A50935",
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
