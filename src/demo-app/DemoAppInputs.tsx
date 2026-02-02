import { useState } from 'react'
import { TTextBox } from '../turbo-react/atoms/TextBox'
import { PalettePanel } from './components/PalettePanel'
import { DemoAppLayout } from './DemoAppLayout'
import { TCheckbox } from '../turbo-react/atoms/Checkbox'
import { TGroupBox } from '../turbo-react/atoms/GroupBox'
import { TColLayout } from '../turbo-react/layout/ColLayout'
import { TRadioButton } from '../turbo-react/atoms/RadioButton'
import { THeading } from '../turbo-react/atoms/Heading'
import { TProgressBar } from '../turbo-react/atoms/ProgressBar'
import { MathUtils } from '../turbo-react/utils/math'
import { TRowLayout } from '../turbo-react'

export function DemoPageTextBoxes() {
    const [value, setValue] = useState('')

    return (
        <DemoAppLayout selected="textboxes">
            <PalettePanel lineHeight="22.5em">
                <TRowLayout gap={10}>
                    <TTextBox
                        caption="Standard"
                        value={value}
                        onChange={(v) => setValue(v)}
                    ></TTextBox>
                    <TTextBox
                        caption="Disabled"
                        value="some value"
                        disabled
                    ></TTextBox>
                    <TTextBox
                        caption="With prefix"
                        prefix="$"
                        mode="number"
                    ></TTextBox>
                    <TTextBox
                        caption="With suffix"
                        align="right"
                        value="200,30"
                        disabled
                        suffix="€"
                    ></TTextBox>
                    <TTextBox
                        caption="Both prefix and suffix"
                        align="center"
                        prefix="$"
                        suffix="€"
                    ></TTextBox>
                </TRowLayout>
            </PalettePanel>
        </DemoAppLayout>
    )
}

export function DemoPageOtherControls() {
    const [prgValue, setPrgValue] = useState('25')
    return (
        <DemoAppLayout selected="inputs">
            <PalettePanel lineHeight="26em">
                <p>This is some normal text</p>
                <TColLayout cols={2} gap={10}>
                    <TGroupBox caption="Checkboxes" height="3em">
                        <div>
                            <TCheckbox caption="Option 1"></TCheckbox>
                        </div>
                        <div>
                            <TCheckbox disabled caption="Option 2"></TCheckbox>
                        </div>
                    </TGroupBox>
                    <TGroupBox caption="Radio buttons" height="3em">
                        <div>
                            <TRadioButton caption="Option 1"></TRadioButton>
                        </div>
                        <div>
                            <TRadioButton
                                disabled
                                caption="Option 2"
                            ></TRadioButton>
                        </div>
                    </TGroupBox>
                </TColLayout>
                <THeading>Progress bar</THeading>
                <TProgressBar
                    value={prgValue}
                    onChange={(v) => setPrgValue(v)}
                    caption="Progress"
                    showValue
                ></TProgressBar>
                <TProgressBar
                    value={prgValue}
                    caption="Progress - second value"
                ></TProgressBar>
                <TProgressBar
                    left={MathUtils.clamp(
                        parseFloat(prgValue || '0') - 10,
                        0,
                        100
                    )}
                    value={prgValue}
                    caption="Progress - second value"
                ></TProgressBar>
            </PalettePanel>
        </DemoAppLayout>
    )
}
