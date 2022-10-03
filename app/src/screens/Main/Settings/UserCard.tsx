import React from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";
import Stack from "../../../components/Stack";
import IconButton from "../../../components/IconButton";
import { YellowThemeProvider } from "../../../theme";

export interface UserCardProps {
  onBackPress: () => void;
  style?: ViewStyle;
}

export default function UserCard(props: UserCardProps) {
  const { onBackPress, style } = props;

  return (
    <YellowThemeProvider>
      <Root style={style}>
        <IconButton name="back" edge="start" onPress={onBackPress} />

        <Stack>
          {/* <Avatar uri={currentUserAvatar?.uri} size={80} /> */}
          <Name>Pav Sidhu</Name>
        </Stack>
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.View`
  align-items: center;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background.primary};
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Name = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;
