import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Linking, ScrollView } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";
import SettingsItem from "./SettingsItem";
import UserCard from "./UserCard";
import Stack from "../../../components/Stack";

const openTerms = () =>
  Linking.openURL(Constants.manifest?.extra?.termsOfServiceUrl);
const openPrivacy = () =>
  Linking.openURL(Constants.manifest?.extra?.privacyPolicyUrl);

type SettingsProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.Settings
>;

export default function Settings(props: SettingsProps) {
  const { navigation } = props;

  // TODO: implement
  const accountSettings = () => navigation.push(MainRoutes.AccountSettings);
  const logOut = () => undefined;

  return (
    <Root>
      <UserCard onBackPress={navigation.goBack} />

      <ScrollView style={{ paddingTop: 16 }}>
        <Stack gap={16}>
          <SettingsItem onPress={accountSettings} label="Account Settings" />
          <SettingsItem onPress={openTerms} label="Terms of Service" />
          <SettingsItem onPress={openPrivacy} label="Privacy Policy" />
          <SettingsItem onPress={logOut} label="Log Out" />

          <SmallText>
            <Version>Honeycomb Version 1.0 🐝</Version>
            <Credit>Made in London</Credit>
          </SmallText>
        </Stack>
      </ScrollView>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const SmallText = styled.View`
  align-self: center;
  align-items: center;
`;

const Version = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Credit = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
