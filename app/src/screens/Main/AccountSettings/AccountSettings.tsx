import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";

type AccountSettingsProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.AccountSettings
>;

export default function AccountSettings(props: AccountSettingsProps) {
  const { navigation } = props;

  return (
    <Root>
      <ScrollView></ScrollView>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
`;
