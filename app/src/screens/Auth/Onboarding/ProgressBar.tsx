import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

const timeConfigurations = { duration: 250, easing: Easing.ease };

export interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const progress = useDerivedValue(
    () => withTiming(props.percent, timeConfigurations),
    [props.percent]
  );
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <Track>
      <Progress style={animatedStyle} />
    </Track>
  );
}

const Track = styled.View`
  background: ${({ theme }) => theme.colors.common.transparentWhite};
  height: 6px;
  width: 100%;
`;

const Progress = styled(Animated.View)`
  background: ${({ theme }) => theme.colors.common.black};
  height: 100%;
`;
