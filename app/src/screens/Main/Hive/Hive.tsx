import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Button from "../../../components/Button";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import Icon from "../../../components/Icon";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";
import SheetTabs from "../../../components/SheetTabs";
import PlanCard from "../../../components/PlanCard";
import { YellowThemeProvider } from "../../../theme";
import IconButton from "../../../components/IconButton";
import AvatarList from "../../../components/AvatarList";
import TouchableScale from "../../../components/TouchableScale";

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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
    <YellowThemeProvider>
      <Root>
        <ScrollView>
          <SafeAreaView>
            <Header>
              <Stack gap={24} style={{ alignItems: "flex-start" }}>
                <IconButton
                  name="back"
                  variant="primary"
                  onPress={navigation.goBack}
                />

                <View>
                  <Name>20-30’s London Community</Name>
                  <Location>London, United Kingdom</Location>
                </View>

                <TouchableScale
                  onPress={() =>
                    navigation.push(MainRoutes.HiveMembers, { hiveId })
                  }
                >
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
                    strokeColor={theme.colors.common.yellow}
                  />
                </TouchableScale>

                <Stack flexDirection="row" gap={8} style={{ width: "100%" }}>
                  <Button
                    fullWidth={true}
                    startIcon={<Icon name="share" size={24} />}
                    onPress={() => undefined}
                    style={{
                      backgroundColor: theme.colors.common.transparentWhite,
                    }}
                  >
                    Share
                  </Button>

                  <Button
                    fullWidth={true}
                    onPress={() => undefined}
                    style={{ backgroundColor: theme.colors.common.white }}
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

          <Sheet as={View}>
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
    </YellowThemeProvider>
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
