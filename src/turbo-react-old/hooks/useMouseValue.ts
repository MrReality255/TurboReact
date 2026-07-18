import { useMemo, useState } from "react";
import { MathUtils } from "../utils/math";
import { TMouseState } from "../utils/types";

export function useMouseValue(
  ref: {
    current: null | { getBoundingClientRect(): DOMRect };
  },
  handler?: (
    clientPos: TMouseState,
    relPos: TMouseState,
    absPos: TMouseState,
  ) => void,
) {
  const [mousePos, setMousePos] = useState<null | TMouseState>(null);

  const rect = ref.current && ref.current.getBoundingClientRect();
  const clientPos = useMemo(() => {
    return (
      (rect &&
        mousePos && {
          ...mousePos,
          x: MathUtils.clamp(Math.round(mousePos.x - rect.x), 0, rect.width),
          y: MathUtils.clamp(Math.round(mousePos.y - rect.y), 0, rect.height),
        }) ||
      null
    );
  }, [rect?.x, rect?.y, rect?.width, rect?.height, mousePos?.x, mousePos?.y]);

  const relPos = useMemo(() => {
    return (
      (clientPos &&
        rect && {
          ...clientPos,
          x: Math.round((10000 * clientPos?.x) / rect?.width) / 100,
          y: Math.round((10000 * clientPos?.y) / rect?.height) / 100,
        }) ||
      null
    );
  }, [clientPos?.x, clientPos?.y, rect?.width, rect?.height]);

  return {
    rect,
    mousePos,
    relPos: clientPos,
    setPos: (e: { clientX: number; clientY: number; buttons: number }) => {
      setMousePos({ x: e.clientX, y: e.clientY, buttons: e.buttons });
      relPos && clientPos && mousePos && handler?.(clientPos, relPos, mousePos);
    },
    done: (_e: { clientX: number; clientY: number; buttons: number }) => {
      setMousePos(null);
      relPos && clientPos && mousePos && handler?.(clientPos, relPos, mousePos);
    },
  };
}
