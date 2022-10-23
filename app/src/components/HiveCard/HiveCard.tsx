import React from "react";
import { View, ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";

import Avatar from "../Avatar";
import AvatarList from "../AvatarList";
import Stack from "../Stack";
import TouchableScale from "../TouchableScale";

export interface HiveCardProps {
  hive: object;
  onPress: () => void;
  style?: ViewStyle;
}

export default function HiveCard(props: HiveCardProps) {
  const { hive, onPress, style } = props;

  const theme = useTheme();

  return (
    <TouchableScale onPress={onPress} scale={0.95}>
      <Root style={style}>
        <Stack gap={16} style={{ flex: 1 }}>
          <View>
            <Stack flexDirection="row" gap={4} style={{ alignItems: "center" }}>
              <Avatar
                uri="https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg"
                size={32}
                strokeColor={theme.colors.background.secondary}
              />

              <Name>20-30’s London Community</Name>
            </Stack>
            <Time>London, United Kingdom</Time>
          </View>

          <Stack flexDirection="row" gap={4} style={{ alignItems: "center" }}>
            <AvatarList
              avatars={[
                "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
              ]}
              size={40}
              strokeColor={theme.colors.background.secondary}
              style={{ flex: 1 }}
            />
          </Stack>
        </Stack>
      </Root>
    </TouchableScale>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 32px;
  overflow: hidden;
  padding: 16px;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 22px;
`;

const Time = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`;
