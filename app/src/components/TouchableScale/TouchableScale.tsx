import React, { ReactNode } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const timeConfigurations = { duration: 100, easing: Easing.ease };

export interface TouchableScaleProps {
  scale?: number;
  onPress: () => void;
  style?: ViewStyle;
  children: ReactNode;
}

export default function TouchableScale(props: TouchableScaleProps) {
  const { scale = 0.9, onPress, style, children } = props;

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
      onPressIn={() => {
        pressed.value = true;
      }}
      onPressOut={() => {
        pressed.value = false;
      }}
      style={style}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
}
