import React from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

import Avatar from "../../../components/Avatar";
import IconButton from "../../../components/IconButton";
import Stack from "../../../components/Stack";
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

        <Stack style={{ alignItems: "center" }}>
          <Avatar
            size={120}
            strokeWidth={2}
            uri="https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg"
          />
          <Name>Pav Sidhu</Name>
        </Stack>
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.View`
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
