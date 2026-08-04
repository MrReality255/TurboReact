import { useId, useRef, useState, useCallback, useEffect } from 'react'

import styles from './TextBox.module.css'
import usePalette from '../../hooks/usePalette'
import { TTextBoxProps } from '.'
import useAutoFocus from '../../hooks/useAutoFocus'

// --- Segment types ---

type Segment = 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second'

type FormatToken =
    { type: Segment; length: number } | { type: 'sep'; value: string }

const DEFAULT_FORMAT = 'dd.mm.yyyy'

// --- Format parsing ---

function parseFormat(format: string): FormatToken[] {
    const tokens: FormatToken[] = []
    let i = 0
    while (i < format.length) {
        if (format.startsWith('yyyy', i)) {
            tokens.push({ type: 'year', length: 4 })
            i += 4
        } else if (format.startsWith('mm', i)) {
            tokens.push({ type: 'month', length: 2 })
            i += 2
        } else if (format.startsWith('dd', i)) {
            tokens.push({ type: 'day', length: 2 })
            i += 2
        } else if (format.startsWith('hh', i)) {
            tokens.push({ type: 'hour', length: 2 })
            i += 2
        } else if (format.startsWith('ii', i)) {
            tokens.push({ type: 'minute', length: 2 })
            i += 2
        } else if (format.startsWith('ss', i)) {
            tokens.push({ type: 'second', length: 2 })
            i += 2
        } else {
            // separator character(s)
            let sep = ''
            while (
                i < format.length &&
                !format.startsWith('yyyy', i) &&
                !format.startsWith('mm', i) &&
                !format.startsWith('dd', i) &&
                !format.startsWith('hh', i) &&
                !format.startsWith('ii', i) &&
                !format.startsWith('ss', i)
            ) {
                sep += format[i]
                i++
            }
            tokens.push({ type: 'sep', value: sep })
        }
    }
    return tokens
}

function getSegmentOrder(tokens: FormatToken[]): Segment[] {
    return tokens
        .filter((t): t is { type: Segment; length: number } => t.type !== 'sep')
        .map((t) => t.type)
}

function getSegmentPositions(
    tokens: FormatToken[]
): Partial<Record<Segment, { start: number; end: number }>> {
    const positions: Partial<Record<Segment, { start: number; end: number }>> =
        {}
    let offset = 0
    for (const t of tokens) {
        if (t.type === 'sep') {
            offset += t.value.length
        } else {
            const len = t.length
            positions[t.type] = { start: offset, end: offset + len }
            offset += len
        }
    }
    return positions
}

function getSeparatorChars(tokens: FormatToken[]): string[] {
    const chars: string[] = []
    for (const t of tokens) {
        if (t.type === 'sep') {
            for (const c of t.value) {
                if (!chars.includes(c)) chars.push(c)
            }
        }
    }
    return chars
}

// --- Value types ---

interface DateTimeValues {
    day: number
    month: number
    year: number
    hour: number
    minute: number
    second: number
}

function defaultValues(): DateTimeValues {
    const now = new Date()
    return {
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds(),
    }
}

// --- Formatting ---

function padNum(n: number, len: number): string {
    return String(n).padStart(len, '0')
}

function formatValue(values: DateTimeValues, tokens: FormatToken[]): string {
    return tokens
        .map((t) => {
            if (t.type === 'sep') return t.value
            if (t.type === 'day') return padNum(values.day, 2)
            if (t.type === 'month') return padNum(values.month, 2)
            if (t.type === 'year') return padNum(values.year, 4)
            if (t.type === 'hour') return padNum(values.hour, 2)
            if (t.type === 'minute') return padNum(values.minute, 2)
            return padNum(values.second, 2)
        })
        .join('')
}

// --- Parsing ---

function parseFromFormatted(
    value: string,
    tokens: FormatToken[]
): DateTimeValues {
    const positions = getSegmentPositions(tokens)
    const result = defaultValues()

    const readSeg = (seg: Segment, fallback: number): number => {
        const pos = positions[seg]
        if (!pos) return fallback
        const str = value.slice(pos.start, pos.end)
        return parseInt(str, 10) || fallback
    }

    result.day = readSeg('day', result.day)
    result.month = readSeg('month', result.month)
    result.year = readSeg('year', result.year)
    result.hour = readSeg('hour', result.hour)
    result.minute = readSeg('minute', result.minute)
    result.second = readSeg('second', result.second)

    return result
}

function parseValue(
    value: string | undefined,
    tokens: FormatToken[]
): DateTimeValues {
    if (!value) return defaultValues()

    const expectedLen = tokens.reduce(
        (acc, t) =>
            acc +
            (t.type === 'sep' ? t.value.length : t.type === 'year' ? 4 : 2),
        0
    )
    if (value.length === expectedLen) {
        return parseFromFormatted(value, tokens)
    }

    // Fallback: split by non-digit chars and map by segment order
    const parts = value.split(/\D+/)
    const order = getSegmentOrder(tokens)
    const result = defaultValues()
    parts.forEach((part, i) => {
        if (i < order.length) {
            result[order[i]] = parseInt(part, 10) || 0
        }
    })
    return result
}

// --- Clamping helpers ---

function daysInMonth(month: number, year: number): number {
    if (month < 1 || month > 12) return 31
    return new Date(year, month, 0).getDate()
}

function wrapValue(val: number, min: number, max: number): number {
    if (val < min) return max
    if (val > max) return min
    return val
}

function adjustSegmentValue(
    segment: Segment,
    delta: number,
    values: DateTimeValues
): DateTimeValues {
    const v = { ...values }

    switch (segment) {
        case 'day': {
            const max = daysInMonth(v.month, v.year)
            v.day = wrapValue(v.day + delta, 1, max)
            break
        }
        case 'month':
            v.month = wrapValue(v.month + delta, 1, 12)
            v.day = Math.min(v.day, daysInMonth(v.month, v.year))
            break
        case 'year':
            v.year = wrapValue(v.year + delta, 1, 9999)
            v.day = Math.min(v.day, daysInMonth(v.month, v.year))
            break
        case 'hour':
            v.hour = wrapValue(v.hour + delta, 0, 23)
            break
        case 'minute':
            v.minute = wrapValue(v.minute + delta, 0, 59)
            break
        case 'second':
            v.second = wrapValue(v.second + delta, 0, 59)
            break
    }

    return v
}

// --- Segment digit config ---

interface SegmentDigitConfig {
    maxDigits: number
    autoAdvanceThreshold: number | null
    clamp: (num: number, values: DateTimeValues) => number
    timeout: number
}

function getSegmentConfig(segment: Segment): SegmentDigitConfig {
    switch (segment) {
        case 'day':
            return {
                maxDigits: 2,
                autoAdvanceThreshold: 3,
                clamp: (num, v) =>
                    Math.max(1, Math.min(num, daysInMonth(v.month, v.year))),
                timeout: 800,
            }
        case 'month':
            return {
                maxDigits: 2,
                autoAdvanceThreshold: 1,
                clamp: (num) => Math.max(1, Math.min(num, 12)),
                timeout: 800,
            }
        case 'year':
            return {
                maxDigits: 4,
                autoAdvanceThreshold: null,
                clamp: (num) => Math.max(1, Math.min(num, 9999)),
                timeout: 1200,
            }
        case 'hour':
            return {
                maxDigits: 2,
                autoAdvanceThreshold: 2,
                clamp: (num) => Math.max(0, Math.min(num, 23)),
                timeout: 800,
            }
        case 'minute':
        case 'second':
            return {
                maxDigits: 2,
                autoAdvanceThreshold: 5,
                clamp: (num) => Math.max(0, Math.min(num, 59)),
                timeout: 800,
            }
    }
}

// --- DateTextBox component ---

export function DateTextBox(p: TTextBoxProps) {
    const plt = usePalette(styles, p)
    const id = useId()
    const ref = useRef<HTMLInputElement>(null)
    const inputRef = p.inputRef ?? ref

    useAutoFocus(p, ref)

    const tokens = parseFormat(p.dateFormat ?? DEFAULT_FORMAT)
    const segmentOrder = getSegmentOrder(tokens)
    const positions = getSegmentPositions(tokens)
    const separatorChars = getSeparatorChars(tokens)

    const parsed = parseValue(p.value ?? p.defaultValue, tokens)
    const [values, setValues] = useState<DateTimeValues>(parsed)
    const [segment, setSegment] = useState<Segment>(segmentOrder[0])
    const [digitBuffer, setDigitBuffer] = useState('')
    const bufferTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Sync from external value prop
    useEffect(() => {
        if (p.value !== undefined) {
            setValues(parseValue(p.value, tokens))
        }
    }, [p.value])

    const emitChange = useCallback(
        (v: DateTimeValues) => {
            p.onChange?.(formatValue(v, tokens))
        },
        [p.onChange, p.dateFormat]
    )

    const nextSegment = useCallback((): Segment | null => {
        const idx = segmentOrder.indexOf(segment)
        return idx < segmentOrder.length - 1 ? segmentOrder[idx + 1] : null
    }, [segment, segmentOrder])

    const prevSegment = useCallback((): Segment | null => {
        const idx = segmentOrder.indexOf(segment)
        return idx > 0 ? segmentOrder[idx - 1] : null
    }, [segment, segmentOrder])

    const handleAdjust = useCallback(
        (delta: number) => {
            const newValues = adjustSegmentValue(segment, delta, values)
            setValues(newValues)
            emitChange(newValues)
        },
        [values, segment, emitChange]
    )

    const handleDigit = useCallback(
        (digit: string) => {
            const newBuffer = digitBuffer + digit
            const config = getSegmentConfig(segment)

            if (bufferTimeoutRef.current) {
                clearTimeout(bufferTimeoutRef.current)
            }

            const advance = () => {
                const next = nextSegment()
                if (next) setSegment(next)
            }

            const num = parseInt(newBuffer, 10)

            // Reached max digits for this segment
            if (newBuffer.length >= config.maxDigits) {
                const clamped = config.clamp(num, values)
                const newValues = { ...values, [segment]: clamped }
                // Clamp day if month/year changed
                if (segment === 'month' || segment === 'year') {
                    newValues.day = Math.min(
                        newValues.day,
                        daysInMonth(newValues.month, newValues.year)
                    )
                }
                setValues(newValues)
                setDigitBuffer('')
                advance()
                emitChange(newValues)
                return
            }

            // Auto-advance on first digit if it exceeds threshold
            if (
                config.autoAdvanceThreshold !== null &&
                newBuffer.length === 1 &&
                num > config.autoAdvanceThreshold
            ) {
                const clamped = config.clamp(num, values)
                const newValues = { ...values, [segment]: clamped }
                if (segment === 'month' || segment === 'year') {
                    newValues.day = Math.min(
                        newValues.day,
                        daysInMonth(newValues.month, newValues.year)
                    )
                }
                setValues(newValues)
                setDigitBuffer('')
                advance()
                emitChange(newValues)
                return
            }

            // Buffer the digit and set a timeout to commit
            setDigitBuffer(newBuffer)
            bufferTimeoutRef.current = setTimeout(() => {
                const finalNum = parseInt(newBuffer, 10)
                const clamped = config.clamp(finalNum, values)
                const newValues = { ...values, [segment]: clamped }
                if (segment === 'month' || segment === 'year') {
                    newValues.day = Math.min(
                        newValues.day,
                        daysInMonth(newValues.month, newValues.year)
                    )
                }
                setValues(newValues)
                setDigitBuffer('')
                advance()
                emitChange(newValues)
            }, config.timeout)
        },
        [digitBuffer, values, segment, emitChange, nextSegment]
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        p.onKeyDown?.(e.key, e)

        if (p.onEnter && e.key === 'Enter') {
            p.onEnter()
            return
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            handleAdjust(1)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            handleAdjust(-1)
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            setDigitBuffer('')
            const prev = prevSegment()
            if (prev) setSegment(prev)
        } else if (e.key === 'ArrowRight' || separatorChars.includes(e.key)) {
            e.preventDefault()
            setDigitBuffer('')
            const next = nextSegment()
            if (next) setSegment(next)
        } else if (e.key === 'Tab') {
            const isLast =
                segmentOrder.indexOf(segment) === segmentOrder.length - 1
            const isFirst = segmentOrder.indexOf(segment) === 0
            if (!e.shiftKey && !isLast) {
                e.preventDefault()
                setDigitBuffer('')
                const next = nextSegment()
                if (next) setSegment(next)
            } else if (e.shiftKey && !isFirst) {
                e.preventDefault()
                setDigitBuffer('')
                const prev = prevSegment()
                if (prev) setSegment(prev)
            }
        } else if (e.key >= '0' && e.key <= '9') {
            e.preventDefault()
            handleDigit(e.key)
        } else if (e.key === 'Backspace') {
            e.preventDefault()
            if (digitBuffer.length > 0) {
                setDigitBuffer(digitBuffer.slice(0, -1))
            }
        } else {
            if (e.key.length === 1) {
                e.preventDefault()
            }
        }
    }

    const handleClick = () => {
        const el = inputRef.current
        if (el) {
            const pos = el.selectionStart ?? 0
            let found: Segment = segmentOrder[0]
            for (const seg of segmentOrder) {
                const segPos = positions[seg]
                if (!segPos) continue
                if (pos >= segPos.start && pos <= segPos.end) {
                    found = seg
                    break
                }
                if (pos < segPos.start) break
                found = seg
            }
            setSegment(found)
        }
        p.onClick?.()
    }

    // Manage selection to highlight active segment
    useEffect(() => {
        const el = inputRef.current
        if (!el || document.activeElement !== el) return

        const pos = positions[segment]
        if (!pos) return

        requestAnimationFrame(() => {
            el.setSelectionRange(pos.start, pos.end)
        })
    }, [segment, values])

    const displayValue = formatValue(values, tokens)

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
                    autoComplete="off"
                    type="text"
                    ref={inputRef}
                    readOnly={p.readOnly}
                    id={id}
                    className={plt.styles(styles.tb)}
                    disabled={p.disabled}
                    value={displayValue}
                    style={{ textAlign: p.align ?? 'center', ...p.inputStyle }}
                    onChange={() => {}}
                    onClick={handleClick}
                    onBlur={() => {
                        setDigitBuffer('')
                        p.onBlur?.()
                    }}
                    onFocus={() => {
                        p.onFocus?.()
                    }}
                    onKeyDown={handleKeyDown}
                />
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
