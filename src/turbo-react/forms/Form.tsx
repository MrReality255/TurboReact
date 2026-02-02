import { useState } from 'react'
import { IDataContext, TFormProps } from './types'
import { CtxFormPanel } from '../contexts/forms'
import { InputUtils } from '../utils/input'
import { TFormField } from './FormField'

export function TForm(p: TFormProps) {
    const [dataContext, updateDataContext] = useState<IDataContext>({
        data: {},
        isDisabled: p.disabled ?? false,
        isLoading: false,
        isValidated: p.isValidated ?? false,
        isValid: true,
        submitRef: { ref: undefined, id: undefined },
    })

    const newFrmContext =
        p.context ?? InputUtils.newFormContext(dataContext, updateDataContext)

    const formContext = {
        ...newFrmContext,
        isDisabled: p.disabled ?? newFrmContext.isDisabled,
        isValidated: p.isValidated ?? newFrmContext.isValidated,
    }

    return (
        <CtxFormPanel.Provider value={formContext}>
            <ValidFields ctx={formContext}></ValidFields>
            {p.items?.map((item) => {
                return <TFormField {...item} key={item.id}></TFormField>
            })}
            {p.children}
        </CtxFormPanel.Provider>
    )
}

function ValidFields(p: { ctx: IDataContext }) {
    return <></>
    return (
        <>
            {Object.keys(p.ctx.data).map((key) => {
                return (
                    <div>
                        {key}: {p.ctx.data[key].isValid ? 'y' : 'n'}{' '}
                        {JSON.stringify(p.ctx.data[key].value)}
                    </div>
                )
            })}
        </>
    )
}
