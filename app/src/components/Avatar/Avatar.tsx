import React from "react";
import { ViewStyle } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Path,
  Image,
  Circle,
} from "react-native-svg";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

export interface AvatarProps {
  uri?: string | null;
  active?: boolean;
  size?: number;
  style?: ViewStyle;
}

export default function Avatar(props: AvatarProps) {
  const { uri, active = false, size = 56, style } = props;

  const theme = useTheme();

  if (uri === undefined) <LoadingSkeleton size={size} />;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 560 560"
      fill="none"
      style={style}
    >
      <Defs>
        <LinearGradient
          id="active-indicator-gradient"
          x1={500}
          y1={440}
          x2={500}
          y2={560}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={theme.colors.common.green.light} />
          <Stop offset={1} stopColor={theme.colors.common.green.dark} />
        </LinearGradient>
      </Defs>

      <Mask id="active-mask">
        <Path
          fill="#fff"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M52.601 41.382A27.875 27.875 0 0056 28C56 12.536 43.464 0 28 0S0 12.536 0 28s12.536 28 28 28c4.847 0 9.406-1.231 13.382-3.399a9 9 0 0111.22-11.22z"
        />
      </Mask>

      <Mask id="inactive-mask">
        <Circle
          cx={280}
          cy={280}
          r={280}
          fill="#fff"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </Mask>

      {uri ? (
        <Image
          width={560}
          height={560}
          xlinkHref={{ uri }}
          mask={active ? "url(#active-mask)" : "url(#inactive-mask)"}
        />
      ) : (
        <Circle
          cx={280}
          cy={280}
          r={280}
          fill={theme.colors.common.pink.dark}
        />
      )}

      {active && (
        <Circle
          cx={500}
          cy={500}
          r={60}
          fill="url(#active-indicator-gradient)"
        />
      )}
    </Svg>
  );
}

const LoadingSkeleton = styled.View<{ size: number }>`
  border-radius: 999px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ theme }) => theme.colors.background.secondary};
`;
