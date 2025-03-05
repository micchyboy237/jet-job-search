import { DefaultTheme } from "styled-components";

export const defaultTheme = {
  version: "1.0.0",
  width: "3rem", // Changed from '48px' to '3rem'
  height: "1.5rem", // Changed from '24px' to '1.5rem'

  borderWidth: "0.125rem", // Changed from '2px' to '0.125rem'
  borderColor: "#ddd",
  leftBorderColor: "#ddd",
  rightBorderColor: "#ddd",

  leftBackgroundColor: "#ddd",
  rightBackgroundColor: "#0cb213",
  backgroundColorDisabled: "#eee",

  radius: "16rem", // Changed from '256px' to '16rem'
  radiusBackground: "16rem", // Changed from '256px' to '16rem'
  knobRadius: "100%",

  knobWidth: "1rem", // Changed from '16px' to '1rem'
  knobHeight: "1rem", // Changed from '16px' to '1rem'
  knobGap: "0.25rem", // Changed from '4px' to '0.25rem'

  knobColor: "#aaa",
  leftKnobColor: "white",
  rightKnobColor: "#fff",
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: "#7F56D9",
    primaryLight: "#ebe4f8",
    primaryDark: "#3700b3",
    background: "#eaf1fd",
    backgroundSecondary: "#f5f5f5",
    backgroundLight: "#f9f9f9",
    border: "#ddd",
    text: "#000000",
    textLight: "#555555",
    textLighter: "#777777",
    textGray: "#999999",
    cardBackground: "#ffffff",
    cardShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)",
    cardText: "#000000",
    sidebarBackground: "#f5f5f5",
    sidebarShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)",
    tableRowHighlight: "#f5f5f5",
    tableRowBorder: "#ddd",
    tableHeadBackground: "#f5f5f5",
    formBorder: "#ddd",
    inputBackground: "#f5f5f5",
    modalBackground: "#ffffff",
  },
  fonts: {
    main: "Arial, sans-serif",
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: "#bb86fc",
    primaryLight: "#d1c4e9",
    primaryDark: "#3700b3",
    background: "#121212",
    backgroundSecondary: "#1e1e1e",
    backgroundLight: "#333333",
    border: "#333333",
    text: "#ffffff",
    textLight: "#dddddd",
    textLighter: "#ffffff",
    textGray: "#888888",
    cardBackground: "#1e1e1e",
    cardShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.9)",
    cardText: "#ffffff",
    sidebarBackground: "#333333",
    sidebarShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.9)",
    tableRowHighlight: "#333333",
    tableRowBorder: "#aaaaaa",
    tableHeadBackground: "#333333",
    formBorder: "#aaaaaa",
    inputBackground: "#333333",
    modalBackground: "#1e1e1e",
  },
  fonts: {
    main: "Arial, sans-serif",
  },
};
