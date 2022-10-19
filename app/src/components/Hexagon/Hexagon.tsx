import { ViewStyle } from "react-native";
import Svg, { Defs, Image, Path, Pattern, Use } from "react-native-svg";
import { useTheme } from "styled-components/native";

export interface HexagonProps {
  uri?: string;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  isDimmed?: boolean;
  style?: ViewStyle;
}

export default function Hexagon(props: HexagonProps) {
  const {
    uri,
    size = 44,
    strokeWidth = 4,
    strokeColor: strokeColorExternal,
    backgroundColor: backgroundColorExternal,
    isDimmed = false,
    style,
  } = props;

  const theme = useTheme();

  const strokeColor = strokeColorExternal
    ? strokeColorExternal
    : theme.colors.common.white;

  const backgroundColor = backgroundColorExternal
    ? backgroundColorExternal
    : strokeColor;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 44 40"
      fill="none"
      style={style}
    >
      <Path
        d="m40.295 14.895-4.75-8A10 10 0 0 0 26.946 2h-9.892a10 10 0 0 0-8.599 4.895l-4.75 8a10 10 0 0 0 0 10.21l4.75 8A10 10 0 0 0 17.054 38h9.892a10 10 0 0 0 8.599-4.895l4.75-8a10 10 0 0 0 0-10.21Z"
        fill={uri ? "url(#pattern)" : backgroundColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      {isDimmed && (
        <Path
          d="m40.295 14.895-4.75-8A10 10 0 0 0 26.946 2h-9.892a10 10 0 0 0-8.599 4.895l-4.75 8a10 10 0 0 0 0 10.21l4.75 8A10 10 0 0 0 17.054 38h9.892a10 10 0 0 0 8.599-4.895l4.75-8a10 10 0 0 0 0-10.21Z"
          fill="rgba(0, 0, 0, 0.2)"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}

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
