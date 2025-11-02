import styles from "./Buttons.module.css";

import usePalette from "../hooks/usePalette";
import { TButtonProps } from "./types";

export function Button(p: TButtonProps) {
  const plt = usePalette(styles, p);
  return (
    <button
      onClick={p.onClick}
      disabled={p.disabled}
      className={plt.styles({
        [styles.default]: !!p.default,
        [styles.diabled]: !!p.disabled,
        [styles.fill]: !!p.fill,
        [styles.btn]: !p.variant || p.variant == "standard",
        [styles.plain]: p.variant == "plain",
        [styles.link]: p.variant == "link" || p.variant == "text",
        [styles.text]: p.variant == "text",
      })}
      style={{ width: p.width ?? getWidth(p) }}
    >
      {p.children}
    </button>
  );
}

function getWidth(p: TButtonProps) {
  switch (true) {
    case p.w0:
      return "80px";
    case p.w1:
      return "120px";
  }

  return undefined;
}
