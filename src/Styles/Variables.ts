import { createGlobalStyle } from "styled-components";

// Add further types to this to spread them across for size as well?
declare module "styled-components" {
  interface DefaultTheme {
    green1?: string;
    green2?: string;
    green3?: string;
    green4?: string;
    green5?: string;
    green6?: string;
    purple1?: string;
    purple2?: string;
    purple3?: string;
    purple4?: string;
    purple5?: string;
    purple6?: string;
    red1?: string;
    red2?: string;
    red3?: string;
    red4?: string;
    red5?: string;
    white1?: string;
    white2?: string;
    black?: string;
  }
}

export const theme = {
  green1: "#60A988",
  green2: "#6BAF90",
  green3: "#86BDA4",
  green4: "#8BC0A8",
  green5: "#ACD0C0",
  green6: "#BFDACE",
  purple1: "#907AB8",
  purple2: "#947FBB",
  purple3: "#A08EC2",
  purple4: "#A696C6",
  purple5: "#B6A9D0",
  purple6: "#CCC3DD",
  red1: "#A0143C",
  red2: "#AD3558",
  red3: "#B24464",
  red4: "#BE5F7B",
  white1: "#F7F7F7",
  white2: "#ffffff",
  black: "#001c00",
};

export const GlobalStyles = createGlobalStyle` 
  body {
    background-color: ${(props) => props.theme.purple1};
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
