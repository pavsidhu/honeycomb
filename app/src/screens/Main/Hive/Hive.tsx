import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Button from "../../../components/Button";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import Icon from "../../../components/Icon";
import TouchableScale from "../../../components/TouchableScale";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";
import SheetTabs from "../../../components/SheetTabs";
import PlanCard from "../HomeTab/PlanCard";
import BackIcon from "../../../../assets/images/icons/back.svg";

export type HiveProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.Hive
>;

enum HiveSheetTab {
  UpcomingPlans = "upcoming-tab",
  PastPlans = "past-plans",
}

export default function Hive(props: HiveProps) {
  const { route, navigation } = props;
  const hiveId = route.params?.hiveId;

  const [activeTabId, setActiveTabId] = useState<string>(
    HiveSheetTab.UpcomingPlans
  );

  const theme = useTheme();

  const plans = [
    {
      id: "1",
      title: "Board games night",
      time: new Date(),
      hive: {
        id: "1",
        name: "20-30s London Community",
        photo: "",
      },
      attendees: {
        total: 51,
        list: [
          { id: "1", name: "John", photo: "" },
          { id: "2", name: "Mark", photo: "" },
          { id: "3", name: "Sarah", photo: "" },
        ],
      },
      location: {},
      photo: { id: 1, uri: "" },
    },
    {
      id: "1",
      title: "Board games night",
      time: new Date(),
      hive: {
        id: "1",
        name: "20-30s London Community",
        photo: "",
      },
      attendees: {
        total: 51,
        list: [
          { id: "1", name: "John", photo: "" },
          { id: "2", name: "Mark", photo: "" },
          { id: "3", name: "Sarah", photo: "" },
        ],
      },
      location: {},
      photo: { id: 1, uri: "" },
    },
    {
      id: "1",
      title: "Board games night",
      time: new Date(),
      hive: {
        id: "1",
        name: "20-30s London Community",
        photo: "",
      },
      attendees: {
        total: 51,
        list: [
          { id: "1", name: "John", photo: "" },
          { id: "2", name: "Mark", photo: "" },
          { id: "3", name: "Sarah", photo: "" },
        ],
      },
      location: {},
      photo: { id: 1, uri: "" },
    },
    {
      id: "1",
      title: "Board games night",
      time: new Date(),
      hive: {
        id: "1",
        name: "20-30s London Community",
        photo: "",
      },
      attendees: {
        total: 51,
        list: [
          { id: "1", name: "John", photo: "" },
          { id: "2", name: "Mark", photo: "" },
          { id: "3", name: "Sarah", photo: "" },
        ],
      },
      location: {},
      photo: { id: 1, uri: "" },
    },
    {
      id: "1",
      title: "Board games night",
      time: new Date(),
      hive: {
        id: "1",
        name: "20-30s London Community",
        photo: "",
      },
      attendees: {
        total: 51,
        list: [
          { id: "1", name: "John", photo: "" },
          { id: "2", name: "Mark", photo: "" },
          { id: "3", name: "Sarah", photo: "" },
        ],
      },
      location: {},
      photo: { id: 1, uri: "" },
    },
  ];

  return (
    <Root>
      <ScrollView>
        <SafeAreaView>
          <Header>
            <Stack gap={24} style={{ alignItems: "flex-start" }}>
              <TouchableScale onPress={navigation.goBack}>
                <BackButton>
                  <BackIcon fill={theme.colors.common.black} />
                </BackButton>
              </TouchableScale>

              <View>
                <Name>20-30’s London Community</Name>
                <Location>London, United Kingdom</Location>
              </View>

              <Stack flexDirection="row" gap={8}>
                <Button
                  onPress={() => undefined}
                  startIcon={<Icon name="share" size={24} />}
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.common.transparentWhite,
                  }}
                >
                  Share
                </Button>
                <Button
                  onPress={() => undefined}
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.common.white,
                  }}
                >
                  Join
                </Button>
              </Stack>

              <SheetTabs
                activeTabId={activeTabId}
                onActiveTabIdChange={setActiveTabId}
                tabs={[
                  { id: HiveSheetTab.UpcomingPlans, label: "Upcoming plans" },
                  { id: HiveSheetTab.PastPlans, label: "Past plans" },
                ]}
              />
            </Stack>
          </Header>
        </SafeAreaView>

        <Sheet>
          <PlanCardStack gap={16}>
            {plans.map((it) => (
              <PlanCard
                plan={it}
                onPress={() =>
                  navigation.push(MainRoutes.Plan, { planId: it.id })
                }
                key={it.id}
              />
            ))}
          </PlanCardStack>
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
  padding: 0 24px;
`;

const BackButton = styled.View`
  position: relative;
  left: -8px;
  top: -8px;
  padding: 8px;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Location = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PlanCardStack = styled(Stack)`
  padding: 24px;
`;
