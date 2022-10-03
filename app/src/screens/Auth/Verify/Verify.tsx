import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput as RNTextInput,
  View,
} from "react-native";
import Button from "../../../components/Button";
import styled from "styled-components/native";
import TextInput from "../../../components/TextField";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";
import IconButton from "../../../components/IconButton";
import { YellowThemeProvider } from "../../../theme";
import Stack from "../../../components/Stack";

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

  async function verifyCode() {
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
            behavior="position"
            contentContainerStyle={{ flex: 1 }}
            keyboardVerticalOffset={100}
            style={{ flex: 1, width: "100%" }}
          >
            <ScrollView contentContainerStyle={{ flex: 1 }}>
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
                  errorMessage={errorMessage}
                  style={{ marginBottom: 16, width: "100%" }}
                />

                <Button
                  onPress={verifyCode}
                  loading={isLoading}
                  style={{ backgroundColor: "#7EAEF4" }}
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
