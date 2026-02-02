import { TDataContent, TDialogContext, TDialogProps, TDialogResult } from '..'
import { TDialogWrapper } from '../forms/Dialog'
import { InputUtils } from '../utils/input'
import { useLayer } from './useLayer'

export function useDialog<T = any, C = any>(
    p: (ctx: TDialogContext<T, C>) => TDialogProps
) {
    const l = useLayer()

    return {
        show: (inputData?: TDataContent, ctx?: C) => {
            return new Promise<TDialogResult<T> | null>((resolve) => {
                l.show(() => {
                    return (
                        <TDialogWrapper<T, C>
                            ctx={ctx}
                            initialState={InputUtils.getInitialState(inputData)}
                            onSubmit={(result, data, frm) => {
                                resolve({
                                    result,
                                    data,
                                    frm,
                                })
                            }}
                            onCancel={() => {
                                resolve(null)
                            }}
                            fct={p}
                        ></TDialogWrapper>
                    )
                })
            })
        },
    }
}
