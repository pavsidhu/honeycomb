import React from "react";
import { ViewStyle } from "react-native";
import Svg, { Defs, Path, Image, Pattern, Use } from "react-native-svg";
import { useTheme } from "styled-components";

export interface AvatarProps {
  uri?: string | null;
  size?: number;
  style?: ViewStyle;
}

export default function Avatar(props: AvatarProps) {
  const { uri, size = 56, style } = props;

  const theme = useTheme();

  if (!uri) return null;

  return (
    <Svg width={44} height={40} viewBox="0 0 44 40" fill="none" style={style}>
      <Path
        d="m40.295 14.895-4.75-8A10 10 0 0 0 26.946 2h-9.892a10 10 0 0 0-8.599 4.895l-4.75 8a10 10 0 0 0 0 10.21l4.75 8A10 10 0 0 0 17.054 38h9.892a10 10 0 0 0 8.599-4.895l4.75-8a10 10 0 0 0 0-10.21Z"
        fill={uri ? "url(#pattern)" : theme.colors.common.white}
        stroke={theme.colors.common.white}
        strokeWidth={4}
      />

      <Defs>
        <Pattern
          id="pattern"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image"
            transform="matrix(.00091 0 0 .00108 0 -.094)"
          />
        </Pattern>
        <Image id="image" width={1098} height={1098} xlinkHref={{ uri }} />
      </Defs>
    </Svg>
  );
}
