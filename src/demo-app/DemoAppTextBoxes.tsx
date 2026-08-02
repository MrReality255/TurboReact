import { useState } from 'react'
import { DemoAppLayout } from './DemoAppLayout'
import { TRowLayout, TTextBox } from '../turbo-react'
import { PalettePanel } from './components/PalettePanel'

export function DemoPageTextBoxes() {
    const [value, setValue] = useState('')

    return (
        <DemoAppLayout selected="textboxes">
            <PalettePanel lineHeight="22.5em">
                <TRowLayout gap={10}>
                    <TTextBox
                        label="Standard"
                        value={value}
                        onChange={(v) => setValue(v)}
                    ></TTextBox>
                    <TTextBox
                        label="Disabled"
                        value="some value"
                        disabled
                    ></TTextBox>
                    <TTextBox
                        label="With prefix"
                        prefix="$"
                        mode="number"
                    ></TTextBox>
                    <TTextBox
                        label="With suffix"
                        align="right"
                        value="200,30"
                        disabled
                        suffix="€"
                    ></TTextBox>
                    <TTextBox
                        label="Both prefix and suffix"
                        align="center"
                        prefix="$"
                        suffix="€"
                    ></TTextBox>
                </TRowLayout>
            </PalettePanel>
        </DemoAppLayout>
    )
}
