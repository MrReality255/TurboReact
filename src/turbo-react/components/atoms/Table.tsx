import { useCallback, useRef, useState } from 'react'

import styles from './Table.module.css'
import { DateTime } from 'luxon'
import usePalette from '../../hooks/usePalette'
import { useMobile } from '../../hooks/useMobile'
import {
    TPaletteProvider,
    TTableColumnProps,
    TTableProps,
    TTableValueProvider,
} from '../..'
import { TPalette } from '../types'

export function TTable<T extends object>(props: TTableProps<T>) {
    const plt = usePalette(styles, props)
    const [internalWidths, setInternalWidths] = useState<
        Record<string, number>
    >({})
    const [resizingCol, setResizingCol] = useState<string | null>(null)
    const resizeState = useRef<{
        columnId: string
        startX: number
        startWidth: number
    } | null>(null)

    const isColResizeControlled = !!props.onColumnWidth
    const columnWidths = isColResizeControlled
        ? (props.columnWidths ?? {})
        : internalWidths

    const handleResizeStart = useCallback(
        function handleResizeStart(
            columnId: string,
            startX: number,
            startWidth: number
        ) {
            resizeState.current = { columnId, startX, startWidth }
            setResizingCol(columnId)

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)

            function onMouseMove(e: MouseEvent) {
                if (!resizeState.current) return
                const diff = e.clientX - resizeState.current.startX
                const newWidth = Math.max(
                    30,
                    resizeState.current.startWidth + diff
                )

                if (isColResizeControlled) {
                    props.onColumnWidth?.(
                        resizeState.current.columnId,
                        newWidth
                    )
                } else {
                    setInternalWidths((prev) => ({
                        ...prev,
                        [resizeState.current!.columnId]: newWidth,
                    }))
                }
            }

            function onMouseUp() {
                resizeState.current = null
                setResizingCol(null)
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }
        },
        [isColResizeControlled, props.onColumnWidth]
    )

    return (
        <TPaletteProvider palette={plt.palette}>
            <table
                className={plt.styles(styles.tb, {
                    [styles.resizing]: !!resizingCol,
                })}
            >
                <thead>
                    <tr className={styles.hdr}>
                        {props.columns.map(function (p, idx) {
                            const w = columnWidths[p.id]
                            return (
                                <CellHeader
                                    key={idx}
                                    {...p}
                                    width={w ?? p.width}
                                    palette={plt.palette}
                                    resizingCol={resizingCol}
                                    onResizeStart={handleResizeStart}
                                    onClick={
                                        props.onHeaderClick
                                            ? () =>
                                                  props.onHeaderClick?.(p, idx)
                                            : undefined
                                    }
                                />
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map(function (row, idx) {
                        const key = props.rowKey ? props.rowKey(row, idx) : idx
                        const isSelected =
                            props.onGetSelected?.(row, idx) ?? false
                        return (
                            <tr
                                onClick={() => props.onRowClick?.(row, idx)}
                                key={key}
                                className={plt.styles({
                                    [styles.alt]: idx % 2 === 1,
                                    [styles.ptr]: !!props.onRowClick,
                                    [styles.selected]: isSelected,
                                })}
                            >
                                {props.columns.map(function (p, c) {
                                    const w = columnWidths[p.id]
                                    return (
                                        <td
                                            key={c}
                                            style={{
                                                textAlign: p.align,
                                                width: w ?? undefined,
                                            }}
                                        >
                                            <CellValue
                                                d={p.data}
                                                row={row}
                                                onFormat={p.onFormat}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </TPaletteProvider>
    )
}

function CellHeader<T extends object>(
    p: TTableColumnProps<T> & {
        palette: TPalette
        resizingCol: string | null
        onClick?: () => void
        onResizeStart: (
            columnId: string,
            startX: number,
            startWidth: number
        ) => void
    }
) {
    const [showIcon, setShowIcon] = useState(false)
    const isMobile = useMobile()
    const plt = usePalette(styles, p)
    const thRef = useRef<HTMLTableCellElement>(null)

    let caption = p.caption ?? p.id
    if (!caption) {
        caption = <>&nbsp;</>
    }

    const icon = p.icon ?? getSortIcon(p)
    const iconVisible = isMobile ? !!icon : showIcon

    function handleResizeMouseDown(e: React.MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
        const thEl = thRef.current
        if (!thEl) return
        const startWidth = thEl.getBoundingClientRect().width
        p.onResizeStart(p.id, e.clientX, startWidth)
    }

    return (
        <th
            ref={thRef}
            style={{
                textAlign: p.align || 'left',
                width: p.width,
                cursor: p.onClick ? 'pointer' : undefined,
            }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            onClick={() => p.onClick?.()}
        >
            {iconVisible && (
                <span
                    className={plt.styles(styles.icon, {
                        [styles.iconR]: p.align === 'right',
                        [styles.ptr]: !!p.onClick,
                    })}
                >
                    {icon}
                </span>
            )}
            {caption}
            {p.resize && (
                <span
                    className={plt.styles(styles.resizeHandle, {
                        [styles.resizeHandleActive]: p.resizingCol === p.id,
                    })}
                    onMouseDown={handleResizeMouseDown}
                />
            )}
        </th>
    )
}

function CellValue<T extends object>(p: {
    d: TTableValueProvider<T> | undefined
    row: T
    onFormat?: (value: unknown) => string | React.ReactNode
}) {
    if (typeof p.d === 'function') {
        return p.d(p.row)
    }
    if (typeof p.d === 'string') {
        const raw = (p.row as Record<string, unknown>)[p.d]
        if (p.onFormat) {
            return p.onFormat(raw)
        }
        return formatValue(raw)
    }
    return p.d
}

function formatValue(x: unknown) {
    if (
        typeof x === 'object' &&
        x !== null &&
        'toLocaleString' in x &&
        x instanceof DateTime
    ) {
        return x.toLocaleString({ dateStyle: 'medium', timeStyle: 'medium' })
    }
    return '' + x
}

function getSortIcon<T extends object>(p: TTableColumnProps<T>) {
    switch (p.sortIcon) {
        case 'down':
            return '↓'
        case 'up':
            return '↑'
    }
    return undefined
}
