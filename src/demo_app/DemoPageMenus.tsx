import { useState } from "react";

import { Menu } from "../turbo_react";

import { PalettePanel } from "./components/PalettePanel";
import { DemoAppLayout } from "./DemoAppLayout";
import { TMenuItem } from "../turbo_react/atoms/types";

const menu: TMenuItem[] = [
	{ id: "item1", label: "Item #1", prefix: "■", prefixColor: "red" },
	{ id: "item2", label: "Item #2", secondary: "►" },
	{ id: "item3", label: "Item #3", disabled: true, withSeparator: true },
	{ id: "item4", label: "Item #4" },
];

export function DemoPageMenus() {
	const [selected, setSelected] = useState("item1");
	return (
		<DemoAppLayout selected='menus'>
			<PalettePanel lineHeight={"12em"}>
				<Menu
					onClick={(x) => setSelected(x)}
					items={menu.map((item) => ({
						...item,
						selected: selected == item.id,
					}))}></Menu>
			</PalettePanel>
		</DemoAppLayout>
	);
}
