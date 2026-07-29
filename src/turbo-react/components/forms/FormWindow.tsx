import {
  useClosingEffect,
  useFormContext,
} from "@mrreality255/turbo-react-forms";
import { TButton, TGlass, TViewport, TWindow } from "../atoms";
import { TFormButtonAction, TFormButtonProps, TFormWindowProps } from "./types";
import { THorizLayout } from "../layout";
import { TControlContainer } from "./ControlContainer";

export function TFormWindow(p: TFormWindowProps) {
  const ce = useClosingEffect({
    delay: 300,
    mode: "resize",
    initialState: false,
    initialTargetState: true,
  });
  const frm = useFormContext();
  frm.hideMethodRef.current = (orig: () => void) => {
    ce.hide(orig);
  };
  const { title, children, ...containerProps } = p;

  return (
    <>
      <TGlass visible backdrop></TGlass>
      <TGlass visible>
        <TViewport centerH centerV width={"600px"} height={"480px"}>
          <TWindow
            onClose={() => {
              frm.close();
            }}
            fill
            style={ce.get()}
            caption={title}
            palette={"dialog"}
          >
            <TViewport rect={{ x: "0em", y: "1em", x2: "0em", y2: "1em" }}>
              <TControlContainer {...containerProps}>
                {children}
              </TControlContainer>
            </TViewport>
            <TViewport rect={{ x: "0em", y2: "1em", x2: "0em" }} height="2em">
              <THorizLayout
                left={
                  <>
                    <TButton w0>What?</TButton>
                  </>
                }
                alignMode="right"
              >
                {(p.buttonsRight ?? []).map((btn, idx) => (
                  <TButton
                    {...btn}
                    key={btn.id ?? idx}
                    onClick={btn.onClick ?? (() => handleButton(btn))}
                  >
                    {btn.label}
                    {btn.children}
                  </TButton>
                ))}
              </THorizLayout>
            </TViewport>
          </TWindow>
        </TViewport>
      </TGlass>
    </>
  );

  function handleButtonAction(action: TFormButtonAction | undefined) {
    if (action === undefined) {
      return;
    }

    switch (action) {
      case "cancel":
        frm.close();
        return;
      case "submit":
        frm.submit();
        return;
      default:
        switch (action.type) {
          case "submit":
            frm.submit(action.id, action.submitData);
            return;
          case "command":
            frm.triggerCommand(action);
            return;
        }
    }
  }

  function handleButton(btn: TFormButtonProps) {
    if (btn.action instanceof Promise) {
      frm.triggerLoading(
        async () => {
          return await btn.action;
        },
        (action) => {
          handleButtonAction(action);
        },
      );
      return;
    }

    handleButtonAction(btn.action);
  }
}
