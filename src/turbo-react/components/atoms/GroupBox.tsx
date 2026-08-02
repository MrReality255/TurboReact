import { useId } from "react";

import styles from "./GroupBox.module.css";
import { TGroupBoxProps } from "./types";
import usePalette from "../../hooks/usePalette";

export function TGroupBox(p: TGroupBoxProps) {
  const plt = usePalette(styles, p);
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className={plt.styles(styles.gb)}>
        {p.label}
      </label>
      <div
        id={id}
        className={plt.styles(styles.gb)}
        style={{ width: p.width, height: p.height }}
      >
        {p.children}
      </div>
    </div>
  );
}
