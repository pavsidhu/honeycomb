import React from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";
import Avatar from "../Avatar/Avatar";
import Stack from "../Stack";

export interface AvatarListProps {
  avatars: string[];
  max?: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  style?: ViewStyle;
}

export default function AvatarList(props: AvatarListProps) {
  const {
    avatars,
    max = 5,
    size = 56,
    strokeWidth = 4,
    strokeColor,
    style,
  } = props;

  const horizontalOffset = size / -3;

  const avatarsToShow = avatars.slice(0, max);

  return (
    <Stack flexDirection="row" style={style}>
      {avatarsToShow.map((it, index) => {
        const content = (
          <Avatar
            uri={it}
            key={index}
            size={size}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            style={{ marginLeft: index > 0 ? horizontalOffset : 0 }}
          />
        );

        if (avatars.length > 5 && index === avatarsToShow.length - 1) {
          return (
            <NumberOfPeopleGoing
              key={index}
              style={{ marginLeft: horizontalOffset }}
            >
              <Avatar
                uri={it}
                key={index}
                size={size}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                isDimmed={true}
              />
              <NumberOfPeopleGoingText>+51</NumberOfPeopleGoingText>
            </NumberOfPeopleGoing>
          );
        }

        return content;
      })}
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
