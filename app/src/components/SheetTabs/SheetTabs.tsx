import React, { useState } from "react";
import { LayoutChangeEvent, TouchableWithoutFeedback } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

const timeConfigurations = { duration: 250, easing: Easing.elastic(0.5) };

export interface SheetTabsProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTabId: string;
  onActiveTabIdChange: (id: string) => void;
}

export default function SheetTabs(props: SheetTabsProps) {
  const { tabs, activeTabId, onActiveTabIdChange } = props;

  const [pointerTargets, setPointerTargets] = useState<{
    [id: string]: {
      x: number;
      y: number;
    };
  }>({});
  const activePointerTarget = pointerTargets[activeTabId];

  const pointerX = useDerivedValue(
    () => (activePointerTarget ? activePointerTarget.x : 0),
    [activePointerTarget?.x]
  );
  const animatedStyle = useAnimatedStyle(() => ({
    left: withTiming(pointerX.value, timeConfigurations),
    top: activePointerTarget?.y || 0,
  }));

  function handleTabOnLayout(id: string, event: LayoutChangeEvent) {
    const { x, y, width, height } = event.nativeEvent.layout;

    setPointerTargets((it) => ({
      ...it,
      [id]: {
        x: x + width / 2 - POINTER_WIDTH / 2,
        y: y + height / 2 + POINTER_HEIGHT + 8,
      },
    }));
  }

  return (
    <TabList>
      {tabs.map((it) => (
        <TouchableWithoutFeedback
          onPress={() => onActiveTabIdChange(it.id)}
          onLayout={(event) => handleTabOnLayout(it.id, event)}
          key={it.id}
        >
          <TabItem>
            <TabItemLabel active={activeTabId === it.id}>
              {it.label}
            </TabItemLabel>
          </TabItem>
        </TouchableWithoutFeedback>
      ))}

      {activePointerTarget && <Pointer style={animatedStyle} />}
    </TabList>
  );
}

const TabList = styled.View`
  width: 100%;
  padding: 8px 48px 16px;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
`;

const TabItem = styled.View`
  align-items: center;
`;

const TabItemLabel = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.fonts.heavy};
  font-size: 18px;
  margin-bottom: 4px;
`;

const POINTER_WIDTH = 8;
const POINTER_HEIGHT = 6;

const Pointer = styled(Animated.View)`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-left-width: ${POINTER_WIDTH / 2}px;
  border-right-width: ${POINTER_WIDTH / 2}px;
  border-bottom-width: ${POINTER_HEIGHT}px;
  border-left-color: transparent;
  border-right-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
`;
