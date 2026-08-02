import {
    createFormHook,
    TFormControlBaseProps,
    TFormControlOuterProps,
    TFormInternalState,
    ViewUtils,
} from '@mrreality255/turbo-react-forms'
import {
    TControlRenderProps,
    TDropDownFieldProps,
    TFormEnvState,
    TFormWindowProps,
    TProgressBarFieldProps,
    TSubformProps,
    TTextBoxFieldProps,
} from './types'
import {
    TCheckbox,
    TDropDown,
    TGroupBox,
    TGroupBoxProps,
    TLabelInputProps,
    TProgressBar,
    TRadioButton,
    TTextBox,
} from '../atoms'
import { TFormWindow } from './FormWindow'
import { ControlWrapper } from './ControlWrapper'
import { TControlContainer } from './ControlContainer'

const lib = createFormHook({
    controls: {
        textBox: {
            onRender: (
                baseProps: TFormControlBaseProps,
                props: TTextBoxFieldProps
            ) => {
                return (
                    <TTextBox
                        {...props}
                        disabled={baseProps.disabled}
                        readOnly={baseProps.readOnly}
                        value={baseProps.value}
                        onChange={(v) => baseProps.onValueChange(v)}
                    ></TTextBox>
                )
            },
        },

        checkBox: {
            forcedDefaultValue: 'false',
            onRender: (
                baseProps: TFormControlBaseProps,
                props: TLabelInputProps
            ) => {
                return (
                    <TCheckbox
                        {...props}
                        disabled={baseProps.disabled}
                        readOnly={baseProps.readOnly}
                        value={baseProps.value}
                        onChange={(v) =>
                            baseProps.onValueChange(v ? 'true' : 'false')
                        }
                    ></TCheckbox>
                )
            },
        },

        dropDown: {
            onRender: (
                baseProps: TFormControlBaseProps,
                props: TDropDownFieldProps
            ) => {
                return (
                    <TDropDown
                        {...props}
                        disabled={baseProps.disabled}
                        readOnly={baseProps.readOnly}
                        value={baseProps.value}
                        onChange={(v) => baseProps.onValueChange(v)}
                    ></TDropDown>
                )
            },
        },

        radioButton: {
            forcedDefaultValue: 'false',
            onRender: (
                baseProps: TFormControlBaseProps,
                props: TLabelInputProps
            ) => {
                return (
                    <TRadioButton
                        {...props}
                        disabled={baseProps.disabled}
                        readOnly={baseProps.readOnly}
                        value={baseProps.value}
                        onChange={(v) =>
                            baseProps.onValueChange(v ? 'true' : 'false')
                        }
                    ></TRadioButton>
                )
            },
        },

        progressBar: {
            forcedDefaultValue: '0',
            onRender: (
                baseProps: TFormControlBaseProps,
                props: TProgressBarFieldProps
            ) => {
                return (
                    <TProgressBar
                        {...props}
                        disabled={baseProps.disabled}
                        readOnly={baseProps.readOnly}
                        value={baseProps.value}
                        onChange={(v) => baseProps.onValueChange(v)}
                    ></TProgressBar>
                )
            },
        },
    },

    onInit: () => {
        return {} as TFormEnvState
    },

    onRenderControl: (
        content,
        visible,
        ctrlProps,
        renderProps: TControlRenderProps | undefined,
        hintTr
    ) => {
        return (
            <ControlWrapper
                visible={visible}
                ctrlProps={ctrlProps}
                renderProps={renderProps}
                onHint={hintTr}
            >
                {content}
            </ControlWrapper>
        )
    },

    onRenderMainWrapper: (
        content: React.ReactNode,
        props: TFormWindowProps,
        state: TFormInternalState<unknown>
    ) => {
        return (
            <TFormWindow {...props} isLoading={state.mode === 'loading'}>
                {content}
            </TFormWindow>
        )
    },
    onRenderSubform: (content, data, props: TSubformProps) => {
        const c = ViewUtils.wrap(
            <TControlContainer {...(props.container ?? {})}>
                {content}
            </TControlContainer>,
            props.groupBox
                ? (c) => wrapInGroupBox(c, props.groupBox!)
                : undefined
        )

        return <div>{c}</div>
    },
    onRenderSubformControl: (content, data, idx) => {
        return content
    },
    onRenderTemplate: (content, state, props) => {
        return content
    },
    onRenderTemplateRow: (content, idx, handle, stateProps, props) => {
        return content
    },
    onRenderTemplateRowControl: (content, rowIdx, stateProps, props) => {
        return content
    },
})

function wrapInGroupBox(
    content: React.ReactNode,
    groupBox: TGroupBoxProps
): React.ReactNode {
    return <TGroupBox {...groupBox}>{content}</TGroupBox>
}

export type TDemoLibControls = ReturnType<typeof lib.newEmptyList>

export const useForm = lib.useForm
export const useFormContext = lib.useFormContext
