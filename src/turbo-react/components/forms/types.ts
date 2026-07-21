import { TTextBoxProps } from "../atoms";

type TRemoveInputProps<R> = Omit<
  R,
  "value" | "onChange" | "disabled" | "readOnly"
>;

export type TFormWindowProps = {
  title?: string;
  children?: React.ReactNode;
};

export type TTextBoxField = TRemoveInputProps<TTextBoxProps>;
