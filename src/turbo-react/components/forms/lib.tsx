import {
  createFormHook,
  TFormControlBaseProps,
} from "@mrreality255/turbo-react-forms";
import { TFormWindowProps, TTextBoxField as TTextBoxFieldProps } from "./types";
import { TTextBox } from "../atoms";
import { TFormWindow } from "./FormWindow";

const lib = createFormHook({
  controls: {
    textBox: {
      onRender: (
        baseProps: TFormControlBaseProps,
        props: TTextBoxFieldProps,
      ) => {
        return (
          <TTextBox
            {...props}
            disabled={baseProps.disabled}
            readOnly={baseProps.readOnly}
            value={baseProps.value}
            onChange={(v) => baseProps.onValueChange(v)}
          ></TTextBox>
        );
      },
    },
  },

  onRenderMainWrapper: (content: React.ReactNode, props: TFormWindowProps) => {
    return <TFormWindow {...props}>{content}</TFormWindow>;
  },
  onRenderSubform: (content, data, props) => {
    return content;
  },
  onRenderSubformControl: (content, data, idx) => {
    return content;
  },
  onRenderTemplate: (content, state, props) => {
    return content;
  },
  onRenderTemplateRow: (content, idx, handle, stateProps, props) => {
    return content;
  },
  onRenderTemplateRowControl: (content, rowIdx, stateProps, props) => {
    return content;
  },
});

export type TDemoLibControls = ReturnType<typeof lib.newEmptyList>;
export const useForm = lib.useForm;
