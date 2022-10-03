import React, { forwardRef, ReactNode } from "react";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";

interface TextFieldProps extends TextInputProps {
  icon?: ReactNode;
  errorMessage?: string;
  textInputStyle?: ViewStyle;
  style?: ViewStyle;
}

const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const { icon, errorMessage, textInputStyle, style, ...rest } = props;

  const theme = useTheme();

  return (
    <View style={style}>
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

const Icon = styled.View`
  position: absolute;
  left: 16px;
  z-index: 1;
`;

const ErrorMessage = styled.Text`
  margin-top: 4px;
  margin-left: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.error};
`;
