import {
  useClosingEffect,
  useFormContext,
} from "@mrreality255/turbo-react-forms";
import { TButton, TGlass, TViewport, TWindow } from "../atoms";
import { TFormWindowProps } from "./types";
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
                <TButton default w0>
                  OK
                </TButton>
                <TButton w0>Cancel</TButton>
              </THorizLayout>
            </TViewport>
          </TWindow>
        </TViewport>
      </TGlass>
    </>
  );
}
