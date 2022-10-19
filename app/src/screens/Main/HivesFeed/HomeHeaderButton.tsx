import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";
import Hexagon from "../../../components/Hexagon";
import TouchableScale from "../../../components/TouchableScale";

export interface HomeHeaderButtonProps {
  onPress: () => void;
  photoUri?: string;
  style?: ViewStyle;
  children?: ReactNode;
}

export default function HomeHeaderButton(props: HomeHeaderButtonProps) {
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
