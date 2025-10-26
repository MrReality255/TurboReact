import { useState } from "react";

import { DropDown, TMenuItem } from "../turbo_react";

import { PalettePanel } from "./components/PalettePanel";
import { DemoAppLayout } from "./DemoAppLayout";

const menu: TMenuItem[] = [
	{ id: "item1", label: "Item #1", prefix: "x", prefixColor: "red" },
	{ id: "item2", label: "Item #2" },
	{ id: "item3", label: "Item #3" },
	{ id: "item4", label: "Item #4", disabled: true },
	{ id: "item5", label: "Item #5", secondary: "..." },
	{ id: "item6", label: "Item #6" },
	{ id: "item7", label: "Item #7" },
	{ id: "item8", label: "Item #8" },
	{ id: "item9", label: "Item #9" },
	{ id: "item10", label: "Item #10" },
	{ id: "item11", label: "Item #11", disabled: true },
	{ id: "item12", label: "Item #12", secondary: "..." },
	{ id: "item13", label: "Item #13" },
	{ id: "item14", label: "Item #14" },
	{ id: "item15", label: "Item #15" },
];

export function DemoPageSelects() {
	const dropDownStyle = { marginBottom: "1em" };
	const [selected, setSelected] = useState("");

	return (
		<DemoAppLayout selected='selects'>
			<PalettePanel lineHeight='29em'>
				<div style={dropDownStyle}>
					<DropDown
						caption='Select'
						items={menu}
						value={selected}
						onChange={(v) => setSelected(v)}></DropDown>
				</div>
				<div style={dropDownStyle}>
					<DropDown
						caption='Select disabled'
						items={menu}
						value={selected}
						disabled
						onChange={(v) => setSelected(v)}></DropDown>
				</div>
				<div style={dropDownStyle}>
					<DropDown
						caption='Select with 8'
						items={menu.slice(0, 8)}
						value={selected}
						onChange={(v) => setSelected(v)}></DropDown>
				</div>
				<div style={dropDownStyle}>
					<DropDown
						caption='Select with 2'
						items={menu.slice(0, 2)}
						value={selected}
						onChange={(v) => setSelected(v)}></DropDown>
				</div>
				<div style={dropDownStyle}>
					<DropDown
						caption='Select with 0'
						items={[]}
						value={selected}
						onChange={(v) => setSelected(v)}></DropDown>
				</div>
				<div style={dropDownStyle}>
					<DropDown
						caption='Select bottom'
						items={menu}
						value={selected}
						onChange={(v) => setSelected(v)}></DropDown>
				</div>
			</PalettePanel>
		</DemoAppLayout>
	);
}
