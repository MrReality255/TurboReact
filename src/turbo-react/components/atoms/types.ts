import { CSSProperties, RefObject } from 'react'
import {
    TControlProps,
    TPalette,
    TPaletteProps,
    TRect,
    TViewProps,
} from '../types'

export interface ICompactKeyEvent {
    stopPropagation: () => void
}
export type TButtonVariant = 'standard' | 'plain' | 'link' | 'text'
export type TTextBoxMode = 'text' | 'password' | 'number' | 'email'
export type TWindowInnerPadding = 'none' | 'space'

export type TAlignType = 'left' | 'center' | 'right'
export type TButtonProps = TControlProps & {
    children?: React.ReactNode

    default?: boolean
    down?: boolean
    fill?: boolean
    variant?: TButtonVariant
    width?: string | number
    w0?: boolean
    w1?: boolean
    onClick?: () => void
}

export type TDropDownProps = Omit<TTextBoxProps, 'mode'> & {
    hasFilter?: boolean
    filterCaption?: string
    items: TMenuItem[]
    inputRef?: RefObject<HTMLInputElement>
    wrapperRef?: RefObject<HTMLDivElement>
    windowPalette?: TPalette

    onMatchFilter?: (item: TMenuItem, filter: string) => boolean
}

export type TGlassEvent = {
    clientX: number
    clientY: number
    buttons: number
}

export type TGlassProps = {
    backdrop?: boolean
    children?: React.ReactNode
    visible: boolean
    onClick?: () => void
    onMouseMove?: (e: TGlassEvent) => void
    onMouseUp?: (e: TGlassEvent) => void
}

export type TGroupBoxProps = TViewProps & {
    label?: string
    disabled?: boolean
    height?: string | number
    width?: string | number
}

export type THeadingProps = TViewProps

export type TInputProps = TControlProps & {
    defaultValue?: string
    readOnly?: boolean
    value?: string
    onChange?: (newValue: string) => void
}

export type TLabelInputProps = TInputProps & {
    label?: string
}

export type TMenuItemProps = {
    id: string
    disabled?: boolean
    label?: string
    prefix?: string
    prefixColor?: string
    prefixWidth?: string | number
    secondary?: string
    secondaryColor?: string
    selected?: boolean
    withSeparator?: boolean
}

export type TMenuItem = TMenuItemProps

export type TMenuEventHandlerRef = {
    current: null | ((keyCode: string) => boolean)
}

export type TMenuProps = TPaletteProps & {
    selectedRef?: RefObject<HTMLAnchorElement | null>
    menuEventHandlerRef?: TMenuEventHandlerRef

    items: TMenuItemProps[]
    onClick?: (id: string) => void
    onSelect?: (id: string) => void
}

export type TNameValueProps = TViewProps & {
    name?: string | React.ReactNode
    action?: string | React.ReactNode
    actionWidth?: string | number
    labelWidth?: string | number
    items?: TNameValueItemProps[]
}

export type TNameValueItemProps = {
    name: string | React.ReactNode
    value: string | React.ReactNode
    action?: string | React.ReactNode
}

export type TNotificationProps = TViewProps & {
    style?: CSSProperties
    timeout?: number
}

export type TProgressBarProps = TInputProps & {
    blockWidth?: number
    label?: string
    left?: number
    readOnly?: boolean
    showValue?: boolean
}

export type TTableColumnProps<T extends object> = {
    id: string
    align?: TAlignType
    caption?: string | React.ReactNode
    data?: TTableValueProvider<T>
    onFormat?: (value: unknown) => string | React.ReactNode
    icon?: string
    resize?: boolean
    sortIcon?: 'up' | 'down'
    width?: string | number
}

export type TTableProps<T extends object> = TPaletteProps & {
    data: T[]
    columns: TTableColumnProps<T>[]
    columnWidths?: Record<string, number>
    rowKey?: (row: T, idx: number) => string | number

    onColumnWidth?: (columnId: string, width: number) => void
    onGetSelected?: (row: T, idx: number) => boolean
    onHeaderClick?: (col: TTableColumnProps<T>, idx: number) => void
    onRowClick?: (value: T, idx: number) => void
}

export type TTableValueProvider<T extends object> =
    | (keyof T & string)
    | React.ReactNode
    | ((item: T) => string | React.ReactNode)

export type TTextBoxProps = TInputProps & {
    align?: TAlignType
    autoComplete?: boolean
    label?: string
    mode?: TTextBoxMode
    prefix?: string
    prefixColor?: string
    prefixStyle?: CSSProperties
    suffix?: React.ReactNode
    suffixColor?: string
    suffixStyle?: CSSProperties
    inputStyle?: CSSProperties

    wrapperRef?: RefObject<HTMLDivElement | null>
    inputRef?: RefObject<HTMLInputElement | null>

    onBlur?: () => void
    onFocus?: () => void
    onClick?: () => void
    onKeyDown?: (key: string, event: ICompactKeyEvent) => void
    onEnter?: () => void
}

export type TViewportProps = {
    center?: boolean
    centerV?: boolean
    centerH?: boolean
    fill?: boolean
    children?: React.ReactNode
    width?: string | number
    height?: string | number
    rect?: TRect
    bgColor?: string
    scrollbar?: boolean
    divRef?: RefObject<HTMLDivElement | null>
    style?: CSSProperties
    padding?: {
        left?: string | number
        right?: string | number
        top?: string | number
        bottom?: string | number
    }
    onClick?: (e: { stopPropagation: () => void }) => void
}

export type TWindowProps = TPaletteProps & {
    children?: React.ReactNode

    fill?: boolean
    noShadow?: boolean
    border?: 'std' | 'single' | 'none'
    outerPadding?: boolean
    innerPadding?: TWindowInnerPadding
    caption?: string
    space?: boolean
    style?: CSSProperties

    onClick?: () => void
    onClose?: () => void
    onHotKey?: (hotkey: string, event: KeyboardEvent) => void
}
