import { useContext, useId } from "react";

import { Form, TGroupBoxProps } from "..";

import styles from "./GroupBox.module.css";
import usePalette from "../hooks/usePalette";
import { CtxFormPanel } from "../contexts/forms";

export function GroupBox(p: TGroupBoxProps) {
  const plt = usePalette(styles, p);
  const id = useId();
  const oldCtx = useContext(CtxFormPanel);

  return (
    <div>
      <label htmlFor={id} className={plt.styles(styles.gb)}>
        {p.caption}
      </label>
      <Form context={oldCtx || undefined} disabled={p.disabled}>
        <div
          id={id}
          className={plt.styles(styles.gb)}
          style={{ width: p.width, height: p.height }}
        >
          {p.children}
        </div>
      </Form>
    </div>
  );
}
