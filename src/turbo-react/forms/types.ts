import { CSSProperties } from 'react'
import {
    TButtonProps,
    TCheckBoxProps,
    TDropDownProps,
    TProgressBarProps,
    TRadioGroupProps,
    TTextBoxProps,
    TToggleButtonProps,
    TViewportProps,
    TWindowProps,
} from '../atoms/types'
import { TFormContext } from '../contexts/forms'
import { TPaletteProps } from '../utils/types'

export type TDialogSubmitResult<T> = {
    result?: TDialogModalResult
    data?: T
    error?: string
}

export type TDialogSubmitFctResult<T> =
    | TDialogSubmitResult<T>
    | Promise<TDialogSubmitResult<T>>

export type TDialogContext<T, C> = {
    frm: TFormContext
    ctx: C | undefined
    close: () => void
    submit: (result: TDialogSubmitFctResult<T>) => void
}

export type TDialogModalResult = 'ok'

export type TDialogResult<T> = {
    result: TDialogModalResult

    frm: IDataContext
    data?: T
}

export type TDialogWrapperProps<T, C> = {
    ctx: C | undefined
    fct: (ctx: TDialogContext<T, C>) => TDialogProps
    initialState: IDataContext | undefined
    style?: CSSProperties

    onCancel: () => void
    onSubmit: (
        result: TDialogModalResult,
        data: T | undefined,
        frm: TFormContext
    ) => void
}

export type TDialogButtonsProps = {
    cancel?: string | boolean
    submit?: string | boolean
    onSubmit?: () => void
    onCancel?: () => void
}

export type TDialogProps = TPaletteProps & {
    header?: React.ReactNode
    footer?: React.ReactNode
    content: React.ReactNode
    buttons?: TDialogButtonsProps
    items?: TFormFieldProps[]

    caption?: string
    pos: TViewportProps
    windowProps?: TWindowProps

    onBeforeClose?: (modalResult: TDialogModalResult | null) => void
}

export type TFormValueTypeList = { mode: 'list'; items: IDataContext[] }
export type TFormValueTypeDataCtx = IDataContext & { mode: 'datacontext' }

export type TFormValueType = string | TFormValueTypeDataCtx | TFormValueTypeList

export type TFormValue = {
    value: TFormValueType
    origValue?: string | null
    isValid: boolean | undefined
}

export type TDataContextValue = TFormValue

export type TDataContentItem = string | TDataContent | TDataContent[]
export type TDataContent = { [key: string]: TDataContentItem }
export type TDataContextChange = {
    id: string
    newValue: TFormValueType
}

export interface IDataContext {
    data: Record<string, TDataContextValue>
    error?: string
    isValidated: boolean
    isDisabled: boolean
    isLoading: boolean
    isValid: boolean | undefined
    submitRef: {
        id?: string
        ref?: HTMLButtonElement
    }
}

export type TFormButtonProps = TButtonProps & {
    cancel?: boolean
}

export type TFormProps = {
    disabled?: boolean
    isValidated?: boolean
    items?: TFormFieldProps[]
    children?: React.ReactNode
    context?: TFormContext
    onAction?: (id: string, data: IDataContext, customData: unknown) => void
}

export type TFormValidator = {
    signature?: string
    onValidate?: (value: string) => boolean
    onValidateForm?: (content: TDataContent) => boolean
    onValidateList?: (content: TDataContent[]) => boolean
}

export type TFormFieldType =
    | 'checkbox'
    | 'radiogroup'
    | 'toggle'
    | 'progress'
    | 'textbox'
    | 'dropdown'
    | 'form'
    | 'template'

export type TFormFieldProps = TPaletteProps & {
    id: string
    caption?: string
    type: TFormFieldType
    autoFocus?: boolean
    disabled?: boolean

    defaultValue?: string
    isOptional?: boolean
    readOnly?: boolean
    value?: string
    validator?: TFormValidator
    wrapperFct?: (
        src: React.ReactNode,
        value: TFormValue | undefined,
        props: TFormFieldProps,
        onAction?: (id: string, customData: unknown) => void
    ) => React.ReactNode

    children?: React.ReactNode

    buttonProps?: TToggleButtonProps
    checkBoxProps?: TCheckBoxProps
    dropDownProps?: TDropDownProps
    formProps?: Omit<TFormProps, 'context' | 'children'>
    progressBarProps?: TProgressBarProps
    radioGroupProps?: TRadioGroupProps
    templateProps?: Omit<TFormTemplateProps, 'items' | 'onUpdateItems'>
    textBoxProps?: TTextBoxProps

    onAction?: (id: string, customData: unknown) => void
    onChange?: (newValue: string, id: string) => void
    onChanging?: (newValue: string, id: string) => string
}

export type TFormTemplateProps = TPaletteProps & {
    items: IDataContext[]
    itemFct: (
        ctx: IDataContext,
        deleteFct: () => void
    ) => React.ReactNode | TFormFieldProps[]
    wrapperFct?: (
        content: React.ReactNode,
        addFct: () => void
    ) => React.ReactNode

    onNewRow?: () => Record<string, TFormValue>
    onUpdateItems?: (newItems: IDataContext[]) => void
}
