import React, { useState } from "react";
import styled from "styled-components/native";
import * as Contacts from "expo-contacts";
import * as Notifications from "expo-notifications";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import { StepRoot, StepTitle } from "./shared";
import BackIcon from "../../../../assets/images/icons/back.svg";
import { OnboardingFormValues } from "./Onboarding";
import { useCreateUser } from "../../../supabase/entities/users";
import { useCreateAvatar } from "../../../supabase/entities/avatars";
import { useAddFriends } from "../../../supabase/entities/friends";
import { supabase } from "../../../supabase";
import getLocalPhoneNumbers from "../../../utils/getLocalPhoneNumbers";

export interface OnboardingStep4Props {
  formValues: OnboardingFormValues;
  onBack: () => void;
}

export default function OnboardingStep4(props: OnboardingStep4Props) {
  const { formValues, onBack } = props;
  const { firstName, lastName, dateOfBirth, avatar } = formValues;

  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutateAsync: createAvatar } = useCreateAvatar();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: addFriends } = useAddFriends();

  function setupUser() {
    // Submit new user if on last step

    const user = supabase.auth.user();
    const id = user?.id;
    const phoneNumber = user?.phone;

    if (!id) {
      throw new Error("User not authenticated, session is not present");
    }

    if (!firstName || !lastName || !dateOfBirth || !phoneNumber) {
      throw new Error("Account details are not all defined");
    }

    return createUser({ id, firstName, lastName, dateOfBirth, phoneNumber });
  }

  function setupAvatar() {
    if (avatar) return createAvatar({ base64: avatar });
  }

  async function setupPermissions() {
    await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
        allowSound: true,
        allowDisplayInCarPlay: true,
        allowAnnouncements: true,
      },
    });

    const { status } = await Contacts.requestPermissionsAsync();
    if (status === Contacts.PermissionStatus.GRANTED) {
      const phoneNumbers = await getLocalPhoneNumbers();
      await addFriends({ phoneNumbers });
    }
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
      <IconButton onPress={onBack} style={{ left: -8 }}>
        <BackIcon />
      </IconButton>

      <StepTitle>You're ready to go!</StepTitle>

      <Button onPress={handleSubmit}>Lets start!</Button>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StepRoot>
  );
}

const ErrorMessage = styled.Text`
  margin-top: 4px;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.error};
`;
