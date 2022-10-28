import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import * as z from "zod";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Sheet from "../../../components/Sheet";
import MainRoutes, { MainRoutesParamList } from "../MainRoutes";

const createHiveSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
});
export type CreateHiveSchema = z.infer<typeof createHiveSchema>;

export type CreateHiveProps = NativeStackScreenProps<
  MainRoutesParamList,
  MainRoutes.CreateHive
>;

export default function CreateHive(props: CreateHiveProps) {
  const { navigation } = props;

  const { mutateAsync: createHive } = trpc.createHive.useMutation();

  const { control, handleSubmit, trigger, clearErrors } =
    useForm<CreateHiveSchema>({
      resolver: zodResolver(createHiveSchema),
    });

  async function onSubmit(values: CreateHiveSchema) {
    try {
      await createHive({
        name: values.name,
        location: values.location,
        description: values.description,
      });

      navigation.popToTop();
      navigation.push(MainRoutes.Hive, { hiveId: "" });
    } catch {
      // TODO: handle case
    }
  }

  return (
    <Root>
      <IconButton name="back" edge="start" onPress={navigation.goBack} />

      <Title>Create a new hive</Title>

      <Sheet>
        <TextFieldRhf label="Name" placeholder="" control={control} />
        {/* <LocationField /> */}

        <TextFieldRhf
          placeholder="Any extra details to add?"
          label="Description"
          multiline
          control={control}
          textInputStyle={{ height: 120 }}
        />

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
