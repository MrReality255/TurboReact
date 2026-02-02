import { TAppLayout } from '../turbo-react/app/AppLayout'
import { TWindow } from '../turbo-react/atoms/Window'
import { TMenu } from '../turbo-react/atoms/Menu'
import { useNavigate } from 'react-router-dom'
import { useMobile } from '../turbo-react/hooks/useMobile'
import { useWidth } from '../turbo-react/hooks/useWidth'
import { THorizLayout } from '../turbo-react/layout/HorizLayout'
import { TButton } from '../turbo-react/atoms/Buttons'
import { useLayer } from '../turbo-react/hooks/useLayer'
import { TGlass } from '../turbo-react/atoms/Glass'
import { TPaletteProvider } from '../turbo-react/contexts/palette'
import { TClosingEffectProvider } from '../turbo-react/atoms/ClosingEffect'

export type TDemoAppProps = {
    selected: string
    children?: React.ReactNode
}

const menuItems = [
    { id: 'windows', caption: 'Windows' },
    {
        id: 'dialogs',
        caption: 'Dialogs',
        withSeparator: true,
    },
    { id: 'buttons', caption: 'Buttons' },
    { id: 'textboxes', caption: 'Textboxes' },
    { id: 'selects', caption: 'Select' },
    { id: 'inputs', caption: 'Other inputs' },
    { id: 'no-option', caption: '3D Graphics', disabled: true },
    { id: 'menus', caption: 'Menus' },
    { id: 'tables', caption: 'Tables', withSeparator: true },
    { id: 'misc', caption: 'Misc' },
]

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
                header: <HeaderMobile onNavigate={n} {...p} />,
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
                    <MainMenu {...p} onNavigate={n} />
                </TWindow>
            }
        >
            {p.children}
        </TAppLayout>
    )
}

function HeaderMobile(
    p: TDemoAppProps & { onNavigate: (url: string) => void }
) {
    const l = useLayer()

    return (
        <TWindow palette="dark" innerPadding="none" border="none" noShadow>
            <TPaletteProvider palette="blue">
                <THorizLayout
                    gap={'1em'}
                    left={
                        <TButton onClick={() => showMenu()} variant="plain">
                            Menu
                        </TButton>
                    }
                >
                    TurboReact 1.0
                </THorizLayout>
            </TPaletteProvider>
        </TWindow>
    )

    function showMenu() {
        l.show((hideFct) => {
            return (
                <>
                    <TGlass backdrop visible></TGlass>
                    <TGlass visible>
                        <TClosingEffectProvider
                            onClose={hideFct}
                            onRender={(oc) => {
                                return (
                                    <TWindow
                                        palette="grey"
                                        innerPadding="none"
                                        onClose={() => oc()}
                                    >
                                        <MainMenu
                                            {...p}
                                            onNavigate={(url) => {
                                                p.onNavigate(url)
                                                oc()
                                            }}
                                        ></MainMenu>
                                    </TWindow>
                                )
                            }}
                        ></TClosingEffectProvider>
                    </TGlass>
                </>
            )
        })
    }
}

function MainMenu(p: TDemoAppProps & { onNavigate: (url: string) => void }) {
    return (
        <TMenu
            onClick={(id) => handleMenu(id)}
            items={menuItems.map((item) => ({
                ...item,
                selected: item.id == p.selected,
                prefix: item.id == p.selected ? '•' : undefined,
            }))}
        ></TMenu>
    )

    function handleMenu(id: string) {
        p.onNavigate(`/${id}`)
    }
}
