import { createContext } from "react";
import { TDialogModalResult } from "../forms/types";

export interface IDialogControl {
  cancel: () => void;
  submit: (result: TDialogModalResult, data?: unknown) => void;
}

export const CtxDialogControl = createContext<IDialogControl | null>(null);
