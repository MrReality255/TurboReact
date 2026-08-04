import { useState } from 'react'
import { DemoAppLayout } from './DemoAppLayout'
import { TRowLayout, TTextBox } from '../turbo-react'
import { PalettePanel } from './components/PalettePanel'

export function DemoPageTextBoxes() {
    const [value, setValue] = useState('')
    const [dateValue, setDateValue] = useState('15.06.2026')
    const [dateTime, setDateTime] = useState('15.06.2026 14:30:00')

    return (
        <DemoAppLayout selected="textboxes">
            <PalettePanel lineHeight="30.5em">
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
                    <TTextBox
                        label="Date (dd.mm.yyyy)"
                        mode="date"
                        dateFormat="dd.mm.yyyy"
                        value={dateTime}
                        onChange={(v) => setDateTime(v)}
                    ></TTextBox>
                    <TTextBox
                        label="DateTime (dd.mm.yyyy hh:ii:ss)"
                        mode="date"
                        dateFormat="dd.mm.yyyy hh:ii"
                        value={dateTime}
                        onChange={(v) => setDateTime(v)}
                    ></TTextBox>
                </TRowLayout>
            </PalettePanel>
        </DemoAppLayout>
    )
}
