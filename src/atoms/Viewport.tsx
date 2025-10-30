import { MiscUtils } from "../utils/misc";
import { TViewportProps } from "./types";

export function Viewport(p: TViewportProps) {
  const top = ((p.center || p.centerV) && "50%") || p.rect?.y;
  const left = ((p.center || p.centerH) && "50%") || p.rect?.x;
  const transform =
    p.center || p.centerH || p.centerV
      ? MiscUtils.orUndefined(p.style?.transform, (v) => v + " ", "") +
        `translate(${p.center || p.centerH ? "-50%" : "0"},${
          p.center || p.centerV ? "-50%" : "0"
        })`
      : p.style?.transform;
  return (
    <div
      ref={p.divRef}
      style={{
        ...p.style,
        position: p.rect ? "absolute" : "relative",
        left,
        top,
        right: p.rect?.x2,
        bottom: p.rect?.y2,
        backgroundColor: p.bgColor,
        width: p.fill ? "100%" : p.width,
        height: p.fill ? "100%" : p.height,
        overflow: p.scrollbar ? "auto" : "clip",
        transform,
      }}
    >
      {p.children}
    </div>
  );
}
