import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import TextField from "../../../components/TextField";
import TouchableScale from "../../../components/TouchableScale";
import { YellowThemeProvider } from "../../../theme";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";

export type CreatePlanProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.CreatePlan
>;

export default function CreatePlan(props: CreatePlanProps) {
  const { navigation } = props;

  const theme = useTheme();

  function handleSubmit() {}

  return (
    <YellowThemeProvider>
      <Root>
        <SafeAreaView style={{ flex: 1 }}>
          <Header>
            <Stack gap={24} style={{ alignItems: "flex-start" }}>
              <IconButton
                name="back"
                edge="start"
                variant="primary"
                onPress={navigation.goBack}
              />

              <Title>Create a new plan</Title>
            </Stack>
          </Header>

          <Sheet style={{ flex: 1 }}>
            <Stack
              gap={24}
              style={{ paddingVertical: 40, paddingHorizontal: 24 }}
            >
              <TextField
                placeholder="What's the name of your plan?"
                label="Name"
              />

              {/* <DateField /> */}

              {/* <LocationField /> */}

              <TextField
                placeholder="Any extra details to add?"
                label="Description"
                multiline={true}
                textInputStyle={{ height: 120 }}
              />

              <Button onPress={handleSubmit}>Create</Button>
            </Stack>
          </Sheet>
        </SafeAreaView>
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Title = styled.Text`
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Header = styled.View`
  padding: 0 24px;
`;
