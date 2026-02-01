import { useId, useRef } from 'react';
import { TCheckBoxProps } from './types';

import styles from './CheckBox.module.css';
import usePalette from '../hooks/usePalette';
import { useValue } from '../hooks/useValue';
import useAutoFocus from '../hooks/useAutoFocus';

export function TCheckbox(p: TCheckBoxProps) {
  const id = useId();
  const plt = usePalette(styles, p);
  const v = useValue(p);
  const ref = useRef<HTMLInputElement>(null);

  useAutoFocus(p, ref);

  return (
    <div className={plt.styles(styles.cbWrapper)}>
      <input
        ref={ref}
        checked={v.value == 'true'}
        className={plt.styles(styles.cb)}
        id={id}
        type="checkbox"
        disabled={p.disabled}
        onChange={(e) => {
          v.set(e.currentTarget.checked ? 'true' : '');
        }}
      ></input>
      {p.caption && (
        <label className={plt.styles(styles.cb, { [styles.disabled]: !!p.disabled })} htmlFor={id}>
          {p.caption}
        </label>
      )}
    </div>
  );
}
