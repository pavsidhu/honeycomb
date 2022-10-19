import React, { ReactNode } from "react";
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const timeConfigurations = { duration: 100, easing: Easing.ease };

export interface TouchableScaleProps {
  scale?: number;
  onPress: () => void;
  onPressIn?: TouchableWithoutFeedbackProps["onPressIn"];
  onPressOut?: TouchableWithoutFeedbackProps["onPressOut"];
  style?: ViewStyle;
  children: ReactNode;
}

export default function TouchableScale(props: TouchableScaleProps) {
  const {
    scale = 0.9,
    onPress,
    onPressIn,
    onPressOut,
    style,
    children,
  } = props;

  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() =>
    withTiming(pressed.value ? scale : 1, timeConfigurations)
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={(event) => {
        pressed.value = true;
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        pressed.value = false;
        onPressOut?.(event);
      }}
    >
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
}
