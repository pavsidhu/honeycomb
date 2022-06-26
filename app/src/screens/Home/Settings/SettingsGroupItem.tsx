import React, { ReactNode } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import styled from "styled-components/native";

interface SettingsGroupItemProps {
  label: string;
  onPress?: () => void;
  rightContent?: ReactNode;
  style?: ViewStyle;
}

export default function SettingsGroupItem(props: SettingsGroupItemProps) {
  const { label, onPress, rightContent, style } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress} style={style}>
      <Root>
        <Label>{label}</Label>
        {rightContent}
        {/* {onPress && <RightArrowIcon />} */}
      </Root>
    </TouchableWithoutFeedback>
  );
}

const Root = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px;
`;

const Label = styled.Text`
  flex: 1;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;
