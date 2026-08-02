import { TMenu } from '../../turbo-react'
import { TDemoAppProps } from '../DemoAppLayout'

const menuItems = [
    { id: 'windows', label: 'Windows' },
    {
        id: 'dialogs',
        label: 'Dialogs',
        withSeparator: true,
    },
    { id: 'buttons', label: 'Buttons' },
    { id: 'textboxes', label: 'Textboxes' },
    { id: 'selects', label: 'Select' },
    { id: 'inputs', label: 'Other inputs' },
    { id: 'no-option', label: '3D Graphics', disabled: true },
    { id: 'menus', label: 'Menus' },
    { id: 'tables', label: 'Tables', withSeparator: true },
    { id: 'misc', label: 'Misc' },
]

export function DemoMainMenu(
    p: TDemoAppProps & { onNavigate: (url: string) => void }
) {
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
