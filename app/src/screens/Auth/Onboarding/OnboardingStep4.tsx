import React, { useState } from "react";
import styled from "styled-components/native";
import * as Notifications from "expo-notifications";
import Button from "../../../components/Button";
import { StepRoot, StepTitle } from "./shared";
import { OnboardingFormValues } from "./Onboarding";
import ErrorMessage from "../../../components/ErrorMessage";
export interface OnboardingStep4Props {
  formValues: OnboardingFormValues;
  onBack: () => void;
}

export default function OnboardingStep4(props: OnboardingStep4Props) {
  const { formValues, onBack } = props;
  const { firstName, lastName, dateOfBirth, avatar } = formValues;

  const [errorMessage, setErrorMessage] = useState<string>();

  function setupUser() {}

  function setupAvatar() {}

  async function setupPermissions() {
    await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
        allowSound: true,
        allowDisplayInCarPlay: true,
        allowAnnouncements: true,
      },
    });
  }

  async function handleSubmit() {
    const results = await Promise.allSettled([setupUser, setupAvatar]);

    const error = results.some(({ status }) => status === "rejected");
    if (error) {
      setErrorMessage("Unable to create your account");
      return;
    }

    await setupPermissions();
  }

  return (
    <StepRoot>
      <StepTitle>You're ready to go!</StepTitle>

      <Button onPress={handleSubmit}>Lets start!</Button>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StepRoot>
  );
}
