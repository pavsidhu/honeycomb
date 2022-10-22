import React, { forwardRef, ReactNode } from "react";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";
import ErrorMessage from "../ErrorMessage";

interface TextFieldProps extends TextInputProps {
  label?: ReactNode;
  icon?: ReactNode;
  errorMessage?: string;
  textInputStyle?: ViewStyle;
  style?: ViewStyle;
}

const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const { label, icon, errorMessage, textInputStyle, style, ...rest } = props;

  const theme = useTheme();

  return (
    <View style={style}>
      {label && <Label>{label}</Label>}

      <TextFieldContainer>
        <Icon>{icon}</Icon>

        <CustomTextInput
          ref={ref}
          placeholderTextColor={theme.colors.text.secondary}
          hasIcon={!!icon}
          style={textInputStyle}
          {...(rest as any)}
        />
      </TextFieldContainer>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </View>
  );
});

export default TextField;

const TextFieldContainer = styled.View`
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
  border-radius: 8px;
`;

const Label = styled.Text`
  margin-bottom: 4px;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Icon = styled.View`
  position: absolute;
  left: 16px;
  z-index: 1;
`;
