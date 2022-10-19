import React from "react";
import { ViewStyle } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import TouchableScale from "../TouchableScale";
import BackIcon from "../../../assets/images/icons/back.svg";

const icons = {
  back: BackIcon,
};

export type IconButtonVariant = "primary" | "secondary";
export type IconButtonEdge = "start" | "end";

export interface IconButtonProps {
  name: keyof typeof icons;
  variant?: IconButtonVariant;
  color?: string;
  edge?: IconButtonEdge;
  style?: ViewStyle;
  onPress: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { name, variant = "primary", color, edge, style, onPress } = props;

  const theme = useTheme();

  const Icon = icons[name];

  return (
    <Root edge={edge} style={style}>
      <TouchableScale onPress={onPress}>
        <Container>
          <Icon
            fill={color ? color : theme.colors.icon[variant]}
            width={24}
            height={24}
          />
        </Container>
      </TouchableScale>
    </Root>
  );
}

const SIZE = "40px";

const Root = styled.View<{ edge?: IconButtonEdge }>`
  width: ${SIZE};
  height: ${SIZE};

  ${({ edge }) =>
    edge === "start" &&
    css`
      margin-left: -8px;
    `}

  ${({ edge }) =>
    edge === "end" &&
    css`
      margin-right: -8px;
    `}
`;

const Container = styled.View`
  width: ${SIZE};
  height: ${SIZE};
  align-items: center;
  justify-content: center;
`;
