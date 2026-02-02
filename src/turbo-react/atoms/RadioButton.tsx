import { useId, useRef } from 'react'

import styles from './RadioButton.module.css'
import usePalette from '../hooks/usePalette'
import { TRadioButtonProps } from './types'
import useAutoFocus from '../hooks/useAutoFocus'

export function TRadioButton(p: TRadioButtonProps) {
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
            {p.caption && (
                <label
                    className={plt.styles(styles.rb, {
                        [styles.disabled]: !!p.disabled,
                    })}
                    htmlFor={id}
                >
                    {p.caption}
                </label>
            )}
        </div>
    )
}
