import { DemoAppLayout } from "./DemoAppLayout";
import { Window } from "../turbo-react/atoms/Window";
import { Viewport } from "../turbo-react/atoms/Viewport";
import { useState } from "react";
import { ClosingEffect, RowLayout } from "../turbo-react";
import { LoremIpsum } from "./demo_data";

export function DemoPageWindows() {
  const [isVisible, setVisible] = useState(true);

  return (
    <DemoAppLayout selected="windows">
      <Viewport rect={{ x: "0em", x2: "0em", y: "0" }} height="10em">
        <Window caption="Window fills the viewport" fill>
          Standard window with some text. It fills the viewport completely.
        </Window>
      </Viewport>
      <Viewport rect={{ x: "0em", x2: "0em", y: "10.5em" }} height={"15em"}>
        <Window palette="blue" fill>
          <Viewport
            rect={{ x: 0, y: 0, x2: 0, y2: 0 }}
            scrollbar
            padding={{ right: "3em", top:'3.5em' }}
          >
            <Viewport rect={{ x: 0, y: 0, x2: 0, y2: 0 }} height="3em">
              <Window border="none" innerPadding="none" fill>Viewport inside the viewport</Window>
            </Viewport>
            {LoremIpsum}
          </Viewport>
        </Window>
      </Viewport>
      <Viewport rect={{ x: "0em", y: "26em", x2: "0em", y2: "0em" }} scrollbar>
        <RowLayout gap={"1em"}>
          <Window caption="Window with auto size" palette="dark">
            It has some content. Its height is automatic.
          </Window>
          <Window
            caption="Error message"
            palette="red"
            innerPadding="space"
            border="single"
          >
            Some error occurred.
          </Window>
          <Window palette="cyan" border="none">
            Some error occurred.
          </Window>
          {isVisible && (
            <ClosingEffect
              onClose={() => handleClose()}
              onRender={(closeFct) => {
                return (
                  <Window
                    caption="Some other windows"
                    palette="green"
                    onClose={() => closeFct()}
                  >
                    Put more text inside. This window can close.
                  </Window>
                );
              }}
            ></ClosingEffect>
          )}
          <Window caption="Some other window" palette="cyan">
            It looks like help from Turbo Pascal.
          </Window>
          <Window caption="Some other window" palette="mono">
            This is a colorless screen. Just like a DOS box.
          </Window>
        </RowLayout>
      </Viewport>
    </DemoAppLayout>
  );

  function handleClose() {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  }
}
