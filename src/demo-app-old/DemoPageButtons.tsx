import { DemoAppLayout } from "./DemoAppLayout";
import { TWindow } from "../turbo-react/atoms/Window";
import { THeading } from "../turbo-react/atoms/Heading";
import { TButton } from "../turbo-react/atoms/Buttons";
import { TColLayout } from "../turbo-react/layout/ColLayout";
import { TPalette } from "../turbo-react/utils/types";
import { useState } from "react";

const colors: TPalette[] = [
  "blue",
  "green",
  "cyan",
  "dark",
  "grey",
  "mono",
  "red",
  "dialog",
];

export function DemoPageButtons() {
  const [state, setState] = useState(false);

  return (
    <DemoAppLayout selected="buttons">
      <div style={{ marginBottom: "1em" }}>
        <THeading>Standard buttons</THeading>
        <TButton>Standard</TButton>
        <TButton default>Default</TButton>
        <TButton disabled>Disabled</TButton>
        <TButton default disabled>
          Default disabled
        </TButton>
        <TButton down={state} onClick={() => setState(!state)} w1>
          {state ? "toggled" : "toggle"}
        </TButton>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <THeading>Buttons with full fill</THeading>
        <div
          style={{
            height: "3em",
            marginTop: "1em",
            backgroundColor: "#000",
            width: "calc(100% - 1em)",
          }}
        >
          <TButton fill>Test button</TButton>
        </div>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <THeading>Buttons with predefined width</THeading>
        <div style={{ height: "3em", marginTop: "1em" }}>
          <TButton width="110px">A</TButton>
          <TButton width="110px">wide</TButton>
          <TButton width="110px">button</TButton>
        </div>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <THeading>Plain buttons</THeading>
        <TButton variant="plain">Standard</TButton>
        <TButton variant="plain" default>
          Default
        </TButton>
        <TButton variant="plain" disabled>
          Disabled
        </TButton>
        <TButton variant="plain" default disabled>
          Default disabled
        </TButton>
      </div>
      <TColLayout cols={2} lineHeight={"13em"}>
        {colors.map((c, key) => (
          <TWindow key={key} palette={c} caption={"Palette " + c}>
            <div style={{ marginBottom: "1em" }}> Sample button</div>
            <TButton>Std button</TButton>
            <TButton variant="plain">Plain button</TButton>
            <TButton variant="plain" default>
              Plain default
            </TButton>
            <TButton
              variant="plain"
              down={state}
              onClick={() => setState(!state)}
            >
              Toggle
            </TButton>
            <div style={{ marginBottom: "1em", marginTop: "1em" }}>
              Text buttons
            </div>
            <TColLayout cols={4}>
              <TButton variant="link">Link button</TButton>
              <TButton variant="link" disabled>
                Link button disabled
              </TButton>
              <TButton variant="text">Text button</TButton>
              <TButton variant="text" disabled>
                Text button disabled
              </TButton>
            </TColLayout>
          </TWindow>
        ))}
      </TColLayout>
    </DemoAppLayout>
  );
}
