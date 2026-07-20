import { useState } from "react";
import { PalettePanel } from "./components/PalettePanel";
import { DemoAppLayout } from "./DemoAppLayout";
import {
  TCheckbox,
  TColLayout,
  TGroupBox,
  THeading,
  TProgressBar,
  TRadioButton,
  TRowLayout,
} from "../turbo-react";
import { MathUtils } from "@mrreality255/turbo-react-forms";

export function DemoPageOtherControls() {
  const [prgValue, setPrgValue] = useState("25");
  return (
    <DemoAppLayout selected="inputs">
      <PalettePanel lineHeight="26em">
        <p>This is some normal text</p>
        <TColLayout cols={2} gap={10}>
          <TGroupBox label="Checkboxes" height="3em">
            <div>
              <TCheckbox label="Option 1"></TCheckbox>
            </div>
            <div>
              <TCheckbox disabled label="Option 2"></TCheckbox>
            </div>
          </TGroupBox>
          <TGroupBox label="Radio buttons" height="3em">
            <div>
              <TRadioButton label="Option 1"></TRadioButton>
            </div>
            <div>
              <TRadioButton disabled label="Option 2"></TRadioButton>
            </div>
          </TGroupBox>
        </TColLayout>
        <THeading>Progress bar</THeading>
        <TProgressBar
          value={prgValue}
          onChange={(v) => setPrgValue(v)}
          label="Progress"
          showValue
        ></TProgressBar>
        <TProgressBar
          value={prgValue}
          label="Progress - second value"
        ></TProgressBar>
        <TProgressBar
          left={MathUtils.clamp(parseFloat(prgValue || "0") - 10, 0, 100)}
          value={prgValue}
          label="Progress - second value"
        ></TProgressBar>
      </PalettePanel>
    </DemoAppLayout>
  );
}
