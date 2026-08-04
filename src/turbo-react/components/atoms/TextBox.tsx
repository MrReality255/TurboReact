import { useId, useRef } from 'react'

import styles from './TextBox.module.css'
import usePalette from '../../hooks/usePalette'
import { TTextBoxProps } from '.'
import useAutoFocus from '../../hooks/useAutoFocus'
import { DateTextBox } from './DateTextBox'

export function TTextBox(p: TTextBoxProps) {
    if (p.mode === 'date') {
        return <DateTextBox {...p} />
    }

    const plt = usePalette(styles, p)
    const id = useId()
    const ref = useRef<HTMLInputElement>(null)
    const inputRef = p.inputRef ?? ref

    useAutoFocus(p, ref)

    return (
        <div className={plt.styles('tbWrapper')}>
            {p.label && <label htmlFor={id}>{p.label}</label>}
            <div ref={p.wrapperRef} className={plt.styles(styles.inputWrapper)}>
                <div
                    className={plt.styles(styles.prefix, {
                        [styles.empty]: !p.prefix,
                    })}
                    style={{ color: p.prefixColor, ...p.prefixStyle }}
                >
                    {p.prefix}
                </div>
                <input
                    autoComplete={p.autoComplete ? 'on' : 'off'}
                    type={p.mode || 'text'}
                    ref={inputRef}
                    readOnly={p.readOnly}
                    id={id}
                    className={plt.styles(styles.tb)}
                    defaultValue={p.defaultValue}
                    disabled={p.disabled}
                    value={p.value}
                    style={{ textAlign: p.align, ...p.inputStyle }}
                    onChange={(e) => p.onChange?.(e.currentTarget.value)}
                    onClick={p.onClick ? () => p.onClick?.() : undefined}
                    onBlur={() => p.onBlur?.()}
                    onFocus={() => p.onFocus?.()}
                    onKeyDown={(event) => {
                        p.onKeyDown?.(event.key, event)
                        if (p.onEnter && event.key === 'Enter') {
                            p.onEnter()
                        }
                    }}
                ></input>
                <div
                    onClick={() => inputRef.current?.focus()}
                    className={plt.styles(styles.prefix, {
                        [styles.empty]: !p.suffix,
                    })}
                    style={{ color: p.suffixColor, ...p.suffixStyle }}
                >
                    {p.suffix}
                </div>
            </div>
        </div>
    )
}
