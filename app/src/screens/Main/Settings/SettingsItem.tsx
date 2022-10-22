import React from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

const timeConfigurations = { duration: 100, easing: Easing.ease };

interface SettingsItemProps {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function SettingsItem(props: SettingsItemProps) {
  const { label, onPress, style } = props;

  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() =>
    withTiming(pressed.value ? 0.9 : 1, timeConfigurations)
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => (pressed.value = false)}
    >
      <Root style={style}>
        <Label style={animatedStyle}>{label}</Label>
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

const Label = styled(Animated.Text)`
  flex: 1;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
