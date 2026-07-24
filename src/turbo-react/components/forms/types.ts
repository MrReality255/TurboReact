import { TFormControlWrapperProps } from "@mrreality255/turbo-react-forms";
import { TTextBoxProps } from "../atoms";

type TRemoveInputProps<R> = Omit<
  R,
  "value" | "onChange" | "disabled" | "readOnly"
>;

export type TControlWrapperProps = {
  ctrlProps: TFormControlWrapperProps;
  renderProps: TControlRenderProps | undefined;
  visible: boolean;

  children?: React.ReactNode;

  onHint: (tr: string | undefined) => string | undefined;
};

export type TFormWindowProps = {
  title?: string;
  children?: React.ReactNode;
  columns?: string;
  gap?: string | number;
};

export type TTextBoxField = TRemoveInputProps<TTextBoxProps>;

export type TControlRenderProps = {
  column?: string;
  columns?: string;
  gap?: string;
};
