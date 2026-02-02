import styles from './Buttons.module.css'

import usePalette from '../hooks/usePalette'
import { TButtonProps } from './types'
import { useFormContext } from '../hooks/useFormContext'
import { useEffect, useId, useRef } from 'react'

export function TButton(p: TButtonProps) {
    const ctx = useFormContext()
    const plt = usePalette(styles, p)
    const id = useId()
    const ref = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (
            ctx &&
            !ctx.submitRef?.ref &&
            p.default &&
            !p.disabled &&
            ref?.current
        ) {
            ctx.setDefaultSubmit({
                id,
                ref: ref.current,
            })
        }

        if (
            ctx &&
            ctx.submitRef?.id == id &&
            (!p.default || p.disabled || !ref)
        ) {
            ctx.setDefaultSubmit(null)
        }
    }, [p.default, p.disabled, ref])

    return (
        <button
            ref={ref}
            onClick={p.onClick}
            disabled={p.disabled}
            className={plt.styles({
                [styles.default]: !!p.default,
                [styles.disabled]: !!p.disabled,
                [styles.down]: !!p.down,
                [styles.fill]: !!p.fill,
                [styles.btn]: !p.variant || p.variant == 'standard',
                [styles.plain]: p.variant == 'plain',
                [styles.link]: p.variant == 'link' || p.variant == 'text',
                [styles.text]: p.variant == 'text',
            })}
            style={{ width: p.width ?? getWidth(p) }}
        >
            {p.children}
        </button>
    )
}

function getWidth(p: TButtonProps) {
    switch (true) {
        case p.w0:
            return '80px'
        case p.w1:
            return '120px'
    }

    return undefined
}
