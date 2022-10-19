import BottomSheet from "@gorhom/bottom-sheet";
import AddIcon from "../../../../assets/images/icons/add.svg";
import LogoSvg from "../../../../assets/images/logo/logo.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components/native";
import Sheet from "../../../components/Sheet";
import SheetTabs from "../../../components/SheetTabs";
import Stack from "../../../components/Stack";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";
import HomeFeedHeaderButton from "./HomeHeaderButton";
import PlanCard from "./PlanCard";
import CreatePlanOrHiveBottomSheet from "../CreatePlanOrHiveBottomSheet";
import { YellowThemeProvider } from "../../../theme";

export type HomeFeedProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.HomeFeed
>;

enum HomeFeedSheetTab {
  UpcomingPlans = "upcoming-tab",
  PastPlans = "past-plans",
}

export default function HomeFeed(props: HomeFeedProps) {
  const { navigation } = props;

  const [activeTabId, setActiveTabId] = useState<string>(
    HomeFeedSheetTab.UpcomingPlans
  );

  const createPlanOrHiveBottomSheetRef = useRef<BottomSheet>(null);

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
        <SafeAreaView>
          <Header>
            <LogoContainer>
              <Logo />
              <Title>Honeycomb</Title>
            </LogoContainer>

            <Stack flexDirection="row" gap={8}>
              <HomeFeedHeaderButton
                onPress={() => createPlanOrHiveBottomSheetRef.current?.expand()}
              >
                <AddIcon />
              </HomeFeedHeaderButton>

              <HomeFeedHeaderButton
                onPress={() => props.navigation.push(MainRoutes.Settings)}
                photoUri={
                  "https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg"
                }
              />
            </Stack>
          </Header>

          <SheetTabs
            activeTabId={activeTabId}
            onActiveTabIdChange={setActiveTabId}
            tabs={[
              { id: HomeFeedSheetTab.UpcomingPlans, label: "Upcoming plans" },
              { id: HomeFeedSheetTab.PastPlans, label: "Past plans" },
            ]}
          />
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

        <CreatePlanOrHiveBottomSheet
          ref={createPlanOrHiveBottomSheetRef}
          onCreatePlanPress={() => navigation.push(MainRoutes.CreatePlan)}
          onCreateHivePress={() => navigation.push(MainRoutes.CreateHive)}
        />
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
`;

const LogoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled(LogoSvg)`
  width: 40px;
  height: 40px;
  transform: rotateZ(-15deg);
`;

const Title = styled.Text`
  margin-left: 8px;
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PlanCardStack = styled(Stack)`
  padding: 24px;
`;

const PlanCardsTitle = styled.Text`
  margin-left: 8px;
  margin-top: 16px;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;
