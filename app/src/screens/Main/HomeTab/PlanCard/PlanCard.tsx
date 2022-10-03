import React from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";
import Stack from "../../../../components/Stack";
import LocationIcon from "../../../../../assets/images/icons/location.svg";
import TouchableScale from "../../../../components/TouchableScale";

export interface PlanCardProps {
  plan: {};
  onPress: () => void;
  style?: ViewStyle;
}

export default function PlanCard(props: PlanCardProps) {
  const { plan, onPress, style } = props;

  return (
    <TouchableScale onPress={onPress} scale={0.95}>
      <Root style={style}>
        <Stack flexDirection="row" gap={16}>
          <Details>
            <Stack flexDirection="row" gap={4}>
              {/* <HivePhoto /> */}
              <DetailText>20-30’s London Community</DetailText>
            </Stack>

            <MainDetails>
              <Name>Board games night</Name>
              <Time>Today at 7:00pm</Time>
            </MainDetails>

            <Stack gap={8} flexDirection="row">
              <Stack gap={4}>
                {/* <PhotosList /> */}
                <DetailText>51 going</DetailText>
              </Stack>

              <Stack
                gap={4}
                flexDirection="row"
                style={{ alignItems: "center" }}
              >
                <LocationIcon style={{ width: 16, height: 16 }} />
                <DetailText>6km away</DetailText>
              </Stack>
            </Stack>
          </Details>

          <Photo
            source={{
              uri: "https://www.meetup.com/_next/image/?url=https%3A%2F%2Fsecure-content.meetupstatic.com%2Fimages%2Fclassic-events%2F503910029%2F676x380.webp&w=1200&q=75",
            }}
          />
        </Stack>
      </Root>
    </TouchableScale>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 32px;
  overflow: hidden;
`;

const Details = styled.View`
  padding: 16px;
  flex: 1;
`;

const MainDetails = styled.View`
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
  font-size: 14px;
`;

const DetailText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
`;

const Photo = styled.Image`
  width: 106px;
  height: 174px;
`;
