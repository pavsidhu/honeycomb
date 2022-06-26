import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const StepRoot = styled.View`
  width: ${Dimensions.get("window").width}px;
  padding: 24px;
  flex: 1;
`;

export const StepTitle = styled.Text`
  margin-top: 8px;
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.heavy};
`;
