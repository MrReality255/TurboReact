import { useContext } from 'react'

import { TPalette } from '../components/types'
import { CtxPalette } from '..'
import paletteStyles from '../components/palette.module.css'

export default function usePalette<T extends Record<string, string>>(
    styles?: T,
    p?: { palette?: TPalette }
) {
    const c = useContext(CtxPalette)
    const palette = (p?.palette ?? c) || 'mono'
    return {
        palette,
        styles: function (
            ...list: (string | Record<string, boolean>)[]
        ): string {
            if (!styles) {
                return list.map((a) => a as string).join(' ')
            }

            // Add the shared palette class (defines CSS custom properties)
            const paletteClass = paletteStyles[palette]
            if (paletteClass) {
                list = [...list, paletteClass]
            }

            // Also add component-local palette class if it exists (for any remaining overrides)
            const localPaletteClass = styles[palette]
            if (localPaletteClass) {
                list = [...list, localPaletteClass]
            }

            return list
                .map((a) => {
                    return typeof a === 'string'
                        ? styles[a] ?? a
                        : styleMapToString(a, styles)
                })
                .join(' ')
        },
    }
}
function styleMapToString<T extends Record<string, string>>(
    src: Record<string, boolean>,
    styles: T
): string {
    return Object.keys(src)
        .filter((k) => src[k])
        .map((a) => styles[a] ?? a)
        .join(' ')
}
