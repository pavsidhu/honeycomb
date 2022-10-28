import React from "react";
import { Control } from "react-hook-form";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

import Button from "../../../components/Button";
import TextFieldRhf from "../../../components/TextFieldRhf";
import { OnboardingSchema } from "./onboardingSchema";
import { StepRoot, StepTitle } from "./shared";

export interface OnboardingStep1Props {
  control: Control<OnboardingSchema, any>;
  onSubmit: () => void;
}

export default function OnboardingStep1(props: OnboardingStep1Props) {
  const { control, onSubmit } = props;

  const theme = useTheme();

  return (
    <StepRoot>
      <View style={{ flex: 1 }} />

      <StepTitle>What's your name?</StepTitle>

      <TextFieldRhf
        autoFocus
        name="firstName"
        control={control}
        placeholder="First name"
        returnKeyType="next"
      />
      <TextFieldRhf
        name="lastName"
        control={control}
        placeholder="Last name"
        returnKeyType="next"
        onSubmitEditing={onSubmit}
      />

      <Button
        onPress={onSubmit}
        style={{ backgroundColor: theme.colors.common.blue }}
      >
        Continue
      </Button>
    </StepRoot>
  );
}
