import { useId, useRef } from "react";

import usePalette from "../hooks/usePalette";
import styles from "./TextBox.module.css";
import { TTextBoxProps } from "./types";
import { useValue } from "../hooks/useValue";

export function TextBox(p: TTextBoxProps) {
  const plt = usePalette(styles, p);
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const inputRef = p.inputRef ?? ref;
  const v = useValue(p);

  return (
    <>
      {p.caption && <label htmlFor={id}>{p.caption}</label>}
      <div ref={p.wrapperRef} className={plt.styles(styles.tb)}>
        <div
          className={plt.styles(styles.prefix, { [styles.empty]: !p.prefix })}
          style={{ color: p.prefixColor, ...p.prefixStyle }}
        >
          {p.prefix}
        </div>
        <input
          type={p.mode || "text"}
          ref={inputRef}
          readOnly={p.readOnly}
          id={id}
          className={plt.styles(styles.tb)}
          defaultValue={p.defaultValue}
          disabled={p.disabled}
          value={p.value}
          style={{ textAlign: p.align, ...p.inputStyle }}
          onChange={(e) => v.set(e.currentTarget.value)}
          onClick={p.onClick ? () => p.onClick?.() : undefined}
          onFocus={() => p.onFocus?.()}
        ></input>
        <div
          onClick={() => inputRef.current?.focus()}
          className={plt.styles(styles.prefix, { [styles.empty]: !p.suffix })}
          style={{ color: p.suffixColor, ...p.suffixStyle }}
        >
          {p.suffix}
        </div>
      </div>
    </>
  );
}
