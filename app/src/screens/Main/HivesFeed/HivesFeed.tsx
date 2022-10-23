import BottomSheet from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

import AddIcon from "../../../../assets/images/icons/add.svg";
import LogoSvg from "../../../../assets/images/logo/logo.svg";
import HeaderButton from "../../../components/HeaderButton";
import HiveCard from "../../../components/HiveCard";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import { YellowThemeProvider } from "../../../theme";
import CreatePlanOrHiveBottomSheet from "../CreatePlanOrHiveBottomSheet";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";

export type HomeFeedProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.HivesFeed
>;

export default function HivesFeed(props: HomeFeedProps) {
  const { navigation } = props;

  const createPlanOrHiveBottomSheetRef = useRef<BottomSheet>(null);

  const plans = [
    { id: "0", name: "20-30s London Community", photo: "" },
    { id: "1", name: "20-30s London Community", photo: "" },
    { id: "2", name: "20-30s London Community", photo: "" },
    { id: "3", name: "20-30s London Community", photo: "" },
    { id: "4", name: "20-30s London Community", photo: "" },
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
              <HeaderButton
                onPress={() => createPlanOrHiveBottomSheetRef.current?.expand()}
              >
                <AddIcon />
              </HeaderButton>

              <HeaderButton
                onPress={() => props.navigation.push(MainRoutes.Settings)}
                photoUri="https://yikofvxolafrzkwwcnuh.supabase.co/storage/v1/object/public/avatars/bb7d6c86-bf74-4cfd-9e58-0601f0cfe812/avatar.jpg"
              />
            </Stack>
          </Header>
        </SafeAreaView>

        <Sheet>
          <HiveCardStack gap={16}>
            {plans.map((it) => (
              <HiveCard
                hive={it}
                onPress={() =>
                  navigation.push(MainRoutes.Hive, { hiveId: it.id })
                }
                key={it.id}
              />
            ))}
          </HiveCardStack>
        </Sheet>

        <CreatePlanOrHiveBottomSheet
          ref={createPlanOrHiveBottomSheetRef}
          onCreatePlanPress={() => {
            navigation.push(MainRoutes.CreatePlan);
            createPlanOrHiveBottomSheetRef.current?.close();
          }}
          onCreateHivePress={() => {
            navigation.push(MainRoutes.CreateHive);
            createPlanOrHiveBottomSheetRef.current?.close();
          }}
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

const HiveCardStack = styled(Stack)`
  padding: 24px;
`;
