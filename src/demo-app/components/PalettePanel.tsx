import { TColLayout, TWindow } from '../../turbo-react'
import { TPalette } from '../../turbo-react/components/types'
import { useMobile } from '../../turbo-react/hooks/useMobile'

const colors: TPalette[] = [
    'blue',
    'green',
    'cyan',
    'dark',
    'grey',
    'mono',
    'red',
    'dialog',
]

export function PalettePanel(p: {
    children?: React.ReactNode
    lineHeight?: string | number
}) {
    const isMobile = useMobile()

    return (
        <TColLayout
            cols={isMobile ? 1 : 2}
            gap={'2em'}
            lineHeight={p.lineHeight || '10em'}
        >
            {colors.map((c, idx) => (
                <TWindow key={idx} palette={c} caption={'Palette ' + c} fill>
                    {p.children}
                </TWindow>
            ))}
        </TColLayout>
    )
}
