import { MiscUtils } from '@mrreality255/turbo-react-forms'
import { TFormButtonAction, useForm } from '../../turbo-react'

export function useTestDlg() {
    const frm = useForm<{ id: number }, { value: string }>({
        form: (state) => ({
            title: 'My title',
            columns: '1fr 1fr',
            gap: '1em',
            buttonsRight: [
                {
                    action: 'submit',
                    label: 'OK',
                    default: true,
                    w0: true,
                    disabled: !state.data.isValid(),
                },
                {
                    action: async () => {
                        await MiscUtils.delay(1000)
                        return { type: 'submit', submitData: 150, id: 'err' }
                    },
                    label: 'OK - err',
                    w1: true,
                    disabled: !state.data.isValid(),
                },
                { action: 'cancel', label: 'Stornieren', w1: true },
            ],
            buttonsLeft: [
                {
                    label: 'Set defaults',
                    w1: true,
                    action: async () => {
                        await MiscUtils.delay(1000)
                        return {
                            id: 'set-defaults',
                            data: { value: 12 },
                            type: 'command',
                        }
                    },
                },
            ],
        }),
        onSubmit: async (ctx) => {
            if (ctx.id == 'err') {
                return {
                    preventClose: true,
                    submitData: { value: '34' },
                    ctxUpdateEnv: (e) => ({
                        error: 'You choose the err button',
                    }),
                }
            }
            return {
                id: 12,
                submitData: { value: '2332' },
                ctxUpdateFct: (n) => ({ id: n.id + 1 }),
            }
        },
        onUpdate: (cmd, event, ctx, data) => {
            switch (cmd?.id) {
                case 'set-defaults':
                    return {
                        onUpdateData: (prev, replacer) => {
                            const tmp = replacer((obj) => {
                                obj.setValue('firstname', 'Hans', true)
                                obj.setValue('lastname', 'Wurst', true)
                                obj.setValue('longtext', 'ein Text dazu', true)
                                obj.setValue('chk1', 'true', true)
                            })
                            return tmp
                        },
                    }
            }
            return {
                onUpdateEnv: (e) => ({ ...e, error: undefined }),
            }
        },
        controls: (state) => {
            const isGroupDisabled = state.data.getValue('chk1') !== 'true'
            return [
                {
                    id: 'firstname',
                    class: undefined,
                    type: 'textBox',
                    prop: { label: 'First Name', autoFocus: true },
                },
                {
                    id: 'lastname',
                    class: undefined,
                    type: 'textBox',
                    prop: { label: 'Last Name' },
                },
                {
                    id: 'longtext',
                    class: undefined,
                    type: 'textBox',
                    renderProps: {
                        column: '1 / 3',
                    },
                    prop: { label: 'Long text', prefix: '$', palette: 'green' },
                },
                {
                    id: 'ddl1',
                    class: undefined,
                    type: 'dropDown',
                    prop: {
                        label: 'Drop down list',
                        items: [
                            { id: 'v1', label: 'Value 1' },
                            { id: 'v2', label: 'Value 2' },
                            { id: 'v3', label: 'Value 3' },
                        ],
                    },
                },
                {
                    id: 'prog1',
                    class: undefined,
                    type: 'progressBar',
                    prop: {
                        label: 'Progress bar',
                    },
                },
                {
                    id: 'sftmp1',
                    class: 'subform',
                    renderProps: { column: '1 / 3' },
                    subform: {
                        groupBox: {},
                        controls: [
                            {
                                id: 'chk1',
                                class: undefined,
                                type: 'checkBox',
                                prop: { label: 'Show additional group' },
                            },
                        ],
                    },
                },
                {
                    id: 'grp1',
                    hidden: isGroupDisabled,
                    class: 'subform',
                    renderProps: { column: '1 / 3' },
                    subform: {
                        container: {
                            columns: '1fr 1fr',
                            gap: '1em',
                        },
                        groupBox: {
                            label: 'A group box with two options',
                        },
                        controls: [
                            {
                                id: 'opt1',
                                type: 'textBox',
                                prop: { label: 'Option 1' },
                            },
                            {
                                id: 'opt2',
                                type: 'textBox',
                                prop: { label: 'Option 2' },
                            },
                        ],
                    },
                },
            ]
        },
    })
    return frm
}
