import "styled-components";
import { ThemeProviderProps } from "styled-components";
import { DefaultTheme, ThemeProvider } from "styled-components/native";

export interface BorderRadius {
  value: number;
  px: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      regular: string;
      medium: string;
      bold: string;
      heavy: string;
    };

    colors: {
      common: typeof colors;
      text: {
        primary: string;
        secondary: string;
        error: string;
      };
      input: {
        value: string;
        placeholder: string;
        background: string;
        error: string;
      };
      icon: {
        primary: string;
        secondary: string;
      };
      button: {
        primary: {
          text: string;
          background: string;
        };
        secondary: {
          text: string;
          background: string;
        };
      };
      background: {
        primary: string;
        secondary: string;
      };
    };
  }
}

const colors = {
  white: "#FDFDFD",
  transparentWhite: "#FDFDFD80",
  lightGrey: "#F4F4F4",
  darkGrey: "#707070",
  transparentBlack: "#1D1D1D99",
  black: "#1D1D1D",
  yellow: "#FFC72D",
  blue: "#7EAEF4",
  red: "#B80B0B",
};

const lightThemeColors: DefaultTheme["colors"] = {
  common: colors,
  text: {
    primary: colors.black,
    secondary: colors.darkGrey,
    error: colors.red,
  },
  icon: {
    primary: colors.black,
    secondary: colors.darkGrey,
  },
  button: {
    primary: {
      text: colors.black,
      background: colors.yellow,
    },
    secondary: {
      text: colors.black,
      background: colors.lightGrey,
    },
  },
  input: {
    value: colors.black,
    placeholder: colors.darkGrey,
    background: colors.lightGrey,
    error: colors.red,
  },
  background: {
    primary: colors.white,
    secondary: colors.lightGrey,
  },
};

const yellowThemeColors: DefaultTheme["colors"] = {
  common: colors,
  text: {
    primary: colors.black,
    secondary: colors.transparentBlack,
    error: colors.red,
  },
  icon: {
    primary: colors.black,
    secondary: colors.transparentBlack,
  },
  button: {
    primary: {
      text: colors.black,
      background: colors.white,
    },
    secondary: {
      text: colors.black,
      background: colors.transparentWhite,
    },
  },
  input: {
    value: colors.black,
    placeholder: colors.darkGrey,
    background: colors.white,
    error: colors.red,
  },
  background: {
    primary: colors.yellow,
    secondary: colors.yellow,
  },
};

export const baseTheme = {
  fonts: {
    regular: "TextaAlt-Regular",
    medium: "TextaAlt-Medium",
    bold: "TextaAlt-Bold",
    heavy: "TextaAlt-Heavy",
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: lightThemeColors,
};
export const yellowTheme: DefaultTheme = {
  ...baseTheme,
  colors: yellowThemeColors,
};

export const LightThemeProvider = (
  props: Omit<ThemeProviderProps<DefaultTheme>, "theme">
) => <ThemeProvider {...props} theme={lightTheme} />;
export const YellowThemeProvider = (
  props: Omit<ThemeProviderProps<DefaultTheme>, "theme">
) => <ThemeProvider {...props} theme={yellowTheme} />;
