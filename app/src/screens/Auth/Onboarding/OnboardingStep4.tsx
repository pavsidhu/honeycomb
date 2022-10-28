import * as Notifications from "expo-notifications";
import React, { useState } from "react";

import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import trpc from "../../../trpc";
import { StepRoot, StepTitle } from "./shared";

export interface OnboardingStep4Props {}

export default function OnboardingStep4(props: OnboardingStep4Props) {
  const {} = props;

  const { mutateAsync: createUser } = trpc.user.create.useMutation();
  const [errorMessage, setErrorMessage] = useState<string>();

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
    const user = await createUser({
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
    });

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
