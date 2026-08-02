import { useNavigate } from 'react-router-dom'
import {
    TAppLayout,
    THorizLayout,
    TWindow,
    useMobile,
    useWidth,
} from '../turbo-react'
import { DemoHeaderMobile } from './components/DemoHeaderMobile'
import { DemoMainMenu } from './components/DemoMainMenu'

export type TDemoAppProps = {
    selected: string
    children?: React.ReactNode
}

export function DemoAppLayout(p: TDemoAppProps) {
    const isMobile = useMobile()
    const isLg = useWidth('lg')
    const n = useNavigate()

    return (
        <TAppLayout
            sizeUnit="em"
            sizes={{
                header: 3.5,
                footer: 2,
                left: 20,
                leftSpace: 1,
            }}
            mobile={{
                sizes: {
                    header: 3,
                    footer: 2,
                    left: 0,
                },
                header: <DemoHeaderMobile onNavigate={n} {...p} />,
            }}
            header={
                <TWindow palette="dark" noShadow border="none">
                    <THorizLayout
                        alignMode="right"
                        left={
                            <span
                                style={{
                                    fontSize: '1.3em',
                                    color: '#fff',
                                    display: 'inline-block',
                                }}
                            >
                                Turbo React
                            </span>
                        }
                    >
                        mobile mode: {isMobile ? 'y' : 'n'} lg mode:{' '}
                        {isLg ? 'y' : 'n'}
                    </THorizLayout>
                </TWindow>
            }
            footer={
                <TWindow
                    palette="dark"
                    noShadow
                    border="none"
                    innerPadding="none"
                >
                    TurboReact
                </TWindow>
            }
            left={
                <TWindow
                    outerPadding
                    border="single"
                    caption="Menu"
                    palette="grey"
                    innerPadding="none"
                >
                    <DemoMainMenu {...p} onNavigate={n} />
                </TWindow>
            }
            scrollbarPalette="mono"
        >
            {p.children}
        </TAppLayout>
    )
}
