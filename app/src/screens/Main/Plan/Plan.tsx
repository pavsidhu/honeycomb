import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, ScrollView, Share, StatusBar, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import styled, { useTheme } from "styled-components/native";
import Button from "../../../components/Button";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import Icon from "../../../components/Icon";
import TouchableScale from "../../../components/TouchableScale";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";
import Avatar from "../../../components/Avatar";
import AvatarList from "../../../components/AvatarList";

export type PlanProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.Plan
>;

export default function Plan(props: PlanProps) {
  const { route, navigation } = props;
  const planId = route.params?.planId;

  const photos = [
    {
      id: "1",
      url: "https://www.meetup.com/_next/image/?url=https%3A%2F%2Fsecure-content.meetupstatic.com%2Fimages%2Fclassic-events%2F503910029%2F676x380.webp&w=1200&q=75",
    },
    {
      id: "2",
      url: "https://www.meetup.com/_next/image/?url=https%3A%2F%2Fsecure-content.meetupstatic.com%2Fimages%2Fclassic-events%2F503910029%2F676x380.webp&w=1200&q=75",
    },
  ];

  const dimensions = Dimensions.get("window");
  const theme = useTheme();

  function handleJoinPress() {}

  function handleShare() {
    Share.share({ url: "https://honeycomb.com" });
  }

  function handleLocationPress() {}

  return (
    <Root>
      <StatusBar barStyle="light-content" animated={true} />

      <ScrollView>
        <View
          style={{ width: dimensions.width, height: 300, position: "relative" }}
        >
          <Carousel
            width={dimensions.width}
            height={300}
            data={photos}
            scrollAnimationDuration={200}
            loop={false}
            renderItem={({ item }) => (
              <CarouselPhoto source={{ uri: item.url }} key={item.id} />
            )}
          />
        </View>

        <Sheet as={View} style={{ padding: 24 }}>
          <Stack gap={16}>
            <Stack gap={8}>
              <TouchableScale
                onPress={() => navigation.push(MainRoutes.Hive, { hiveId: "" })}
              >
                <Stack
                  flexDirection="row"
                  gap={4}
                  style={{ alignItems: "center" }}
                >
                  <Avatar
                    uri="https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg"
                    size={32}
                    strokeColor={theme.colors.background.secondary}
                  />

                  <HiveName>20-30’s London Community</HiveName>
                </Stack>
              </TouchableScale>

              <View>
                <Title>Board games night</Title>
                <Time>Today at 7:00pm</Time>
              </View>

              <TouchableScale
                onPress={() =>
                  navigation.push(MainRoutes.PlanAttendees, { planId })
                }
                style={{ width: "100%" }}
              >
                <AvatarList
                  avatars={[
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                    "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg",
                  ]}
                  max={10}
                  size={40}
                  strokeColor={theme.colors.background.primary}
                />
              </TouchableScale>
            </Stack>

            <Stack flexDirection="row" gap={8}>
              <Button
                onPress={handleShare}
                startIcon={<Icon name="share" size={24} />}
                fullWidth={true}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.background.secondary,
                }}
              >
                Share
              </Button>
              <Button onPress={handleJoinPress} fullWidth={true}>
                Join
              </Button>
            </Stack>

            <TouchableScale onPress={handleLocationPress}>
              <Stack
                flexDirection="row"
                gap={8}
                style={{ alignItems: "center" }}
              >
                <Icon name="location" size={24} />
                <Stack gap={4}>
                  <LocationTitle>Parliament Hill Bandstand</LocationTitle>
                  <LocationAddress>155-157 Queens Crescent</LocationAddress>
                </Stack>
              </Stack>
            </TouchableScale>

            <Description>
              The end of the summer is now sadly approaching and so we thought
              what better way to see it out in style, than with a special social
              walk to possibly the most beautiful hiking spot in the capital.
              Yep for this latest free social walk, we’ll be heading back to the
              lush green pastures of Hampstead Heath in North London. Along the
              way, we will wander past the stately home, Kenwood House and the
              famous Parliament Hill viewing point overlooking London. We will
              then ramble through the stunning ancient woodland, Highgate Wood
              before finally before ending up at a pub in Muswell Hill, where
              you'll be able to relax, have a drink and chat with those you've
              met on the walk.
            </Description>
          </Stack>
        </Sheet>
      </ScrollView>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  /* position: relative; */
`;

const CarouselPhoto = styled.Image`
  flex: 1;
  width: 100%;
`;

const HiveName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Time = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LocationTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LocationAddress = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
`;
