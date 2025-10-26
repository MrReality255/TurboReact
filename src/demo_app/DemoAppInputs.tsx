import { useState } from "react";

import {
	Checkbox,
	ColLayout,
	GroupBox,
	Heading,
	MathUtils,
	ProgressBar,
	RadioButton,
	TextBox,
} from "../turbo_react";

import { PalettePanel } from "./components/PalettePanel";
import { DemoAppLayout } from "./DemoAppLayout";

export function DemoPageTextBoxes() {
	const [value, setValue] = useState("");

	return (
		<DemoAppLayout selected='textboxes'>
			<PalettePanel lineHeight='19em'>
				<TextBox
					caption='Standard'
					value={value}
					onChange={(v) => setValue(v)}></TextBox>
				<TextBox caption='Disabled' value='some value' disabled></TextBox>
				<TextBox caption='With prefix' prefix='$' mode='number'></TextBox>
				<TextBox
					caption='With suffix'
					align='right'
					value='200,30'
					disabled
					suffix='€'></TextBox>
				<TextBox
					caption='Both prefix and suffix'
					align='center'
					prefix='$'
					suffix='€'></TextBox>
			</PalettePanel>
		</DemoAppLayout>
	);
}

export function DemoPageOtherControls() {
	const [prgValue, setPrgValue] = useState("25");
	return (
		<DemoAppLayout selected='inputs'>
			<PalettePanel lineHeight='26em'>
				<p>This is some normal text</p>
				<ColLayout cols={2} gap={10}>
					<GroupBox caption='Checkboxes' height='3em'>
						<div>
							<Checkbox caption='Option 1'></Checkbox>
						</div>
						<div>
							<Checkbox disabled caption='Option 2'></Checkbox>
						</div>
					</GroupBox>
					<GroupBox caption='Radio buttons' height='3em'>
						<div>
							<RadioButton caption='Option 1'></RadioButton>
						</div>
						<div>
							<RadioButton disabled caption='Option 2'></RadioButton>
						</div>
					</GroupBox>
				</ColLayout>
				<Heading>Progress bar</Heading>
				<ProgressBar
					value={prgValue}
					onChange={(v) => setPrgValue(v)}
					caption='Progress'
					showValue></ProgressBar>
				<ProgressBar
					value={prgValue}
					caption='Progress - second value'></ProgressBar>
				<ProgressBar
					left={MathUtils.clamp(parseFloat(prgValue || "0") - 10, 0, 100)}
					value={prgValue}
					caption='Progress - second value'></ProgressBar>
			</PalettePanel>
		</DemoAppLayout>
	);
}
