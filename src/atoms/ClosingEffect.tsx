import { TClosingEffectProps } from "./types";
import { useClosingEffect } from "../hooks/useClosingEffect";

export function ClosingEffect(p: TClosingEffectProps) {
  const ce = useClosingEffect(p.effect, p.animationDuration);

  const style = ce.get();

  if (p.emptyMode) {
    return p.onRender(() => ce.close(p.onClose), style);
  }
  return (
    <div style={style}>{p.onRender(() => ce.close(p.onClose), style)}</div>
  );
}
