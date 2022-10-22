import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";
import TouchableScale from "../../components/TouchableScale";
import { lightTheme } from "../../theme";
import { SafeAreaView } from "react-native";
import Stack from "../../components/Stack";

export default function MainTabBar(props: BottomTabBarProps) {
  const { state, descriptors, navigation } = props;

  return (
    <Root>
      <SafeAreaView>
        <TabsStack flexDirection="row" gap={24}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            function onPress() {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({
                  name: route.name,
                  merge: true,
                  params: {},
                });
              }
            }

            return (
              <TouchableScale onPress={onPress} key={route.key}>
                <TabPill isFocused={isFocused}>
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color: isFocused
                      ? lightTheme.colors.common.transparentBlack
                      : lightTheme.colors.common.black,
                    size: 24,
                  })}
                  <TabLabel>{options.tabBarLabel}</TabLabel>
                </TabPill>
              </TouchableScale>
            );
          })}
        </TabsStack>
      </SafeAreaView>
    </Root>
  );
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.primary};
`;

const TabsStack = styled(Stack)`
  padding: 4px;
  justify-content: center;
`;

const TabPill = styled.View<{ isFocused: boolean }>`
  width: 96px;
  padding: 4px 0;
  border-radius: 32px;
  background: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.common.yellow : theme.colors.common.lightGrey};
  align-items: center;
`;

const TabLabel = styled.Text`
  color: ${({ theme }) => theme.colors.common.black};
  font-size: 14px;
  line-height: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
