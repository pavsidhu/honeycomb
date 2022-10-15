import React from "react";
import { ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Avatar from "../Avatar/Avatar";
import Hexagon from "../Hexagon";
import Stack from "../Stack";

export interface AvatarListProps {
  avatars: string[];
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  style?: ViewStyle;
}

export default function AvatarList(props: AvatarListProps) {
  const { avatars, size = 56, strokeWidth = 4, strokeColor, style } = props;

  const theme = useTheme();

  const horizontalOffset = size / -3;

  return (
    <Stack flexDirection="row" style={style}>
      {avatars.map((it, index) => (
        <Avatar
          uri={it}
          key={index}
          size={size}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          style={{ marginLeft: index > 0 ? horizontalOffset : 0 }}
        />
      ))}

      <NumberOfPeopleGoing style={{ marginLeft: horizontalOffset }}>
        <Hexagon
          size={size - strokeWidth}
          strokeColor={strokeColor}
          backgroundColor={theme.colors.common.darkGrey}
        />
        <NumberOfPeopleGoingText>+51</NumberOfPeopleGoingText>
      </NumberOfPeopleGoing>
    </Stack>
  );
}

const NumberOfPeopleGoing = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

const NumberOfPeopleGoingText = styled.Text`
  position: absolute;
  transform: translateY(-1px);
  color: ${({ theme }) => theme.colors.common.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
`;
