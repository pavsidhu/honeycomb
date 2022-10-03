import React, { useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";
import ProgressBar from "./ProgressBar";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";
import OnboardingStep4 from "./OnboardingStep4";
import { YellowThemeProvider } from "../../../theme";

export interface OnboardingFormValues {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export type OnboardingProps = NativeStackScreenProps<
  AuthRoutesParamList,
  AuthRoutes.Onboarding
>;

export default function Onboarding(props: OnboardingProps) {
  const [formValues, setFormValues] = useState<OnboardingFormValues>({
    dateOfBirth: new Date().toISOString(),
  });
  const pages = [
    <OnboardingStep1
      key={1}
      onSubmit={(nextFormValues) => {
        setFormValues((value) => ({ ...value, nextFormValues }));
        scrollToIndex(1);
      }}
    />,
    <OnboardingStep2
      key={2}
      onBack={() => scrollToIndex(0)}
      onSubmit={(nextFormValues) => {
        setFormValues((value) => ({ ...value, nextFormValues }));
        scrollToIndex(2);
      }}
    />,
    <OnboardingStep3
      key={3}
      onBack={() => scrollToIndex(1)}
      onSubmit={(nextFormValues) => {
        setFormValues((value) => ({ ...value, nextFormValues }));
        scrollToIndex(3);
      }}
    />,
    <OnboardingStep4
      key={4}
      formValues={formValues}
      onBack={() => scrollToIndex(2)}
    />,
  ];

  const [progress, setProgress] = useState(100 / pages.length);

  const flatListRef = useRef<FlatList>(null);

  function scrollToIndex(index: number) {
    setProgress(((index + 1) / pages.length) * 100);
    flatListRef.current?.scrollToIndex({ index });
  }

  return (
    <YellowThemeProvider>
      <Root>
        <ProgressBar percent={progress} />

        <FlatList
          ref={flatListRef}
          horizontal={true}
          scrollEnabled={false}
          data={pages}
          renderItem={(info) => info.item}
          keyboardShouldPersistTaps="always"
        />
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;
