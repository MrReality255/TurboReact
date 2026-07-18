import { useState } from "react";
import { TInputProps } from "../utils/types";
import { InputUtils } from "../utils/input";
import { TValueHook } from "./types";

export function useValue(p: TInputProps): TValueHook {
  const [stateValue, setStateValue] = useState(p.defaultValue);
  const value = p.value ?? stateValue;

  return {
    value,
    set: function (newValue: string) {
      newValue = InputUtils.handleChange(newValue, p);
      if (p.value === undefined) {
        setStateValue(newValue);
      }
    },
  };
}
