import React, { forwardRef, ReactNode } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
} from "react-native";
import styled, { useTheme } from "styled-components/native";

interface TextInputProps extends RNTextInputProps {
  icon?: ReactNode;
  errorMessage?: string;
  textInputStyle?: ViewStyle;
  style?: ViewStyle;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const { icon, errorMessage, textInputStyle, style, ...rest } = props;

  const theme = useTheme();

  return (
    <View style={style}>
      <TextInputContainer>
        <Icon>{icon}</Icon>

        <CustomTextInput
          ref={ref}
          placeholderTextColor={theme.colors.text.secondary}
          hasIcon={!!icon}
          style={textInputStyle}
          {...(rest as any)}
        />
      </TextInputContainer>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </View>
  );
});

export default TextInput;

const TextInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CustomTextInput = styled.TextInput<{ hasIcon: boolean }>`
  width: 100%;
  padding: 16px;
  padding-left: ${({ hasIcon }) => (hasIcon ? "48px" : "16px")};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.input.value};
  background: ${({ theme }) => theme.colors.input.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium.px};
`;

const Icon = styled.View`
  position: absolute;
  left: 16px;
  z-index: 1;
`;

const ErrorMessage = styled.Text`
  margin-top: 4px;
  margin-left: 16px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.error};
`;
