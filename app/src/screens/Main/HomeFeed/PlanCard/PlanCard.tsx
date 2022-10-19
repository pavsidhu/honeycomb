import React from "react";
import { ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Stack from "../../../../components/Stack";
import TouchableScale from "../../../../components/TouchableScale";
import Avatar from "../../../../components/Avatar";
import AvatarList from "../../../../components/AvatarList";
import Button from "../../../../components/Button";

export interface PlanCardProps {
  plan: {};
  onPress: () => void;
  style?: ViewStyle;
}

export default function PlanCard(props: PlanCardProps) {
  const { plan, onPress, style } = props;

  const theme = useTheme();

  return (
    <TouchableScale onPress={onPress} scale={0.95}>
      <Root style={style}>
        <Stack gap={16} style={{ flex: 1 }}>
          <Stack flexDirection="row" gap={4} style={{ alignItems: "center" }}>
            <Avatar
              uri="https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg"
              size={32}
              strokeColor={theme.colors.background.secondary}
            />

            <DetailText>20-30’s London Community</DetailText>
          </Stack>

          {Math.random() < 0.5 && (
            <Photo
              source={{
                uri: "https://www.meetup.com/_next/image/?url=https%3A%2F%2Fsecure-content.meetupstatic.com%2Fimages%2Fclassic-events%2F503910029%2F676x380.webp&w=1200&q=75",
              }}
            />
          )}

          <Details>
            <Name>🎲 Board games night</Name>
            <Time>Today at 7:00pm</Time>
          </Details>

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

            <Button onPress={() => undefined} size="small">
              I'm going!
            </Button>
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

const Details = styled.View`
  flex: 1;
  justify-content: center;
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

const DetailText = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`;

const Photo = styled.Image`
  height: 180px;
  width: 100%;
  border-radius: 16px;
`;
