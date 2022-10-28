import React from "react";
import { Control, useController } from "react-hook-form";

import DateTimeField, { DateTimeFieldProps } from "../DateTimeField";

export interface DateTimeFieldRhfProps
  extends Omit<DateTimeFieldProps, "value" | "onChange"> {
  name: string;
  control: Control<any, any>;
}

export default function DateTimeFieldRhf(props: DateTimeFieldRhfProps) {
  const { name, control, ...rest } = props;

  const { field, fieldState } = useController({ name, control });

  return (
    <DateTimeField
      value={field.value}
      onChange={field.onChange}
      errorMessage={fieldState.error?.message}
      ref={field.ref}
      {...rest}
    />
  );
}
