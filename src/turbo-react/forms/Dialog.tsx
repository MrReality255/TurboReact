import { TFormContext } from "@/contexts/forms";
import { TForm, TFormButton } from ".";
import {
  TClosingEffectProvider,
  TGlass,
  TErrorPanel,
  TLoadingBar,
  TViewport,
  TWindow,
} from "../atoms";
import { CtxDialogControl } from "../contexts/dialog_control";
import { CtxLayerManager } from "../contexts/layer";
import { useNewFormContext, useLayer } from "../hooks";
import usePalette from "../hooks/usePalette";
import { THorizLayout, TVertLayout } from "../layout";
import {
  TDialogWrapperProps,
  TDialogModalResult,
  TDialogSubmitFctResult,
  TDialogSubmitResult,
  TDialogButtonsProps,
} from "./types";

export function TDialog<T, C>(props: TDialogWrapperProps<T, C>) {
  const frm = useNewFormContext(props.initialState);

  const closer = {
    beforeClose: (_mr: TDialogModalResult | null) => {},
  };

  const ctx = {
    ctx: props.ctx,
    frm,
    close: () => closeDialog(),
    submit: (result: TDialogSubmitFctResult<T>) => submitHandler(result),
  };

  const p = props.fct(ctx);
  closer.beforeClose = p.onBeforeClose ?? closer.beforeClose;

  const plt = usePalette(undefined, { palette: p.palette ?? "dialog" });

  return (
    <>
      <TGlass backdrop visible></TGlass>
      <TGlass visible>
        <CtxDialogControl.Provider
          value={{
            cancel: () => closeDialog(),
            submit: (result, data) =>
              submitDialog(result, data as T | undefined),
          }}
        >
          <TViewport
            {...p.pos}
            center
            style={{
              ...props.style,
            }}
          >
            <TWindow
              palette={plt.palette}
              fill
              caption={p.caption}
              onClose={() => closeDialog()}
              {...p.windowProps}
            >
              <div
                style={{
                  height: "100%",
                  position: "relative",
                }}
              >
                <TVertLayout
                  header={
                    <>
                      {frm.error && <TErrorPanel>{frm.error}</TErrorPanel>}
                      {p.header && <TForm context={frm}>{p.header}</TForm>}
                    </>
                  }
                  footer={
                    <>
                      {p.footer ? (
                        <TForm context={frm}>{p.footer}</TForm>
                      ) : p.buttons ? (
                        <TDialogButtons
                          {...p.buttons}
                          ctx={frm}
                        ></TDialogButtons>
                      ) : undefined}
                    </>
                  }
                >
                  {frm.isLoading && (
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "block",
                          width: "100%",
                          height: "1.5em",
                        }}
                      >
                        <TLoadingBar></TLoadingBar>
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      opacity: frm.isLoading ? 0.1 : 1,
                      height: "100%",
                    }}
                  >
                    <TForm context={frm} items={p.items}>
                      {p.content}
                    </TForm>
                  </div>
                </TVertLayout>
              </div>
            </TWindow>
          </TViewport>
        </CtxDialogControl.Provider>
      </TGlass>
    </>
  );

  function submitHandler(resultObj: TDialogSubmitFctResult<T>) {
    if (resultObj instanceof Promise) {
      submitHandlerPromise(resultObj);
      return;
    }

    if (resultObj.result) {
      submitDialog(resultObj.result, resultObj.data);
      return;
    }

    if (resultObj.error) {
      frm.setError(resultObj.error);
    }
  }

  function submitHandlerPromise(result: Promise<TDialogSubmitResult<T>>) {
    frm.setLoading(true);
    frm.setError(undefined);
    result.then((r) => {
      frm.setLoading(false);
      submitHandler(r);
    });
  }

  function submitDialog(result: TDialogModalResult, data?: T) {
    closer.beforeClose(result);
    props.onSubmit?.(result, data, frm);
  }

  function closeDialog() {
    closer.beforeClose(null);
    props.onCancel();
  }
}

export function TDialogWrapper<T, C>(p: TDialogWrapperProps<T, C>) {
  const l = useLayer();

  return (
    <TClosingEffectProvider
      animationDuration={100}
      onClose={() => l.hide()}
      emptyMode
      onRender={(onClose, props) => {
        return (
          <CtxLayerManager.Provider value={{ ...l, hide: () => onClose() }}>
            <TDialog<T, C>
              ctx={p.ctx}
              fct={p.fct}
              initialState={p.initialState}
              onSubmit={(result, data, frm) => {
                p.onSubmit(result, data, frm);
                onClose();
              }}
              onCancel={() => {
                onClose();
                p.onCancel();
              }}
              style={props}
            ></TDialog>
          </CtxLayerManager.Provider>
        );
      }}
    ></TClosingEffectProvider>
  );
}

function TDialogButtons(p: TDialogButtonsProps & { ctx: TFormContext }) {
  if (!p.ctx) {
    return undefined;
  }

  return (
    <TForm context={p.ctx}>
      <THorizLayout alignMode="right">
        {(p.submit || p.onSubmit) && (
          <TFormButton
            w0
            default
            disabled={!p.ctx.isValid}
            onClick={() => {
              p.ctx.validate();
              p.onSubmit?.();
            }}
          >
            {typeof p.submit === "string" ? p.submit : "OK"}
          </TFormButton>
        )}
        {(p.cancel || p.onCancel) && (
          <TFormButton w0 cancel onClick={p.onCancel}>
            {typeof p.cancel === "string" ? p.cancel : "Cancel"}
          </TFormButton>
        )}
      </THorizLayout>
    </TForm>
  );
}
