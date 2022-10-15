import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import PickerSelect, { Item } from "react-native-picker-select";
import countryPhoneInfo from "../../../assets/data/country-phone-info.json";
import { View, ViewStyle } from "react-native";
import TextField from "../TextField";
import ErrorMessage from "../ErrorMessage";

const countryPhoneCodes: Item[] = countryPhoneInfo.map((country) => ({
  label: `${country.flag} ${country.name} (${country.dial_code})`,
  value: country.dial_code,
  inputLabel: `${country.flag} ${country.dial_code}`,
  key: country.code,
}));

export interface PhoneInputProps {
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
  errorMessage?: string;
  style?: ViewStyle;
}

export default function PhoneInput(props: PhoneInputProps) {
  const { onChangeText, onSubmitEditing, errorMessage, style } = props;

  const [phoneCode, setPhoneCode] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    onChangeText(phoneCode + phoneNumber);
  }, [onChangeText, phoneCode, phoneNumber]);

  const theme = useTheme();

  function handlePhoneNumberChange(value: string) {
    if (value.startsWith("0")) {
      setPhoneNumber(value.substring(1));
    }

    setPhoneNumber(value);
  }

  return (
    <View style={style}>
      <InputContainer>
        <PickerSelect
          itemKey="GB"
          items={countryPhoneCodes}
          onValueChange={setPhoneCode}
          style={{
            inputIOSContainer: {
              padding: 18,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              backgroundColor: theme.colors.input.background,
              borderRightWidth: 1,
              borderRightColor: "rgba(0, 0, 0, 0.1)",
            },
            inputIOS: {
              fontSize: 18,
              color: theme.colors.input.value,
            },
          }}
        />

        <TextField
          placeholder="Phone Number"
          keyboardType="phone-pad"
          returnKeyType="done"
          onChangeText={handlePhoneNumberChange}
          onSubmitEditing={onSubmitEditing}
          textInputStyle={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          style={{ flex: 1 }}
        />
      </InputContainer>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </View>
  );
}

const InputContainer = styled.View`
  flex-direction: row;
  font-size: 20px;
`;
