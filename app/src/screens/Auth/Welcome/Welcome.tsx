import React, { useState } from "react";
import { KeyboardAvoidingView, Linking, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled, { useTheme } from "styled-components/native";
import Constants from "expo-constants";
import Button from "../../../components/Button";
import PhoneInput from "../../../components/PhoneInput";
import LogoSvg from "../../../../assets/images/logo/logo.svg";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";
import DismissKeyboard from "../../../components/DismissKeyboard";
import Stack from "../../../components/Stack";
import { YellowThemeProvider } from "../../../theme";

const openTerms = () =>
  Linking.openURL(Constants.manifest?.extra?.termsOfServiceUrl);
const openPrivacy = () =>
  Linking.openURL(Constants.manifest?.extra?.privacyPolicyUrl);

export type WelcomeProps = NativeStackScreenProps<
  AuthRoutesParamList,
  AuthRoutes.Welcome
>;

export default function Welcome(props: WelcomeProps) {
  const { navigation } = props;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const theme = useTheme();

  async function handleSubmit() {
    setIsLoading(true);

    navigation.push(AuthRoutes.Verify, { phoneNumber });

    setIsLoading(false);
    setErrorMessage(undefined);
  }

  return (
    <YellowThemeProvider>
      <Root>
        <SafeAreaView style={{ flex: 1 }}>
          <DismissKeyboard>
            <KeyboardAvoidingView
              behavior="position"
              contentContainerStyle={{ flex: 1 }}
              style={{ flex: 1, width: "100%" }}
              keyboardVerticalOffset={100}
            >
              <Stack gap={16} style={{ flex: 1 }}>
                <Stack
                  gap={8}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Logo />
                  <Title>Honeycomb</Title>
                  <Subtitle>Let's find you a hive...</Subtitle>
                </Stack>

                <Stack gap={16}>
                  <PhoneInput
                    onChangeText={setPhoneNumber}
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

                  <Legal>
                    By tapping "Continue", you agree to our{" "}
                    <Link onPress={openTerms}>Terms of Service</Link> and{" "}
                    <Link onPress={openPrivacy}>Privacy Policy</Link>
                  </Legal>
                </Stack>
              </Stack>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </SafeAreaView>
      </Root>
    </YellowThemeProvider>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.primary};
  flex: 1;
  padding: 24px;
`;

const Logo = styled(LogoSvg)`
  width: 108px;
  height: 108px;
  transform: rotateZ(-15deg);
`;

const Title = styled.Text`
  font-size: 42px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Subtitle = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Legal = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Link = styled.Text`
  text-decoration: underline;
`;
