import React from "react";
import { ViewStyle } from "react-native";
import Hexagon from "../Hexagon";

export interface AvatarProps {
  uri: string | undefined;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  style?: ViewStyle;
}

export default function Avatar(props: AvatarProps) {
  const { uri = "", size = 56, strokeWidth = 4, strokeColor, style } = props;

  return (
    <Hexagon
      uri={uri}
      size={size}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      style={style}
    />
  );
}
