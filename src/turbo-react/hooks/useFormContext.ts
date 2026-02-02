import { useContext } from 'react'
import { CtxFormPanel } from '../contexts/forms'

export function useFormContext() {
    return useContext(CtxFormPanel)
}
