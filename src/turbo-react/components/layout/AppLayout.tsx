import { TAppLayoutProps } from './types'

import styles from './AppLayout.module.css'
import usePalette from '../../hooks/usePalette'
import { TViewport } from '../atoms/Viewport'
import { TPaletteProvider } from '../providers/palette'
import { useMobile } from '../../hooks/useMobile'

// Scrollbar color values per palette (only used when scrollbarPalette differs from main palette)
const scrollbarPalettes: Record<string, Record<string, string>> = {
    blue: {
        '--sb-track': '#003',
        '--sb-track-border': '#006',
        '--sb-thumb': '#0aa',
        '--sb-thumb-border': '#0cc',
        '--sb-thumb-hover': '#0ff',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#006',
        '--sb-button-border': '#099',
        '--sb-button-hover': '#099',
        '--sb-corner': '#003',
    },
    cyan: {
        '--sb-track': '#033',
        '--sb-track-border': '#066',
        '--sb-thumb': '#0cc',
        '--sb-thumb-border': '#099',
        '--sb-thumb-hover': '#0ff',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#066',
        '--sb-button-border': '#099',
        '--sb-button-hover': '#099',
        '--sb-corner': '#033',
    },
    green: {
        '--sb-track': '#010',
        '--sb-track-border': '#030',
        '--sb-thumb': '#0a0',
        '--sb-thumb-border': '#0c0',
        '--sb-thumb-hover': '#0f0',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#030',
        '--sb-button-border': '#060',
        '--sb-button-hover': '#060',
        '--sb-corner': '#010',
    },
    red: {
        '--sb-track': '#200',
        '--sb-track-border': '#600',
        '--sb-thumb': '#c00',
        '--sb-thumb-border': '#f00',
        '--sb-thumb-hover': '#f44',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#600',
        '--sb-button-border': '#900',
        '--sb-button-hover': '#900',
        '--sb-corner': '#200',
    },
    dark: {
        '--sb-track': '#111',
        '--sb-track-border': '#333',
        '--sb-thumb': '#990',
        '--sb-thumb-border': '#bb0',
        '--sb-thumb-hover': '#ff0',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#333',
        '--sb-button-border': '#550',
        '--sb-button-hover': '#550',
        '--sb-corner': '#111',
    },
    grey: {
        '--sb-track': '#444',
        '--sb-track-border': '#666',
        '--sb-thumb': '#aaa',
        '--sb-thumb-border': '#ccc',
        '--sb-thumb-hover': '#ddd',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#666',
        '--sb-button-border': '#888',
        '--sb-button-hover': '#888',
        '--sb-corner': '#444',
    },
    dialog: {
        '--sb-track': '#333',
        '--sb-track-border': '#555',
        '--sb-thumb': '#999',
        '--sb-thumb-border': '#bbb',
        '--sb-thumb-hover': '#ccc',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#555',
        '--sb-button-border': '#777',
        '--sb-button-hover': '#777',
        '--sb-corner': '#333',
    },
    mono: {
        '--sb-track': '#111',
        '--sb-track-border': '#333',
        '--sb-thumb': '#777',
        '--sb-thumb-border': '#999',
        '--sb-thumb-hover': '#aaa',
        '--sb-thumb-active': '#fff',
        '--sb-button': '#333',
        '--sb-button-border': '#555',
        '--sb-button-hover': '#555',
        '--sb-corner': '#111',
    },
}

export function TAppLayout(p: TAppLayoutProps) {
    const plt = usePalette(styles, p)
    const isMobile = useMobile()

    // Only use inline style override when scrollbarPalette differs from main palette
    const sbOverride =
        p.scrollbarPalette && p.scrollbarPalette !== plt.palette
            ? (scrollbarPalettes[p.scrollbarPalette] as React.CSSProperties)
            : undefined

    const layout = {
        ...p,
        ...(isMobile ? p.mobile : undefined),
        sizes: {
            ...p.sizes,
            ...(isMobile ? p.mobile?.sizes : undefined),
        },
    }

    const has = {
        left: !!layout.left && layout.sizes?.left !== 0,
        right: !!layout.right && layout.sizes?.right !== 0,
        footer: !!layout.footer && layout.sizes?.footer !== 0,
        header: !!layout.header && layout.sizes?.header !== 0,
    }

    const sizes = {
        header: has.header ? size(layout.sizes?.header) : 0,
        footer: has.footer ? size(layout.sizes?.footer) : 0,

        left: has.left ? size(layout.sizes?.left, layout.sizes?.leftSpace) : 0,
        right: has.right
            ? size(layout.sizes?.right, layout.sizes?.rightSpace)
            : 0,
    }

    const className = plt.styles(styles.appLayout)

    return (
        <div className={className} style={sbOverride}>
            <TPaletteProvider palette={plt.palette}>
                <TViewport rect={{ x: 0, y: 0, x2: 0, y2: 0 }}>
                    {has.header && (
                        <TViewport
                            rect={{ x: 0, y: 0, x2: 0 }}
                            height={sizes.header}
                        >
                            {layout.header}
                        </TViewport>
                    )}
                    {has.left && (
                        <TViewport
                            rect={{ x: 0, y: sizes.header, y2: sizes.footer }}
                            width={size(layout.sizes?.left)}
                        >
                            {layout.left}
                        </TViewport>
                    )}
                    <TViewport
                        rect={{
                            x: sizes.left,
                            y: sizes.header,
                            x2: sizes.right,
                            y2: sizes.footer,
                        }}
                        scrollbar
                    >
                        {p.children}
                    </TViewport>
                    {has.right && (
                        <TViewport
                            rect={{ x2: 0, y: sizes.header, y2: sizes.footer }}
                            width={size(layout.sizes?.right)}
                        >
                            {layout.right}
                        </TViewport>
                    )}
                    {has.footer && (
                        <TViewport
                            rect={{ x: 0, x2: 0, y2: 0 }}
                            height={sizes.footer}
                        >
                            {layout.footer}
                        </TViewport>
                    )}
                </TViewport>
            </TPaletteProvider>
        </div>
    )

    function size(...v: (number | undefined)[]) {
        const sum = v.filter((a) => a !== undefined).reduce((a, b) => a + b, 0)
        const hasAny = v.find((a) => a !== undefined)

        if (!hasAny) {
            return undefined
        }

        if (!p.sizeUnit) {
            return sum
        }
        return sum + p.sizeUnit
    }
}
