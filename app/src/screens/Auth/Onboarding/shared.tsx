import { PropsWithChildren } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import Stack from "../../../components/Stack";

export function StepRoot(props: PropsWithChildren<{}>) {
  return (
    <Root>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={72}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flex: 1 }}
        >
          <Stack gap={24} style={{ flex: 1 }}>
            {props.children}
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Root>
  );
}

const Root = styled.View`
  width: ${Dimensions.get("window").width}px;
  padding: 16px 24px 0;
  flex: 1;
`;

export const StepTitle = styled.Text`
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;
