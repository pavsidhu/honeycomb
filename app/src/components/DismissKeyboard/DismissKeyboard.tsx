import React, { PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback, ViewStyle } from "react-native";

export interface DismissKeyboardProps extends PropsWithChildren<{}> {
  style?: ViewStyle;
}

export default function DismissKeyboard(props: DismissKeyboardProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={props.style}>
      {props.children}
    </TouchableWithoutFeedback>
  );
}
