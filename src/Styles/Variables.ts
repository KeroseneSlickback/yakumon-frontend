import { createGlobalStyle } from "styled-components";

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
    grey?: string;
    mobileS?: string;
    mobileM?: string;
    mobileL?: string;
    tabletS?: string;
    tabletM?: string;
    tabletL?: string;
    laptop?: string;
    laptopL?: string;
  }
}

export const theme = {
  green1: "#569F7E",
  green2: "#60A988",
  green3: "#6DB092",
  green4: "#7AB89C",
  green5: "#88BFA6",
  green6: "#95C6B0",
  purple1: "#826AAF",
  purple2: "#8A74B4",
  purple3: "#9581BB",
  purple4: "#A08EC2",
  purple5: "#AC9CC9",
  purple6: "#B7A9D1",
  red1: "#A0143C",
  red2: "#AD3558",
  red3: "#B24464",
  red4: "#BE5F7B",
  white1: "#F7F7F7",
  white2: "#ffffff",
  black: "#001c00",
  grey: "#696969",
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

export const gradients = [
  "blank",
  "#62E1A7",
  "#9FF3CD",
  "#B8F6DA",
  "#BFF7DE",
  "#C6F8E1",
  "#D0F9E6",
  "#D9FAEB",
  "#E3FCF0",
  "#EAFDF4",
  "#F5FEFA",
];
