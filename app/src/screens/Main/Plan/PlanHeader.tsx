import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import IconButton from "../../../components/IconButton";

export default function PlanHeader(props: NativeStackHeaderProps) {
  const { navigation } = props;

  const theme = useTheme();

  return (
    <Root>
      <BackgroundLinearGradient
        colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.4)", "transparent"]}
        locations={[0, 0.8, 1]}
      />
      <Content>
        <IconButton
          name="back"
          onPress={navigation.goBack}
          color={theme.colors.common.white}
          edge="start"
        />
      </Content>
    </Root>
  );
}

const Root = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: center;
  height: 120px;
`;

const BackgroundLinearGradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled.SafeAreaView`
  margin: 0 24px;
`;
