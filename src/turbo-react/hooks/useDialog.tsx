import { TDataContent, TDialogContext, TDialogProps, TDialogResult } from "..";
import { TDialogWrapper } from "../forms/Dialog";
import { InputUtils } from "../utils/input";
import { useLayer } from "./useLayer";

export function useDialog<T = any>(
  p: (ctx: TDialogContext<T>) => TDialogProps,
) {
  const l = useLayer();

  return {
    show: (inputData?: TDataContent) => {
      return new Promise<TDialogResult<T> | null>((resolve) => {
        l.show(() => {
          return (
            <TDialogWrapper
              initialState={InputUtils.getInitialState(inputData)}
              onSubmit={(result, data, frm) => {
                resolve({
                  result,
                  data,
                  frm,
                });
              }}
              onCancel={() => {
                resolve(null);
              }}
              fct={p}
            ></TDialogWrapper>
          );
        });
      });
    },
  };
}
