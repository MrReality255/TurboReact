import { useClosingEffect, useLayer } from "@mrreality255/turbo-react-forms";
import usePalette from "../../hooks/usePalette";
import { TNotificationProps } from "./types";
import { TViewport } from "./Viewport";
import { TWindow } from "./Window";
import { useEffect } from "react";
import { TPaletteProvider } from "../providers";

export function TNotification(p: TNotificationProps) {
  const plt = usePalette(undefined, p);
  const cl = useClosingEffect({
    mode: "fall",
    delay: 200,
    initialState: false,
    initialTargetState: true,
  });
  const l = useLayer();

  const timeout = p.timeout ?? 2000;

  useEffect(() => {
    let isActive = true;
    if (timeout > 0) {
      setTimeout(() => {
        if (isActive) {
          cl.hide(() => l.hide());
        }
      }, timeout);
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <TPaletteProvider palette={plt.palette}>
      <div
        style={{
          width: "fit-content",
          position: "relative",
          left: "50%",
          color: "red",
          transform: "translate(-50%, 0)",
        }}
      >
        <TViewport
          style={{
            ...cl.get(),
            minHeight: "1em",
            display: "inline-block",
            ...p.style,
          }}
        >
          <div style={{ marginBottom: "1em" }}>
            <TWindow
              border="none"
              onClick={() => {
                cl.hide(() => l.hide());
              }}
            >
              <div style={{ textAlign: "center" }}>{p.children}</div>
            </TWindow>
          </div>
        </TViewport>
      </div>
    </TPaletteProvider>
  );
}
