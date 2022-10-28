import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { YellowThemeProvider } from "../../../theme";
import trpc from "../../../trpc";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";
import OnboardingStep4 from "./OnboardingStep4";
import ProgressBar from "./ProgressBar";
import { onboardingSchema, OnboardingSchema } from "./onboardingSchema";

export type OnboardingProps = NativeStackScreenProps<
  AuthRoutesParamList,
  AuthRoutes.Onboarding
>;

export default function Onboarding(props: OnboardingProps) {
  const { mutateAsync: createUser } = trpc.createUser.useMutation();

  const { control, handleSubmit, trigger, clearErrors } =
    useForm<OnboardingSchema>({
      resolver: zodResolver(onboardingSchema),
    });

  async function onSubmit(values: OnboardingSchema) {
    try {
      return await createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        phoneNumber: values.phoneNumber,
      });
    } catch {
      // TODO: handle case
    }
  }

  const pages = [
    <OnboardingStep1
      key={1}
      control={control}
      onSubmit={async () => {
        const valid = await trigger();
        if (valid) {
          clearErrors();
          scrollToIndex(1);
        }
      }}
    />,
    <OnboardingStep2
      key={2}
      control={control}
      onBack={() => scrollToIndex(0)}
      onSubmit={async () => {
        const valid = await trigger();
        if (valid) {
          clearErrors();
          scrollToIndex(2);
        }
      }}
    />,
    <OnboardingStep3
      key={3}
      control={control}
      onBack={() => scrollToIndex(1)}
      onSubmit={async () => {
        await handleSubmit(onSubmit)();
        scrollToIndex(3);
      }}
    />,
    <OnboardingStep4 key={4} />,
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
          horizontal
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
