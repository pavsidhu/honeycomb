import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import BackIcon from "../../../../assets/images/icons/back.svg";
import IconButton from "../../../components/IconButton";

export default function SettingsHeader(props: NativeStackHeaderProps) {
  return (
    <Root>
      <SafeAreaView>
        <Contents>
          <IconButton
            onPress={props.navigation.goBack}
            variant="icon-only"
            style={{ marginRight: 16 }}
          >
            <BackIcon />
          </IconButton>

          <Title>Settings</Title>
        </Contents>
      </SafeAreaView>
    </Root>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.default};
`;

const Contents = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
