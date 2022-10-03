import React, { ReactNode } from "react";
import styled, { useTheme } from "styled-components/native";
import { ActivityIndicator, ViewStyle } from "react-native";
import TouchableScale from "../TouchableScale";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps {
  variant?: ButtonVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  style?: ViewStyle;
  children: string;
  onPress: () => void;
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    startIcon,
    endIcon,
    loading,
    style,
    children,
    onPress,
  } = props;

  const theme = useTheme();

  return (
    <TouchableScale onPress={() => !loading && onPress()}>
      <Root variant={variant} style={style}>
        {startIcon && <StartIcon>{startIcon}</StartIcon>}

        <Label variant={variant}>{children}</Label>

        {loading && (
          <ActivityIndicator
            size="small"
            color={theme.colors.common.black}
            style={{ marginLeft: 12 }}
          />
        )}

        {endIcon && <EndIcon>{endIcon}</EndIcon>}
      </Root>
    </TouchableScale>
  );
}

const Root = styled.View<{ variant: ButtonVariant }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 24px;
  background: ${({ theme, variant }) =>
    theme.colors.button[variant].background};
`;

const StartIcon = styled.View`
  margin-right: 8px;
`;

const EndIcon = styled.View`
  margin-left: 8px;
`;

const Label = styled.Text<{ variant: ButtonVariant }>`
  line-height: 28px;
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme, variant }) => theme.colors.text.primary};
`;
