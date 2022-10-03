import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import TouchableScale from "../../../components/TouchableScale";

export interface HomeTabHeaderButtonProps {
  onPress: () => void;
  photoUri?: string;
  style?: ViewStyle;
  children?: ReactNode;
}

export default function HomeTabHeaderButton(props: HomeTabHeaderButtonProps) {
  const { onPress, photoUri, children, style } = props;

  return (
    <TouchableScale onPress={onPress}>
      <Root style={style}>
        <Background>
          <Hexagon uri={photoUri} />
        </Background>

        {children && <Icon>{children}</Icon>}
      </Root>
    </TouchableScale>
  );
}

const Root = styled.View`
  width: 48px;
  height: 42px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.View`
  position: absolute;
`;

const Background = styled.View`
  position: absolute;
`;

interface HexagonProps {
  uri?: string;
}

function Hexagon(props: HexagonProps) {
  const { uri } = props;

  const theme = useTheme();

  return (
    <Svg width={44} height={40} viewBox="0 0 44 40" fill="none">
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
