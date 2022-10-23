import { ElementType, ReactNode } from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

import { LightThemeProvider } from "../../theme";

export interface SheetProps {
  as?: ElementType;
  style?: ViewStyle;
  children: ReactNode;
}

export default function Sheet(props: SheetProps) {
  const { as, style, children } = props;

  return (
    <LightThemeProvider>
      <Root as={as} style={style}>
        {children}
      </Root>
    </LightThemeProvider>
  );
}

const Root = styled.ScrollView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  border-top-left-radius: 56px;
  border-top-right-radius: 56px;
`;
