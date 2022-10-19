import React, { ReactNode } from "react";
import styled, { useTheme } from "styled-components/native";
import { ActivityIndicator, ViewStyle } from "react-native";
import TouchableScale from "../TouchableScale";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "medium" | "small";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  children: string;
  onPress: () => void;
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "medium",
    startIcon,
    endIcon,
    loading = false,
    fullWidth = false,
    style,
    children,
    onPress,
  } = props;

  const theme = useTheme();

  return (
    <TouchableScale
      onPress={() => !loading && onPress()}
      style={{ flex: fullWidth ? 1 : undefined }}
    >
      <Root variant={variant} size={size} style={style}>
        {startIcon && <StartIcon>{startIcon}</StartIcon>}

        <Label variant={variant} size={size}>
          {children}
        </Label>

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

const Root = styled.View<{ variant: ButtonVariant; size: ButtonSize }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => ({ medium: "12px 16px", small: "6px 12px" }[size])};
  border-radius: ${({ size }) => ({ medium: "24px", small: "16px" }[size])};
  background: ${({ theme, variant }) =>
    theme.colors.button[variant].background};
`;

const StartIcon = styled.View`
  margin-right: 8px;
`;

const EndIcon = styled.View`
  margin-left: 8px;
`;

const Label = styled.Text<{ variant: ButtonVariant; size: ButtonSize }>`
  line-height: ${({ size }) => ({ medium: "28px", small: "24px" }[size])};
  font-size: ${({ size }) => ({ medium: "22px", small: "18px" }[size])};
  font-family: ${({ theme }) => theme.fonts.heavy};
  color: ${({ theme }) => theme.colors.text.primary};
`;
