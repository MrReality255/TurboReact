import { DemoAppLayout } from "./DemoAppLayout";
import { useState } from "react";
import { LoremIpsum } from "./demo_data";

import { TRowLayout, TViewport, TWindow } from "../turbo-react";
import { useClosingEffect } from "@mrreality255/turbo-react-forms";

export function DemoPageWindows() {
  const [isVisible, setVisible] = useState(true);
  const ce = useClosingEffect({ mode: "opacity" });

  return (
    <DemoAppLayout selected="windows">
      <TViewport rect={{ x: "0em", x2: "0em", y: "0" }} height="10em">
        <TWindow caption="Window fills the viewport" fill>
          Standard window with some text. It fills the viewport completely.
        </TWindow>
      </TViewport>
      <TViewport rect={{ x: "0em", x2: "0em", y: "10.5em" }} height={"15em"}>
        <TWindow palette="blue" fill>
          <TViewport
            rect={{ x: 0, y: 0, x2: 0, y2: 0 }}
            scrollbar
            padding={{ right: "3em", top: "3.5em" }}
          >
            <TViewport rect={{ x: 0, y: 0, x2: 0, y2: 0 }} height="3em">
              <TWindow border="none" innerPadding="none" fill>
                Viewport inside the viewport
              </TWindow>
            </TViewport>
            {LoremIpsum}
          </TViewport>
        </TWindow>
      </TViewport>
      <TViewport rect={{ x: "0em", y: "26em", x2: "0em", y2: "0em" }} scrollbar>
        <TRowLayout gap={"1em"}>
          <TWindow caption="Window with auto size" palette="dark">
            It has some content. Its height is automatic.
          </TWindow>
          <TWindow
            caption="Error message"
            palette="red"
            innerPadding="space"
            border="single"
          >
            Some error occurred.
          </TWindow>
          <TWindow palette="cyan" border="none">
            Some error occurred.
          </TWindow>
          {isVisible && (
            <TWindow
              style={{ ...ce.get() }}
              caption="Some other windows"
              palette="green"
              onClose={() => handleClose()}
            >
              Put more text inside. This window can close.
            </TWindow>
          )}
          <TWindow caption="Some other window" palette="cyan">
            It looks like help from Turbo Pascal.
          </TWindow>
          <TWindow caption="Some other window" palette="mono">
            This is a colorless screen. Just like a DOS box.
          </TWindow>
        </TRowLayout>
      </TViewport>
    </DemoAppLayout>
  );

  function handleClose() {
    // setVisible(false);
    ce.hide(() => setVisible(false));
    setTimeout(() => {
      setVisible(true);
      ce.show();
    }, 3000);
  }
}
