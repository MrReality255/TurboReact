import { TFormControlWrapperProps } from "@mrreality255/turbo-react-forms";
import { TGroupBoxProps, TTextBoxProps } from "../atoms";

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

export type TControlContainerProps = {
  columns?: string;
  gap?: string | number;
};

export type TFormWindowProps = TControlContainerProps & {
  title?: string;
  children?: React.ReactNode;
};

export type TSubformProps = {
  groupBox?: TRemoveInputProps<TGroupBoxProps>;
  container?: TControlContainerProps;
};

export type TTextBoxFieldProps = TRemoveInputProps<TTextBoxProps>;

export type TControlRenderProps = {
  column?: string;
  columns?: string;
  gap?: string;
};
