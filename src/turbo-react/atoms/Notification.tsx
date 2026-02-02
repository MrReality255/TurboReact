import { TPaletteProvider } from '../contexts/palette'
import usePalette from '../hooks/usePalette'
import { TNotificationProps } from './types'
import { TViewport } from './Viewport'
import { TWindow } from './Window'
import { useClosingEffect } from '../hooks/useClosingEffect'
import { useEffect } from 'react'

export function TNotification(p: TNotificationProps) {
    const plt = usePalette(undefined, p)
    const cl = useClosingEffect('opacity', 300)

    const timeout = p.timeout ?? 2000

    useEffect(() => {
        let isActive = true
        if (timeout > 0) {
            setTimeout(() => {
                if (isActive) {
                    cl.close()
                }
            }, timeout)
        }

        return () => {
            isActive = false
        }
    }, [])

    return (
        <TPaletteProvider palette={plt.palette}>
            <div
                style={{
                    width: 'fit-content',
                    position: 'relative',
                    left: '50%',
                    color: 'red',
                    transform: 'translate(-50%, 0)',
                }}
            >
                <TViewport
                    style={{
                        ...cl.get(),
                        minHeight: '1em',
                        display: 'inline-block',
                        ...p.style,
                    }}
                >
                    <div style={{ marginBottom: '1em' }}>
                        <TWindow
                            border="none"
                            onClick={() => {
                                cl.close()
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                {p.children}
                            </div>
                        </TWindow>
                    </div>
                </TViewport>
            </div>
        </TPaletteProvider>
    )
}
