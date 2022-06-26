import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput as RNTextInput,
  View,
} from "react-native";
import Button from "../../../components/Button";
import { supabase } from "../../../supabase";
import styled from "styled-components/native";
import TextInput from "../../../components/TextInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";
import BackIcon from "../../../../assets/images/icons/back.svg";
import IconButton from "../../../components/IconButton";
import { useQueryClient } from "react-query";
import { useCurrentUser } from "../../../supabase/entities/users";

const validCodeRegex = /^[0-9]{6}$/;

export type VerifyProps = NativeStackScreenProps<
  AuthRoutesParamList,
  AuthRoutes.Verify
>;

export default function Verify(props: VerifyProps) {
  const { phoneNumber } = props.route.params;

  const { data: currentUser } = useCurrentUser();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const codeInputRef = useRef<RNTextInput>(null);

  const queryClient = useQueryClient();

  async function verifyCode() {
    setIsLoading(true);

    if (!validCodeRegex.test(code)) {
      setIsLoading(false);
      setErrorMessage("Your verification code should be 6 numbers");
      return;
    }

    const { session, error: verifyError } = await supabase.auth.verifyOTP({
      phone: phoneNumber,
      token: code,
    });

    // Invalid phone number
    if (verifyError?.status === 422) {
      setIsLoading(false);
      setErrorMessage("Please enter your verification code");
      return;
    }

    // Likely a connection issue
    if (verifyError) {
      setIsLoading(false);
      setErrorMessage(
        "Please check your verification code and internet connection"
      );
      return;
    }

    const { error: signInError } = await supabase.auth.signIn({
      refreshToken: session?.refresh_token,
    });

    // Likely a connection issue
    if (signInError) {
      setIsLoading(false);
      setErrorMessage("Please check your internet connection and try again");
      return;
    }

    setIsLoading(false);
    setErrorMessage(undefined);

    await queryClient.invalidateQueries("currentUser");

    if (!currentUser) {
      props.navigation.push(AuthRoutes.Onboarding);
    }
  }

  useEffect(() => {
    codeInputRef.current?.focus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <IconButton onPress={props.navigation.goBack} style={{ left: -8 }}>
          <BackIcon />
        </IconButton>

        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={100}
          style={{ flex: 1, width: "100%" }}
        >
          <View style={{ flex: 1 }} />

          <Title>Enter your verification code:</Title>
          <PhoneNumber>Code sent to {phoneNumber}</PhoneNumber>

          <TextInput
            ref={codeInputRef}
            placeholder="000000"
            keyboardType="number-pad"
            onChangeText={setCode}
            errorMessage={errorMessage}
            style={{ marginBottom: 16, width: "100%" }}
          />

          <Button onPress={verifyCode} loading={isLoading}>
            Continue
          </Button>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  margin: 24px;
  flex: 1;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const PhoneNumber = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
`;
