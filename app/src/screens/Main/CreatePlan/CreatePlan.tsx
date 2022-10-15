import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

export default function CreatePlan(props: NativeStackHeaderProps) {
  return <Root></Root>;
}

const Root = styled.View`
  background: ${({ theme }) => theme.colors.background.primary};
`;
