import React from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import styled from "styled-components/native";

interface SettingsItemProps {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function SettingsItem(props: SettingsItemProps) {
  const { label, onPress, style } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Root style={style}>
        <Label>{label}</Label>
      </Root>
    </TouchableWithoutFeedback>
  );
}

const Root = styled.View`
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Label = styled.Text`
  flex: 1;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
