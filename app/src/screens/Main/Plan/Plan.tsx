import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import styled, { useTheme } from "styled-components/native";
import LocationIcon from "../../../../assets/images/icons/location.svg";
import BackIcon from "../../../../assets/images/icons/back.svg";
import ShareIcon from "../../../../assets/images/icons/share.svg";
import Button from "../../../components/Button";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import Icon from "../../../components/Icon";
import TouchableScale from "../../../components/TouchableScale";
import MainRoutes from "../MainRoutes";

export default function Plan(props: NativeStackHeaderProps) {
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

  return (
    <Root>
      <ScrollView>
        {/* <SafeAreaView>
          <Header>
            <TouchableWithoutFeedback onPress={navigation.goBack}>
              <BackButton>
                <BackIcon fill={theme.colors.common.white} />
              </BackButton>
            </TouchableWithoutFeedback>
          </Header>
        </SafeAreaView> */}

        <Carousel
          width={dimensions.width}
          height={dimensions.height * 0.6 + 24}
          data={photos}
          scrollAnimationDuration={200}
          loop={false}
          renderItem={({ item }) => (
            <CarouselPhoto source={{ uri: item.url }} key={item.id} />
          )}
        />

        <Sheet
          as={View}
          style={{ position: "relative", top: -56, padding: 24 }}
        >
          <Stack gap={16}>
            <Stack gap={8} style={{ alignItems: "flex-start" }}>
              {/* <Photo /> */}
              <TouchableScale
                onPress={() => navigation.push(MainRoutes.Hive, { hiveId: "" })}
              >
                <HiveName>20-30’s London Community</HiveName>
              </TouchableScale>

              <Title>Board games night</Title>
              <Time>Today at 7:00pm</Time>
            </Stack>

            <Stack flexDirection="row" gap={8}>
              <Button
                onPress={() => undefined}
                startIcon={<Icon name="share" size={24} />}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.background.secondary,
                }}
              >
                Share
              </Button>
              <Button onPress={() => undefined} style={{ flex: 1 }}>
                I'm going!
              </Button>
            </Stack>

            <Stack flexDirection="row" gap={8}>
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

              <Divider />

              <Stack flexDirection="row" gap={8}>
                {/* <PhotosList /> */}
                <PeopleGoing>51 going</PeopleGoing>
              </Stack>
            </Stack>

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
  position: relative;
`;

const Header = styled.View`
  position: relative;
`;

const BackButton = styled.View`
  position: absolute;
  left: 16px;
  top: 16px;
  padding: 8px;
`;

const CarouselPhoto = styled.Image`
  flex: 1;
  width: 100%;
`;

const HiveName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
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
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LocationAddress = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PeopleGoing = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Divider = styled.View`
  height: 100%;
  width: 1px;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;
