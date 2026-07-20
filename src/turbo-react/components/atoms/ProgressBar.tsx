import { useRef } from "react";
import styles from "./ProgressBar.module.css";
import { TProgressBarProps } from "./types";
import usePalette from "../../hooks/usePalette";

export function TProgressBar(p: TProgressBarProps) {
  const plt = usePalette(styles, p);

  const ref = useRef<HTMLDivElement | null>(null);
  const value = p.value || "0";

  return (
    <div ref={ref} className={plt.styles(styles.pb)}>
      {p.label && <label>{p.label}</label>}
      <div tabIndex={0} className={plt.styles(styles.wrapper, styles.editable)}>
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
