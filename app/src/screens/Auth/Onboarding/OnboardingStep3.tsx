import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Control } from "react-hook-form";
import { View } from "react-native";
import styled from "styled-components/native";

import CameraIcon from "../../../../assets/images/icons/camera.svg";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import IconButton from "../../../components/IconButton";
import TouchableScale from "../../../components/TouchableScale";
import { OnboardingSchema } from "./onboardingSchema";
import { StepRoot, StepTitle } from "./shared";

export interface OnboardingStep3Props {
  control: Control<OnboardingSchema, any>;
  onBack: () => void;
  onSubmit: () => void;
}

export default function OnboardingStep3(props: OnboardingStep3Props) {
  const { control, onBack, onSubmit } = props;

  async function selectPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) setAvatar(result);
  }

  async function handleSubmit() {
    if (!avatar) {
      setErrorMessage("Please add a photo");
      return;
    }

    onSubmit({ avatar: avatar.base64 });
  }

  return (
    <StepRoot>
      <Navigation>
        <IconButton name="back" edge="start" onPress={onBack} />

        <TouchableScale onPress={onSubmit}>
          <SkipText>Skip</SkipText>
        </TouchableScale>
      </Navigation>

      <StepTitle>Add a picture of yourself</StepTitle>

      <AvatarContainer>
        <TouchableScale onPress={selectPhoto}>
          {avatar && <AvatarPreview source={{ uri: avatar.uri }} />}

          {!avatar && (
            <AvatarPreview as={View}>
              <CameraIcon width={40} height={40} />
            </AvatarPreview>
          )}
        </TouchableScale>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </AvatarContainer>

      <Button onPress={handleSubmit} disabled={!avatar}>
        Continue
      </Button>
    </StepRoot>
  );
}

const AvatarContainer = styled.View`
  margin-bottom: 24px;
`;

const Navigation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SkipText = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AvatarPreview = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;
