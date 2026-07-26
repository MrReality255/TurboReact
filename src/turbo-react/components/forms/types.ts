import { TFormControlWrapperProps } from "@mrreality255/turbo-react-forms";
import { TButtonProps, TGroupBoxProps, TTextBoxProps } from "../atoms";

type TRemoveInputProps<R> = Omit<
  R,
  "value" | "onChange" | "disabled" | "readOnly"
>;

export type TFormButtonAction = "submit" | "cancel";

export type TFormButtonProps = TButtonProps & {
  action?: TFormButtonAction;
  id?: string;
  label?: string;
};

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
  buttonsLeft?: TFormButtonProps[];
  buttonsRight?: TFormButtonProps[];
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
