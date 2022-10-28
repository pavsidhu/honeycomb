import React from "react";
import { Control } from "react-hook-form";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

import Button from "../../../components/Button";
import DateTimeFieldRhf from "../../../components/DateTimeFieldRhf";
import IconButton from "../../../components/IconButton";
import { maxDateOfBirth, OnboardingSchema } from "./onboardingSchema";
import { StepRoot, StepTitle } from "./shared";

export interface OnboardingStep2Props {
  control: Control<OnboardingSchema, any>;
  onBack: () => void;
  onSubmit: () => void;
}

export default function OnboardingStep2(props: OnboardingStep2Props) {
  const { control, onSubmit } = props;

  const theme = useTheme();

  return (
    <StepRoot>
      <IconButton name="back" edge="start" onPress={props.onBack} />

      <View style={{ flex: 1 }} />

      <StepTitle>When's your birthday?</StepTitle>

      <DateTimeFieldRhf
        name="dateOfBirth"
        control={control}
        maximumDate={maxDateOfBirth}
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
