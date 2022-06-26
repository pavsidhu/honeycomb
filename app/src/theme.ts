import "styled-components";
import { DefaultTheme } from "styled-components/native";

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
      common: {
        white: string;
        black: string;
        yellow: {
          light: string;
          dark: string;
        };
        green: {
          light: string;
          dark: string;
        };
        blue: {
          light: string;
          dark: string;
        };
        pink: {
          light: string;
          dark: string;
        };
      };
      text: {
        primary: string;
        secondary: string;
        error: string;
      };
      input: {
        value: string;
        placeholder: string;
        background: string;
      };
      background: {
        default: string;
        secondary: string;
      };
    };

    borderRadius: {
      medium: BorderRadius;
    };
  }
}

const baseColors = {
  white: "#FFFFFF",
  lightGrey: "#F8F8F8",
  mediumGrey: "#77756F",
  darkGrey: "#272727",
  lightYellow: "#FFD027",
  darkYellow: "#FF9D42",
  lightGreen: "#6EF857",
  darkGreen: "#2AC54C",
  lightBlue: "#86B5F9",
  darkBlue: "#679BE4",
  lightPink: "#FFDAD2",
  darkPink: "#FFB1D6",
  darkRed: "#C22020",
};

const lightThemeColors = {
  common: {
    white: baseColors.white,
    black: baseColors.darkGrey,
    yellow: {
      light: baseColors.lightYellow,
      dark: baseColors.darkYellow,
    },
    green: {
      light: baseColors.lightGreen,
      dark: baseColors.darkGreen,
    },
    blue: {
      light: baseColors.lightBlue,
      dark: baseColors.darkBlue,
    },
    pink: {
      light: baseColors.lightPink,
      dark: baseColors.darkPink,
    },
  },
  text: {
    primary: baseColors.darkGrey,
    secondary: baseColors.mediumGrey,
    error: baseColors.darkRed,
  },
  input: {
    value: baseColors.darkGrey,
    placeholder: baseColors.mediumGrey,
    background: baseColors.lightGrey,
  },
  background: {
    default: baseColors.white,
    secondary: baseColors.lightGrey,
  },
};

const darkThemeColors = {
  common: {
    white: baseColors.white,
    black: baseColors.darkGrey,
    yellow: {
      light: baseColors.lightYellow,
      dark: baseColors.darkYellow,
    },
    green: {
      light: baseColors.lightGreen,
      dark: baseColors.darkGreen,
    },
    blue: {
      light: baseColors.lightBlue,
      dark: baseColors.darkBlue,
    },
    pink: {
      light: baseColors.lightPink,
      dark: baseColors.darkPink,
    },
  },
  text: {
    primary: baseColors.darkGrey,
    secondary: baseColors.mediumGrey,
    error: baseColors.darkRed,
  },
  input: {
    value: baseColors.darkGrey,
    placeholder: baseColors.mediumGrey,
    background: baseColors.lightGrey,
  },
  background: {
    default: baseColors.white,
    secondary: baseColors.lightGrey,
  },
};

export const baseTheme = {
  fonts: {
    regular: "TextaAlt-Regular",
    medium: "TextaAlt-Medium",
    bold: "TextaAlt-Bold",
    heavy: "TextaAlt-Heavy",
  },

  borderRadius: {
    medium: {
      value: 20,
      px: "20px",
    },
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: lightThemeColors,
};
export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: darkThemeColors,
};
