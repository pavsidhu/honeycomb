import React from "react";
import { Control, useController } from "react-hook-form";

import TextField, { TextFieldProps } from "../TextField";

export interface TextFieldRhfProps
  extends Omit<TextFieldProps, "value" | "onChange"> {
  name: string;
  control: Control<any, any>;
}

export default function TextFieldRhf(props: TextFieldRhfProps) {
  const { name, control, ...rest } = props;

  const { field, fieldState } = useController({ name, control });

  return (
    <TextField
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={fieldState.error?.message}
      ref={field.ref}
      {...rest}
    />
  );
}
