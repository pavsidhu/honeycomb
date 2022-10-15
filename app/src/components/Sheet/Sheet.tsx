import { ReactNode } from "react";
import styled from "styled-components/native";
import { LightThemeProvider } from "../../theme";

export interface SheetProps {
  children: ReactNode;
}

export default function Sheet(props: SheetProps) {
  return (
    <LightThemeProvider>
      <Root>{props.children}</Root>
    </LightThemeProvider>
  );
}

const Root = styled.ScrollView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  border-top-left-radius: 56px;
  border-top-right-radius: 56px;
`;
