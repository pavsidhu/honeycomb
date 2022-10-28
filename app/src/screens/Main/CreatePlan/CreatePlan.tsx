import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import * as z from "zod";

import Button from "../../../components/Button";
import DateTimeFieldRhf from "../../../components/DateTimeFieldRhf";
import IconButton from "../../../components/IconButton";
import Sheet from "../../../components/Sheet";
import Stack from "../../../components/Stack";
import TextFieldRhf from "../../../components/TextFieldRhf";
import { YellowThemeProvider } from "../../../theme";
import trpc from "../../../trpc";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";

const NAME_PLACEHOLDER_LIST = [
  "Badminton in Brixton",
  "Pianoworks night out",
  "Richmond park walk",
];
function generateNamePlaceholder() {
  const index = Math.floor(Math.random() * NAME_PLACEHOLDER_LIST.length);
  return NAME_PLACEHOLDER_LIST[index];
}

const createPlanSchema = z.object({
  name: z.string(),
  date: z.date(),
  location: z.string(),
  description: z.string(),
});
export type CreatePlanSchema = z.infer<typeof createPlanSchema>;

export type CreatePlanProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.CreatePlan
>;

export default function CreatePlan(props: CreatePlanProps) {
  const { navigation } = props;

  const [namePlaceholder] = useState(generateNamePlaceholder);

  const { mutateAsync: createPlan } = trpc.createPlan.useMutation();

  const { control, handleSubmit, trigger, clearErrors } =
    useForm<CreatePlanSchema>({
      resolver: zodResolver(createPlanSchema),
    });

  async function onSubmit(values: CreatePlanSchema) {
    try {
      const plan = await createPlan({
        name: values.name,
        date: values.date,
        location: values.location,
        description: values.description,
      });

      navigation.popToTop();
      navigation.push(MainRoutes.Plan, { planId: plan.id });
    } catch {
      // TODO: handle case
    }
  }

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
              <TextFieldRhf
                name="name"
                placeholder={`e.g. ${namePlaceholder}`}
                label="Name"
                control={control}
              />

              <DateTimeFieldRhf
                name="date"
                value={new Date()}
                onChange={() => {}}
                label="Date"
                control={control}
              />

              {/* <LocationField /> */}

              <TextFieldRhf
                name="description"
                placeholder="Any extra details to add?"
                label="Description"
                multiline
                control={control}
                textInputStyle={{ height: 120 }}
              />

              <Button onPress={handleSubmit(onSubmit)}>Create</Button>
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
