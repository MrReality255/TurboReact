import { useEffect } from 'react'

export default function useAutoFocus(
    p: { autoFocus?: boolean },
    inputRef?: { current?: { focus: () => void } | null }
) {
    useEffect(() => {
        if (p.autoFocus && inputRef) {
            inputRef.current?.focus()
        }
    }, [])
}
