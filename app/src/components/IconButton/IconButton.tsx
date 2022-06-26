import React, { PropsWithChildren } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled, { useTheme } from "styled-components/native";

export interface IconButtonProps extends PropsWithChildren<{}> {
  onPress: () => void;
  variant?: "primary" | "secondary" | "icon-only";
  style?: ViewStyle;
}

export default function IconButton(props: IconButtonProps) {
  const { variant = "icon-only", onPress, style, children } = props;

  const theme = useTheme();

  let colors: string[];

  switch (variant) {
    case "primary":
      colors = [
        theme.colors.common.yellow.light,
        theme.colors.common.yellow.dark,
      ];
      break;

    case "secondary":
      colors = [
        theme.colors.background.secondary,
        theme.colors.background.secondary,
      ];
      break;

    case "icon-only":
      colors = ["transparent"];
      break;

    default:
      throw new Error(`Invalid IconButton variant: ${variant}`);
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container colors={colors} style={style}>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled(LinearGradient)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
