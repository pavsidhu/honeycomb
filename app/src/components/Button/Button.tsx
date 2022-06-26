import React from "react";
import styled, { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

export interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  style?: ViewStyle;
  children: string;
}

export default function Button(props: ButtonProps) {
  const { onPress, loading, style, children } = props;

  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={(event) => !loading && onPress(event)}>
      <Container
        colors={[
          theme.colors.common.yellow.light,
          theme.colors.common.yellow.dark,
        ]}
        style={style}
      >
        <Label>{children}</Label>
        {loading && (
          <ActivityIndicator
            size="small"
            color={theme.colors.common.black}
            style={{ marginLeft: 12 }}
          />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled(LinearGradient)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 26px;
`;

const Label = styled.Text`
  line-height: 28px;
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;
