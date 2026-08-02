import { useEffect, useMemo, useRef, useState } from 'react'
import { TTextBox } from './TextBox'
import {
    ICompactKeyEvent,
    TDropDownProps,
    TMenuEventHandlerRef,
    TMenuItem,
} from './types'
import { TGlass } from './Glass'
import { TViewport } from './Viewport'
import { TWindow } from './Window'
import { TMenu } from './Menu'
import { TButton } from '.'
import { createPortal } from 'react-dom'
import useAutoFocus from '../../hooks/useAutoFocus'
import usePalette from '../../hooks/usePalette'
import { MathUtils, useClosingEffect } from '@mrreality255/turbo-react-forms'
import { TPalette } from '../types'
import { TPaletteProvider } from '../providers'

type TDropDownLayoutProps = TDropDownProps & {
    dl: ReturnType<typeof useDropDown>
    popup: React.ReactNode
    children?: React.ReactNode
}

export function TDropDown(p: TDropDownProps) {
    const menu = p.items
        .map((item) => ({
            ...item,
            selected: item.id == p.value,
            id: item.id,
        }))
        .filter((item) => item.id)
    const dl = useDropDown(p)

    return (
        <TDropDownLayout
            {...p}
            dl={dl}
            popup={
                <DropDownWindow
                    filterCaption={p.filterCaption ?? 'Filter'}
                    autoFocus={true}
                    hasFilter={dl.hasFilter}
                    caption={p.label}
                    value={dl.value || ''}
                    menu={menu}
                    onClose={() => {
                        dl.setShowOpen(false)
                        dl.flagDisableFocus.disabled = true
                        dl.inputRef.current?.focus()
                        dl.flagDisableFocus.disabled = false
                    }}
                    onMatchFilter={(item, filter) => {
                        if (p.onMatchFilter) {
                            return p.onMatchFilter(item, filter)
                        }
                        filter = filter.toLowerCase()
                        return (item.id + ',' + item.label)
                            .toLowerCase()
                            .includes(filter)
                    }}
                    onSetValue={(v) => p.onChange?.(v)}
                    windowPalette={dl.windowPalette}
                ></DropDownWindow>
            }
        >
            <TTextBox
                {...p}
                mode="text"
                inputRef={dl.inputRef}
                value={getValue()}
                wrapperRef={dl.wrapperRef}
                suffix={
                    <TButton
                        variant="link"
                        disabled={p.disabled}
                        onClick={() => openPopup()}
                    >
                        ▼
                    </TButton>
                }
                suffixStyle={{ opacity: p.items.length == 0 ? 0.3 : undefined }}
                readOnly
                inputStyle={{
                    cursor: p.items.length > 0 ? 'pointer' : undefined,
                }}
                onClick={() => handleClick()}
                onFocus={() => handleFocus()}
                onKeyDown={(k, e) => handleKeyDown(k, e)}
            ></TTextBox>
        </TDropDownLayout>
    )

    function getValue() {
        return p.items.find((a) => a.id == dl.value)?.label || ''
    }

    function handleClick() {
        openPopup()
    }

    function handleFocus() {
        if (!dl.flagDisableFocus.disabled) {
            dl.setShowOpen(p.items.length > 0)
        }
    }

    function handleKeyDown(k: string, e: ICompactKeyEvent): void {
        if (k == 'ArrowUp' || k == 'ArrowDown' || k == 'F3') {
            openPopup()
            e.stopPropagation()
        }
    }

    function openPopup() {
        dl.setShowOpen(p.items.length > 0)
    }
}

function useDropDown(p: TDropDownProps) {
    const plt = usePalette(undefined, p)
    const tmpRef = useRef<HTMLDivElement>(null)
    const tmpInputRef = useRef<HTMLInputElement>(null)
    const [showOpen, setShowOpen] = useState(false)
    const windowPalette =
        p.windowPalette ?? (plt.palette == 'dialog' ? 'blue' : plt.palette)
    const hasFilter =
        p.hasFilter === undefined ? p.items.length > 8 : p.hasFilter

    const y = hasFilter ? 4 : 0
    const height = MathUtils.clamp(p.items.length * 2.3 + 2.7 + y, 3, 21)
    const viewportRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!viewportRef.current || !rect) {
            return
        }
        const viewportRect = viewportRef.current.getBoundingClientRect()
        const y = rect.y + rect.height
        const diff =
            y + viewportRect.height - (window.visualViewport?.height || 0)

        setWindowY(y - (diff > 0 ? diff : 0))
    }, [viewportRef.current, showOpen])

    const [windowY, setWindowY] = useState(0)

    const wrapperRef = p.wrapperRef ?? tmpRef
    const inputRef = p.inputRef ?? tmpInputRef
    const rect =
        wrapperRef.current && wrapperRef.current.getBoundingClientRect()
    const flagDisableFocus = useMemo(() => ({ disabled: false }), [])

    useAutoFocus(p, tmpInputRef)

    return {
        flagDisableFocus,
        hasFilter,
        height,
        palette: plt,
        rect,
        value: p.value,
        windowPalette,
        windowY,

        showOpen,
        setShowOpen,

        inputRef,
        viewportRef,
        wrapperRef,
    }
}

function getScrollbarVars(el: HTMLElement | null): React.CSSProperties {
    if (!el) return {}
    const cs = getComputedStyle(el)
    const vars = [
        '--sb-track',
        '--sb-track-border',
        '--sb-thumb',
        '--sb-thumb-border',
        '--sb-thumb-hover',
        '--sb-thumb-active',
        '--sb-button',
        '--sb-button-border',
        '--sb-button-hover',
        '--sb-corner',
    ]
    const result: Record<string, string> = {}
    for (const v of vars) {
        const val = cs.getPropertyValue(v).trim()
        if (val) result[v] = val
    }
    return result as unknown as React.CSSProperties
}

function TDropDownLayers(p: TDropDownLayoutProps) {
    const dl = p.dl
    const sbVars = getScrollbarVars(dl.wrapperRef.current)

    return createPortal(
        <div style={sbVars}>
            <TGlass visible={dl.showOpen} backdrop></TGlass>

            <TGlass
                visible={dl.showOpen}
                onClick={() => {
                    dl.setShowOpen(false)
                }}
            >
                <TViewport
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    divRef={dl.viewportRef}
                    rect={{
                        x: dl.rect?.x,
                        y: dl.windowY,
                    }}
                    width={dl.rect?.width}
                    height={`${dl.height}em`}
                >
                    {p.popup}
                </TViewport>
            </TGlass>
        </div>,
        document.body
    )
}

function TDropDownLayout(p: TDropDownLayoutProps) {
    const dl = p.dl
    return (
        <TPaletteProvider {...dl.palette}>
            <TDropDownLayers {...p}></TDropDownLayers>
            {p.children}
        </TPaletteProvider>
    )
}

function DropDownWindow(p: {
    caption?: string
    filterCaption: string
    hasFilter: boolean
    windowPalette?: TPalette
    menu: TMenuItem[]
    autoFocus: boolean
    value: string
    onClose: () => void
    onSetValue: (newValue: string) => void
    onMatchFilter: (item: TMenuItem, filterValue: string) => boolean
}) {
    const [filterValue, setFilterValue] = useState('')
    const mySelRef = useRef<HTMLAnchorElement>(null)

    const [currentValue, setCurrentValue] = useState(p.value)
    const displayMenu = p.menu
        .filter((item) => p.onMatchFilter(item, filterValue))
        .map((item) => ({
            ...item,
            selected: item.id == currentValue,
        }))

    useEffect(() => {
        if (mySelRef.current && p.autoFocus && !p.hasFilter) {
            mySelRef.current.focus()
        }
    }, [mySelRef.current, p.autoFocus, p.hasFilter])
    const [menuEventHandler] = useState<TMenuEventHandlerRef>({ current: null })
    const ce = useClosingEffect({
        mode: 'resize',
        delay: 100,
        initialState: false,
        initialTargetState: true,
    })

    function onClose(cb?: () => void) {
        ce.hide(() => {
            cb?.()
            p.onClose()
        })
    }

    return (
        <TWindow
            onHotKey={(k, e) => handleHotkey(k, e, onClose)}
            style={ce.get()}
            caption={p.caption}
            onClose={() => {
                onClose()
            }}
            fill
            palette={p.windowPalette}
        >
            {p.hasFilter && (
                <TViewport
                    rect={{ y2: '4em', y: 0, x: 0, x2: 0 }}
                    width={'100%'}
                >
                    <TTextBox
                        autoFocus
                        value={filterValue}
                        onChange={(newFilter) => setFilterValue(newFilter)}
                        label={p.filterCaption}
                        onKeyDown={(k, e) => handleFilterKey(k, e)}
                    ></TTextBox>
                </TViewport>
            )}
            <TViewport
                rect={{ y: p.hasFilter ? '4.5em' : 0, y2: 0, x: 0, x2: 0 }}
                width={'100%'}
                scrollbar
            >
                <TMenu
                    menuEventHandlerRef={menuEventHandler}
                    selectedRef={mySelRef}
                    items={displayMenu}
                    onClick={(option) => {
                        onClose(() => {
                            p.onSetValue(option)
                        })
                    }}
                    onSelect={(option) => setCurrentValue(option)}
                ></TMenu>
            </TViewport>
        </TWindow>
    )

    function handleFilterKey(k: string, e: ICompactKeyEvent): void {
        if (menuEventHandler?.current) {
            if (menuEventHandler.current(k)) {
                e.stopPropagation()
            }
        }
    }

    function handleHotkey(
        k: string,
        _e: ICompactKeyEvent,
        onClose: () => void
    ): void {
        if (!p.hasFilter && k >= '1' && k <= '9') {
            const idx = parseInt(k) - 1
            if (idx < p.menu.length) {
                p.onSetValue(p.menu[idx].id)
                onClose()
            }
        }
    }
}
