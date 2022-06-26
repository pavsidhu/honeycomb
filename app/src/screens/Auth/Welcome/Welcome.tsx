import React, { useState } from "react";
import { KeyboardAvoidingView, Linking, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Constants from "expo-constants";
import Button from "../../../components/Button";
import PhoneInput from "../../../components/PhoneInput";
import { supabase } from "../../../supabase";
import LogoSvg from "../../../../assets/images/logo/logo.svg";
import AuthRoutes, { AuthRoutesParamList } from "../AuthRoutes";
import DismissKeyboard from "../../../components/DismissKeyboard";

const openTerms = () =>
  Linking.openURL(Constants.manifest.extra?.termsOfServiceUrl);
const openPrivacy = () =>
  Linking.openURL(Constants.manifest.extra?.privacyPolicyUrl);

export type WelcomeProps = NativeStackScreenProps<
  AuthRoutesParamList,
  AuthRoutes.Welcome
>;

export default function Welcome(props: WelcomeProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  async function sendCode() {
    setIsLoading(true);

    const { error } = await supabase.auth.signIn({ phone: phoneNumber });

    // Invalid phone number
    if (error?.status === 400) {
      setIsLoading(false);
      setErrorMessage("Please enter a valid phone number");
      return;
    }

    // Likely a connection issue
    if (error) {
      setIsLoading(false);
      setErrorMessage("Please check your internet connection and try again");
      return;
    }

    props.navigation.push(AuthRoutes.Verify, { phoneNumber });

    setIsLoading(false);
    setErrorMessage(undefined);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DismissKeyboard>
        <Container>
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1, width: "100%" }}
            keyboardVerticalOffset={100}
          >
            <LogoContainer>
              <Logo />
              <Subtitle>Nurture your hive...</Subtitle>
            </LogoContainer>

            <PhoneInput
              onChangeText={setPhoneNumber}
              errorMessage={errorMessage}
              style={{ marginBottom: 16 }}
            />

            <Button
              onPress={sendCode}
              loading={isLoading}
              style={{ marginBottom: 16 }}
            >
              Continue
            </Button>

            <Legal>
              By tapping "Continue", you agree to our{" "}
              <Link onPress={openTerms}>Terms of Service</Link> and{" "}
              <Link onPress={openPrivacy}>Privacy Policy</Link>
            </Legal>
          </KeyboardAvoidingView>
        </Container>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

const Container = styled.View`
  margin: 24px;
  flex: 1;
  align-items: center;
`;

const LogoContainer = styled.View`
  padding-top: 100px;
  flex: 1;
  align-items: center;
`;

const Logo = styled(LogoSvg)`
  width: 250px;
  height: 50px;
  margin-bottom: 16px;
`;

const Subtitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
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
