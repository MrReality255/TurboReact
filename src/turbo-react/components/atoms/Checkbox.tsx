import { useId, useRef } from 'react'
import { TLabelInputProps } from './types'

import styles from './CheckBox.module.css'
import usePalette from '../../hooks/usePalette'
import useAutoFocus from '../../hooks/useAutoFocus'

export function TCheckbox(p: TLabelInputProps) {
    const id = useId()
    const plt = usePalette(styles, p)
    const ref = useRef<HTMLInputElement>(null)

    useAutoFocus(p, ref)

    return (
        <div className={plt.styles(styles.cbWrapper)}>
            <input
                ref={ref}
                checked={p.value !== undefined ? p.value == 'true' : undefined}
                className={plt.styles(styles.cb)}
                id={id}
                type="checkbox"
                disabled={p.disabled}
                onChange={(e) => {
                    p.onChange?.(e.currentTarget.checked ? 'true' : '')
                }}
            ></input>
            {p.label && (
                <label
                    className={plt.styles(styles.cb, {
                        [styles.disabled]: !!p.disabled,
                    })}
                    htmlFor={id}
                >
                    {p.label}
                </label>
            )}
        </div>
    )
}
