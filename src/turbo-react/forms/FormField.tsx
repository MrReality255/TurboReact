import { useContext, useEffect, useMemo } from 'react'

import { TTextBox } from '../atoms/TextBox'
import {
    TFormFieldProps,
    TFormFieldType,
    TFormValue,
    TFormValueType,
} from './types'
import { CtxFormPanel, TFormContext } from '../contexts/forms'
import { TDropDown } from '../atoms/DropDown'
import styles from './FormField.module.css'
import usePalette from '../hooks/usePalette'
import { TPaletteProvider } from '../contexts/palette'
import { TForm } from './Form'
import { InputUtils } from '../utils/input'
import { TFormTemplate } from './FormTemplate'
import { TCheckbox } from '../atoms/Checkbox'
import { TProgressBar } from '../atoms/ProgressBar'
import { TButton, TGroupBox, TRadioButton } from '../atoms'
import { THorizLayout, TRowLayout } from '../layout'

const alwaysValid = new Set<TFormFieldType>(['checkbox', 'progress', 'toggle'])

export function TFormField(p: TFormFieldProps) {
    const ctx = useContext(CtxFormPanel)
    const item = ctx?.data[p.id] as TFormValue | undefined
    const plt = usePalette(styles, p)

    const disabled = ctx?.isDisabled || p.disabled || false
    const isValid = ctx?.data[p.id]?.isValid

    useEffect(() => {
        const initValue = createInitValue(p)
        ctx?.initializeField(
            p.id,
            initValue,
            validateInitValue(p) ?? validate(p, initValue)
        )
    }, [])

    const defaultWrapperFct = (
        src: React.ReactNode,
        _value: TFormValue | undefined,
        _props: TFormFieldProps,
        _onAction?: (id: string, data: unknown) => void
    ) => {
        return src
    }

    const wrapperFct = p.wrapperFct ?? defaultWrapperFct

    return (
        <TPaletteProvider palette={plt.palette}>
            <div>
                <div className={plt.styles(styles.field)}>
                    <div>
                        {wrapperFct(
                            <FormFieldControl
                                {...p}
                                ctx={ctx}
                                item={item}
                                isValid={isValid ?? true}
                                disabled={disabled}
                            ></FormFieldControl>,
                            item,
                            p,
                            p.onAction
                                ? (id, customData) => {
                                      p.onAction?.(id, customData)
                                  }
                                : undefined
                        )}
                    </div>
                </div>
                {ctx?.isValidated && !item?.isValid && (
                    <div className={plt.styles(styles.err)}>x</div>
                )}
            </div>
        </TPaletteProvider>
    )
}

function FormFieldControl(
    p: TFormFieldProps & {
        isValid: boolean
        item: TFormValue | undefined
        ctx: TFormContext | null
    }
) {
    const strValue =
        (typeof p.item?.value === 'object' ? undefined : p.item?.value) || ''
    const ctxValue =
        typeof p.item?.value === 'object' && p.item.value.mode == 'datacontext'
            ? p.item.value
            : undefined

    const templateItemsValue =
        typeof p.item?.value === 'object' && p.item.value.mode == 'list'
            ? p.item.value.items
            : []

    const formContext = useMemo(() => {
        if (p.type != 'form') {
            return undefined
        }
        const ctx = ctxValue ?? InputUtils.newDataContext()

        return InputUtils.newFormContext(ctx, (fct) => {
            const newCtx = fct(ctx)
            update({ ...newCtx, mode: 'datacontext' }, false, undefined)
        })
    }, [p.item?.value, p.type])

    useEffect(() => {
        if (p.item === undefined) {
            const newValue = createEmptyValue(p)
            const isNewValid = validate(p, newValue)
            update(newValue, false, isNewValid)
        }
    }, [p.item])

    useEffect(() => {
        if (p.item) {
            const newValid = validate(p, p.item.value)
            if (newValid !== p.item.isValid) {
                update(p.item.value, false, newValid)
            }
        }
    }, [p.isOptional, p.disabled, p.validator?.signature])

    const state = !!(p.value ?? strValue)

    const value = p.value ?? strValue

    switch (p.type) {
        case 'radiogroup':
            return (
                <TGroupBox caption={p.caption}>
                    <TRowLayout gap="0.5em">
                        {p.radioGroupProps?.items.map((item) => {
                            return (
                                <div key={item.id}>
                                    <TRadioButton
                                        caption={item.caption}
                                        value={value == item.id ? 'true' : ''}
                                        onChange={() => {
                                            update(item.id, true, true)
                                        }}
                                    ></TRadioButton>
                                </div>
                            )
                        })}
                    </TRowLayout>
                </TGroupBox>
            )
        case 'toggle':
            return (
                <THorizLayout>
                    <TButton
                        autoFocus={p.autoFocus}
                        disabled={p.disabled}
                        variant="plain"
                        down={!!value}
                        onClick={() => {
                            update(state ? '' : 'true', true, true)
                        }}
                        {...p.buttonProps}
                    >
                        {state
                            ? (p.buttonProps?.textOn ?? 'ON')
                            : (p.buttonProps?.textOff ?? 'OFF')}
                    </TButton>
                    <div
                        style={{
                            marginLeft: p.buttonProps?.gap ?? '1em',
                            display: 'inline-block',
                        }}
                    >
                        {p.caption}
                    </div>
                </THorizLayout>
            )

        case 'checkbox':
            return (
                <TCheckbox
                    autoFocus={p.autoFocus}
                    caption={p.caption}
                    value={value}
                    defaultValue={p.defaultValue}
                    onChange={(value: string) => update(value, true, true)}
                    disabled={p.disabled}
                    {...p.checkBoxProps}
                ></TCheckbox>
            )
        case 'dropdown':
            return (
                <TDropDown
                    autoFocus={p.autoFocus}
                    items={p.dropDownProps?.items || []}
                    caption={p.caption}
                    value={value}
                    defaultValue={p.defaultValue}
                    disabled={p.disabled}
                    onChange={(value) => update(value, true, undefined)}
                    {...p.dropDownProps}
                ></TDropDown>
            )
        case 'form':
            return (
                <TForm
                    {...p.formProps}
                    context={formContext}
                    onAction={
                        p.onAction
                            ? (id, _ctx, data) => {
                                  p.onAction?.(id, {
                                      id: p.id,
                                      idx: undefined,
                                      data,
                                  })
                              }
                            : undefined
                    }
                >
                    {p.children}
                </TForm>
            )
        case 'progress':
            return (
                <TProgressBar
                    {...p.progressBarProps}
                    caption={p.caption}
                    value={value}
                    defaultValue={p.defaultValue}
                    disabled={p.disabled}
                    onChange={(value) => update(value, true, true)}
                ></TProgressBar>
            )
        case 'template':
            return p.templateProps ? (
                <TFormTemplate
                    {...p.templateProps}
                    items={templateItemsValue}
                    onUpdateItems={(newItems) =>
                        update(
                            { mode: 'list', items: newItems },
                            true,
                            undefined
                        )
                    }
                ></TFormTemplate>
            ) : (
                <div></div>
            )
        case 'textbox':
            return (
                <TTextBox
                    autoFocus={p.autoFocus}
                    caption={p.caption}
                    value={value}
                    defaultValue={p.defaultValue}
                    onChange={(value: string) => update(value, true, undefined)}
                    disabled={p.disabled}
                    {...p.textBoxProps}
                ></TTextBox>
            )
    }

    return <InvalidControl></InvalidControl>

    function update(
        newValue: TFormValueType,
        isUserAction: boolean,
        isValid: boolean | undefined
    ) {
        if (p.readOnly && isUserAction) {
            return
        }

        if (p.onChanging && typeof newValue === 'string') {
            newValue = p.onChanging(newValue, p.id)
        }

        p.ctx?.update(p.id, newValue, isValid ?? validate(p, newValue) ?? false)
        if (p.onChange && typeof newValue === 'string') {
            p.onChange(newValue, p.id)
        }
    }
}

function InvalidControl() {
    return <div>Invalid control</div>
}

function createEmptyValue(p: TFormFieldProps): TFormValueType {
    switch (p.type) {
        case 'form':
            return {
                submitRef: {
                    id: undefined,
                    ref: undefined,
                },
                data: {},
                mode: 'datacontext',
                isDisabled: false,
                isLoading: false,
                isValid: true,
                isValidated: false,
            }
        case 'template':
            return { mode: 'list', items: [] }
        default:
            return ''
    }
}

function createInitValue(p: TFormFieldProps): TFormValueType {
    switch (p.type) {
        case 'form':
            return {
                mode: 'datacontext',
                submitRef: {
                    id: undefined,
                    ref: undefined,
                },
                data: {},
                isLoading: false,
                isValidated: false,
                isDisabled: p.disabled || false,
                isValid: true,
            }
        case 'template':
            return {
                mode: 'list',
                items: [],
            }
        default:
            return ''
    }
}

function validate(p: TFormFieldProps, value: TFormValueType | undefined) {
    if (p.disabled || p.readOnly) {
        return true
    }
    if (value === undefined) {
        return !!p.isOptional
    }

    if (typeof value === 'string') {
        // checkbox and progress are always valid
        if (alwaysValid.has(p.type)) {
            return true
        }

        if (p.isOptional && !value) {
            return true
        }

        if (p.validator?.onValidate) {
            return p.validator.onValidate(value)
        }
        return !!value
    }

    switch (value.mode) {
        case 'datacontext':
            return value.isValid ?? false
        case 'list':
            return (
                value.items.length > 0 && !value.items.find((x) => !x.isValid)
            )
    }

    return false
}

function validateInitValue(p: TFormFieldProps): boolean | undefined {
    if (p.type === 'progress' || p.readOnly) {
        return true
    }
    return undefined
}
