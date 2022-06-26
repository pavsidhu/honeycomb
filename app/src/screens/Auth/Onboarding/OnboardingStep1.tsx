import React, { useRef, useState } from "react";
import { Keyboard, TextInput as RNTextInput } from "react-native";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
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
      <StepTitle>What's your name?</StepTitle>

      <TextInput
        autoFocus={true}
        placeholder="First name"
        errorMessage={firstNameErrorMessage}
        returnKeyType="next"
        value={firstName}
        onChangeText={setFirstName}
        onSubmitEditing={() => lastNameRef.current?.focus()}
        style={{ marginBottom: 24 }}
      />
      <TextInput
        placeholder="Last name"
        errorMessage={lastNameErrorMessage}
        returnKeyType="next"
        value={lastName}
        onChangeText={setLastName}
        onSubmitEditing={handleSubmit}
        ref={lastNameRef}
        style={{ marginBottom: 24 }}
      />
      <Button loading={isLoading} onPress={handleSubmit}>
        Continue
      </Button>
    </StepRoot>
  );
}
