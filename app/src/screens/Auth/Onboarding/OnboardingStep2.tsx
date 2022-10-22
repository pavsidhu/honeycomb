import React, { useState } from "react";
import { subYears } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import { StepRoot, StepTitle } from "./shared";
import { OnboardingFormValues } from "./Onboarding";
import ErrorMessage from "../../../components/ErrorMessage";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

const MINIMUM_AGE = 18;
const maximumDate = subYears(new Date(), MINIMUM_AGE);

export interface OnboardingStep2Props {
  onBack: () => void;
  onSubmit: (formValues: OnboardingFormValues) => void;
}

export default function OnboardingStep2(props: OnboardingStep2Props) {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(maximumDate);
  const [errorMessage, setErrorMessage] = useState<string>();
  const theme = useTheme();

  function handleSubmit() {
    if (!dateOfBirth) {
      setErrorMessage("Please enter your date of birth");
      return;
    }

    setErrorMessage(undefined);
    props.onSubmit({ dateOfBirth: dateOfBirth.toISOString() });
  }

  return (
    <StepRoot>
      <IconButton name="back" edge="start" onPress={props.onBack} />

      <View style={{ flex: 1 }} />

      <StepTitle>When's your birthday?</StepTitle>

      <DateTimePicker
        display="spinner"
        value={dateOfBirth ?? maximumDate}
        onChange={(_, date) => setDateOfBirth(date)}
        maximumDate={maximumDate}
        style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
      />

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Button
        onPress={handleSubmit}
        style={{ backgroundColor: theme.colors.common.blue }}
      >
        Continue
      </Button>
    </StepRoot>
  );
}
