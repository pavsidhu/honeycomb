import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Sheet from "../../../components/Sheet";
import TextField from "../../../components/TextField";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";

export type CreateHiveProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.CreateHive
>;

export default function CreateHive(props: CreateHiveProps) {
  const { navigation } = props;

  function handleSubmit() {
    navigation.popToTop();
    navigation.push(MainRoutes.Hive, { hiveId: "" });
  }

  return (
    <Root>
      <IconButton name="back" edge="start" onPress={navigation.onBack} />

      <Title>Create a new hive</Title>

      <Sheet>
        <TextField label="Name" placeholder="" />
        {/* <SelectField label="Location" /> */}
        {/* <LongTextField label="Description" /> */}

        <Button onPress={handleSubmit}>Create hive</Button>
      </Sheet>
    </Root>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Title = styled.Text`
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;
