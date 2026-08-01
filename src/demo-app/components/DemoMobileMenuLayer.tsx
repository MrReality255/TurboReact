import { useClosingEffect, useLayer } from "@mrreality255/turbo-react-forms";
import { TDemoAppProps } from "../DemoAppLayout";
import { TGlass, TWindow } from "../../turbo-react";
import { DemoMainMenu } from "./DemoMainMenu";

export function DemoMobileMenuLayer({
  onNavigate,
  ...p
}: TDemoAppProps & {
  onNavigate: (url: string) => void;
}) {
  const l = useLayer();
  const ce = useClosingEffect({
    mode: "resize",
    delay: 100,
    initialState: false,
    initialTargetState: true,
  });

  return (
    <>
      <TGlass backdrop visible />
      <TGlass visible onClick={() => hide()}>
        <TWindow
          style={ce.get()}
          palette="grey"
          innerPadding="none"
          onClose={() => {
            hide();
          }}
        >
          <DemoMainMenu
            {...p}
            onNavigate={(url) => {
              onNavigate(url);
              hide();
            }}
          />
        </TWindow>
      </TGlass>
    </>
  );

  function hide() {
    ce.hide(() => l.hide());
  }
}
