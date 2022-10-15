import React, { useRef, useState } from "react";
import { Keyboard, TextInput as RNTextInput, View } from "react-native";
import { useTheme } from "styled-components/native";
import Button from "../../../components/Button";
import Stack from "../../../components/Stack";
import TextInput from "../../../components/TextField";
import { OnboardingFormValues } from "./Onboarding";
import { StepRoot, StepTitle } from "./shared";

export interface OnboardingStep1Props {
  onSubmit: (formValues: OnboardingFormValues) => void;
}

export default function OnboardingStep1(props: OnboardingStep1Props) {
  const { onSubmit } = props;

  const [firstName, setFirstName] = useState<string>();
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const lastNameRef = useRef<RNTextInput>(null);
  const theme = useTheme();

  function handleSubmit() {
    setIsLoading(true);

    let hasError = false;

    if (!firstName || firstName.trim().length === 0) {
      setFirstNameErrorMessage("Please enter your first name");
      hasError = true;
    } else {
      setFirstNameErrorMessage(undefined);
    }

    if (!lastName || lastName.trim().length === 0) {
      setLastNameErrorMessage("Please enter your last name");
      hasError = true;
    } else {
      setLastNameErrorMessage(undefined);
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    setFirstNameErrorMessage(undefined);
    setLastNameErrorMessage(undefined);
    setIsLoading(false);

    Keyboard.dismiss();
    onSubmit({ firstName, lastName });
  }

  return (
    <StepRoot>
      <View style={{ flex: 1 }} />

      <StepTitle>What's your name?</StepTitle>

      <TextInput
        autoFocus={true}
        placeholder="First name"
        errorMessage={firstNameErrorMessage}
        returnKeyType="next"
        value={firstName}
        onChangeText={setFirstName}
        onSubmitEditing={() => lastNameRef.current?.focus()}
      />
      <TextInput
        placeholder="Last name"
        errorMessage={lastNameErrorMessage}
        returnKeyType="next"
        value={lastName}
        onChangeText={setLastName}
        onSubmitEditing={handleSubmit}
        ref={lastNameRef}
      />

      <Button
        loading={isLoading}
        onPress={handleSubmit}
        style={{ backgroundColor: theme.colors.common.blue }}
      >
        Continue
      </Button>
    </StepRoot>
  );
}
