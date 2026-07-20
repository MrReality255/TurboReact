import { useCallback, useRef } from "react";
import styles from "./ProgressBar.module.css";
import { TProgressBarProps } from "./types";
import usePalette from "../../hooks/usePalette";

export function TProgressBar(p: TProgressBarProps) {
  const plt = usePalette(styles, p);

  const ref = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const value = p.value || "0";
  const interactive = !p.readOnly && !!p.onChange;

  const computeValue = useCallback(
    (clientX: number) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      p.onChange?.(String(pct));
    },
    [p.onChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive) return;
      dragging.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      computeValue(e.clientX);
    },
    [interactive, computeValue],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      computeValue(e.clientX);
    },
    [computeValue],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    },
    [],
  );

  return (
    <div ref={ref} className={plt.styles(styles.pb)}>
      {p.label && <label>{p.label}</label>}
      <div
        ref={wrapperRef}
        tabIndex={0}
        className={plt.styles(
          styles.wrapper,
          ...(interactive ? [styles.editable] : []),
        )}
        onPointerDown={interactive ? handlePointerDown : undefined}
        onPointerMove={interactive ? handlePointerMove : undefined}
        onPointerUp={interactive ? handlePointerUp : undefined}
        style={{ touchAction: interactive ? "none" : undefined }}
      >
        <div
          style={{
            marginLeft: p.left !== undefined ? p.left + "%" : undefined,
            width:
              (p.left !== undefined ? parseFloat(value) - p.left : value) + "%",
          }}
        ></div>
      </div>
      {p.showValue && <div className={styles.value}>{value + " %"}</div>}
    </div>
  );
}
