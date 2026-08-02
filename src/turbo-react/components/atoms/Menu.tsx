import usePalette from '../../hooks/usePalette'
import styles from './Menu.module.css'
import { KeyboardEvent, useEffect, useRef } from 'react'
import { MathUtils } from '@mrreality255/turbo-react-forms'
import { TMenuProps } from '.'

export function TMenu(p: TMenuProps) {
    const plt = usePalette(styles, p)
    const mySelRef = useRef<HTMLAnchorElement>(null)
    const selectedItem = p.items.findIndex((item) => item.selected)

    const firstSelected = MathUtils.clamp(selectedItem, 0, p.items.length)
    const selRef = p.selectedRef ?? mySelRef

    if (p.menuEventHandlerRef) {
        p.menuEventHandlerRef.current = handleMenuEvent
    }

    useEffect(() => {
        if (selRef.current) {
            selRef.current.parentElement?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [p.items[selectedItem]?.id])

    return (
        <div className={plt.styles(styles.menu)}>
            <ul>
                {p.items.map((item, idx) => (
                    <li
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            p.onClick?.(item.id)
                        }}
                        key={item.id}
                        className={plt.styles({
                            [styles.separator]: !!item.withSeparator,
                            [styles.selected]: !!item.selected,
                            [styles.disabled]: !!item.disabled,
                        })}
                    >
                        <a
                            ref={firstSelected == idx ? selRef : undefined}
                            onKeyDown={(k) => handleKey(k)}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                p.onClick?.(item.id)
                            }}
                        >
                            <span
                                className={styles.prefix}
                                style={{
                                    color: item.prefixColor,
                                    width: item.prefixWidth,
                                }}
                            >
                                {item.prefix}
                            </span>
                            {item.label || item.id}
                            <span
                                className={styles.secondary}
                                style={{ color: item.secondaryColor }}
                            >
                                {item.secondary}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )

    function handleMenuEvent(keyCode: string): boolean {
        switch (keyCode) {
            case 'ArrowDown':
                p.onSelect?.(findNext(1, true))
                return true
            case 'End':
                p.onSelect?.(findNext(-1, false))
                return true
            case 'Home':
                p.onSelect?.(findNext(0, false))
                return true
            case 'PageDown':
                p.onSelect?.(findNext(10, true))
                return true
            case 'PageUp':
                p.onSelect?.(findNext(-10, true))
                return true
            case 'ArrowUp':
                p.onSelect?.(findNext(-1, true))
                return true
            case 'Enter':
                const selItem = p.items.find((a) => a.selected)
                if (selItem) {
                    p.onClick?.(selItem.id)
                }
        }
        return false
    }

    function handleKey(k: KeyboardEvent<HTMLAnchorElement>): void {
        if (handleMenuEvent(k.code)) {
            k.stopPropagation()
            k.preventDefault()
        }
    }

    function findNext(pos: number, isRelative: boolean) {
        return p.items[findNextIdx(pos, isRelative)].id
    }

    function findNextIdx(pos: number, isRelative: boolean) {
        const dir = pos >= 0 ? 1 : -1
        pos = MathUtils.clamp(
            isRelative
                ? firstSelected + pos
                : pos == -1
                ? p.items.length - 1
                : pos,
            0,
            p.items.length - 1
        )
        while (pos >= 0 && pos < p.items.length) {
            if (p.items[pos] && !p.items[pos].disabled) {
                return pos
            }
            pos += dir
        }
        return pos
    }
}
