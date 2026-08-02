import { useId, useRef } from 'react'

import styles from './RadioButton.module.css'
import { TLabelInputProps } from './types'
import usePalette from '../../hooks/usePalette'
import useAutoFocus from '../../hooks/useAutoFocus'

export function TRadioButton(p: TLabelInputProps) {
    const id = useId()
    const plt = usePalette(styles, p)
    const ref = useRef<HTMLInputElement>(null)
    useAutoFocus(p, ref)

    return (
        <div className={plt.styles(styles.rbWrapper)}>
            <input
                ref={ref}
                className={styles.rb}
                id={id}
                type="radio"
                disabled={p.disabled}
                checked={p.value !== undefined ? p.value == 'true' : undefined}
                onChange={(x) => {
                    p.onChange?.(x.target.checked ? 'true' : '')
                }}
            ></input>
            {p.label && (
                <label
                    className={plt.styles(styles.rb, {
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
