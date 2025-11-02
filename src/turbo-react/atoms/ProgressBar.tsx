import { useEffect, useRef } from "react";
import usePalette from "../hooks/usePalette";
import styles from "./ProgressBar.module.css";
import { TProgressBarProps } from "./types";
import { Glass } from "./Glass";
import { useMouseValue } from "../hooks/useMouseValue";
import { TMouseState } from "../utils/types";
import { useValue } from "../hooks/useValue";

export function ProgressBar(p: TProgressBarProps) {
  const plt = usePalette(styles, p);

  const ref = useRef<HTMLDivElement | null>(null);
  const m = useMouseValue(ref, handleValue);
  const v = useValue(p);
  const value = v.value || "0";

  useEffect(() => {
    if (isNaN(Number(v.value))) {
      v.set("0");
    }
  }, [v.value]);

  return (
    <div
      ref={ref}
      className={plt.styles(styles.pb)}
      onTouchStart={
        !p.disabled && p.onChange && !p.readOnly
          ? (e) => {
              e.preventDefault();
              m.setPos({
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
                buttons: 1,
              });
            }
          : undefined
      }
      onPointerDown={
        !p.disabled && p.onChange && !p.readOnly
          ? (e) => {
              m.setPos(e);
            }
          : undefined
      }
    >
      <Glass
        visible={m.mousePos !== null}
        onMouseMove={(p) => m.setPos(p)}
        onMouseUp={(e) => m.done(e)}
      ></Glass>
      {p.caption && <label>{p.caption}</label>}
      <div className={plt.styles(styles.wrapper, styles.editable)}>
        <div
          style={{
            marginLeft: p.left !== undefined ? p.left + "%" : undefined,
            width:
              (p.left !== undefined ? parseFloat(value) - p.left : value) + "%",
          }}
        ></div>
      </div>
      {p.onChange !== undefined && !p.readOnly && (
        <div className={styles.editSpace}>
          <div
            className={plt.styles(styles.cursor, styles.editable)}
            style={{ left: "calc(" + value + "%" + " - 0.25em)" }}
          ></div>
        </div>
      )}
      {p.showValue && <div className={styles.value}>{value + " %"}</div>}
    </div>
  );

  function handleValue(_c: TMouseState, rel: TMouseState) {
    if (p.disabled) {
      return;
    }
    v.set("" + Math.round(rel.x));
  }
}
