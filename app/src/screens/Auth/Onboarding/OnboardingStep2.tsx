import React, { useState } from "react";
import { subYears } from "date-fns";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import styled from "styled-components/native";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import { StepRoot, StepTitle } from "./shared";

import { OnboardingFormValues } from "./Onboarding";

const MAXIMUM_AGE = 18;
const maximumDate = subYears(new Date(), MAXIMUM_AGE);

export interface OnboardingStep2Props {
  onBack: () => void;
  onSubmit: (formValues: OnboardingFormValues) => void;
}

export default function OnboardingStep2(props: OnboardingStep2Props) {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(maximumDate);
  const [errorMessage, setErrorMessage] = useState<string>();

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

      <StepTitle>When's your birthday?</StepTitle>

      <DateTimePicker
        display="spinner"
        value={dateOfBirth ?? maximumDate}
        onChange={(_, date) => setDateOfBirth(date)}
        maximumDate={maximumDate}
        style={{ marginBottom: 24 }}
      />

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Button onPress={handleSubmit}>Continue</Button>
    </StepRoot>
  );
}

const ErrorMessage = styled.Text`
  margin-top: 4px;
  margin-left: 16px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.error};
`;
