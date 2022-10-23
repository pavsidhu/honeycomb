import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput as RNTextInput,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Stack from "../../../components/Stack";
import TextInput from "../../../components/TextField";
import { YellowThemeProvider } from "../../../theme";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";

const validCodeRegex = /^[0-9]{6}$/;

export type VerifyProps = NativeStackScreenProps<
  AuthRoutesParamList,
  AuthRoutes.Verify
>;

export default function Verify(props: VerifyProps) {
  const { navigation, route } = props;
  const { phoneNumber } = route.params;

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const codeInputRef = useRef<RNTextInput>(null);
  const theme = useTheme();

  async function handleSubmit() {
    setIsLoading(true);

    if (!validCodeRegex.test(code)) {
      setIsLoading(false);
      setErrorMessage("Your verification code should be 6 numbers");
      return;
    }

    setIsLoading(false);
    setErrorMessage(undefined);

    navigation.push(AuthRoutes.Onboarding);
  }

  useEffect(() => {
    codeInputRef.current?.focus();
  }, []);

  return (
    <YellowThemeProvider>
      <Root>
        <SafeAreaView style={{ flex: 1 }}>
          <IconButton name="back" edge="start" onPress={navigation.goBack} />

          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={24}
            style={{ flex: 1 }}
          >
            <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{ flex: 1 }}
            >
              <View style={{ flex: 1 }} />

              <Stack gap={16}>
                <View>
                  <Title>Enter your verification code:</Title>
                  <PhoneNumber>Code sent to {phoneNumber}</PhoneNumber>
                </View>

                <TextInput
                  ref={codeInputRef}
                  placeholder="000000"
                  keyboardType="number-pad"
                  onChangeText={setCode}
                  onSubmitEditing={handleSubmit}
                  errorMessage={errorMessage}
                />

                <Button
                  onPress={handleSubmit}
                  loading={isLoading}
                  style={{ backgroundColor: theme.colors.common.blue }}
                >
                  Continue
                </Button>
              </Stack>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.primary};
  flex: 1;
  padding: 0 24px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PhoneNumber = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
