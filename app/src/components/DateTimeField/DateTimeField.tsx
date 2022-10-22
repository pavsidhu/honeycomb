import { format as formatDate } from "date-fns";
import React, { ReactNode, useState } from "react";
import { TouchableWithoutFeedback, ViewStyle } from "react-native";
import styled from "styled-components/native";
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";

interface DateTimeFieldProps
  extends Omit<
    ReactNativeModalDateTimePickerProps,
    "onChange" | "onConfirm" | "onCancel" | "style"
  > {
  value: Date;
  onChange: (date?: Date) => void;
  label?: ReactNode;
  errorMessage?: string;
  style?: ViewStyle;
}

export default function DateTimeField(props: DateTimeFieldProps) {
  const { value, onChange, label, errorMessage, style, ...rest } = props;

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <Root style={style}>
      {label && <Label>{label}</Label>}

      <TouchableWithoutFeedback onPress={() => setIsPickerOpen(true)}>
        <Container>
          <Value>{formatDate(value, "do MMMM h:maaa")}</Value>
        </Container>
      </TouchableWithoutFeedback>

      <DateTimePickerModal
        isVisible={isPickerOpen}
        mode="datetime"
        themeVariant="light"
        onConfirm={(date) => {
          onChange(date);
          setIsPickerOpen(false);
        }}
        onCancel={() => setIsPickerOpen(false)}
        {...rest}
      />
    </Root>
  );
}

const Root = styled.View`
  position: relative;
`;

const Label = styled.Text`
  margin-bottom: 4px;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
