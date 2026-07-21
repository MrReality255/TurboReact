import { useClosingEffect } from "@mrreality255/turbo-react-forms";
import { TGlass, TViewport, TWindow } from "../atoms";
import { TFormWindowProps } from "./types";

export function TFormWindow(p: TFormWindowProps) {
  const ce = useClosingEffect({
    delay: 300,
    mode: "resize",
    initialState: false,
    initialTargetState: true,
  });
  return (
    <>
      <TGlass visible backdrop></TGlass>
      <TGlass visible>
        <TViewport rect={{ x: "1em", y: "1em", x2: "1em", y2: "1em" }}>
          <TWindow fill style={ce.get()} caption={p.title} palette={"dialog"}>
            <TViewport rect={{ x: "0em", y: "1em", x2: "0em", y2: "1em" }}>
              {p.children}
            </TViewport>
            <TViewport rect={{ x: "0em", y2: "1em" }} height="1em">
              Button bar
            </TViewport>
          </TWindow>
        </TViewport>
      </TGlass>
    </>
  );
}
