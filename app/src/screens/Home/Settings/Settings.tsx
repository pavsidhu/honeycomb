import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { supabase } from "../../../supabase";
import HomeRoutes, { HomeRoutesParamList } from "../HomeRoutes";
import SettingsGroupItem from "./SettingsGroupItem";
import UserCard from "./UserCard";
import SettingsGroup from "./SettingsGroup";
import Stack from "../../../components/Stack";

const openTerms = () =>
  Linking.openURL(Constants.manifest.extra?.termsOfServiceUrl);
const openPrivacy = () =>
  Linking.openURL(Constants.manifest.extra?.privacyPolicyUrl);

type SettingsProps = NativeStackScreenProps<
  HomeRoutesParamList,
  HomeRoutes.Settings
>;

export default function Settings(props: SettingsProps) {
  return (
    <Root>
      <Stack>
        <UserCard onPress={() => undefined} />

        <SettingsGroup>
          <SettingsGroupItem onPress={openTerms} label="Terms of Service" />
          <SettingsGroupItem onPress={openPrivacy} label="Privacy Policy" />

          <SettingsGroupItem onPress={supabase.auth.signOut} label="Sign Out" />
        </SettingsGroup>

        <SmallText>
          <Version>Honeycomb v1.0 🐝</Version>
          <Credit>Made in London</Credit>
        </SmallText>
      </Stack>
    </Root>
  );
}

const Root = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.background.default};
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
