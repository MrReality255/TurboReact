import { useNavigate } from "react-router-dom";

import {
	AppLayout,
	Button,
	ClosingEffect,
	Glass,
	HorizLayout,
	Menu,
	PaletteProvider,
	Window,
	useLayer,
	useMobile,
} from "../turbo_react";

export type TDemoAppProps = {
	selected: string;
	children?: React.ReactNode;
};

const menuItems = [
	{ id: "windows", label: "Windows" },
	{
		id: "dialogs",
		label: "Dialogs",
		withSeparator: true,
	},
	{ id: "buttons", label: "Buttons" },
	{ id: "textboxes", label: "Textboxes" },
	{ id: "selects", label: "Select" },
	{ id: "inputs", label: "Other inputs" },
	{ id: "no-option", label: "3D Graphics", disabled: true },
	{ id: "menus", label: "Menus" },
	{ id: "tables", label: "Tables", withSeparator: true },
	{ id: "misc", label: "Misc" },
];

export function DemoAppLayout(p: TDemoAppProps) {
	const isMobile = useMobile();
	const n = useNavigate();

	return (
		<AppLayout
			sizeUnit='em'
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
				<Window palette='dark' noShadow border='none'>
					<HorizLayout
						alignMode='right'
						left={
							<span
								style={{
									fontSize: "1.3em",
									color: "#fff",
									display: "inline-block",
								}}>
								Turbo React
							</span>
						}>
						mobile mode: {isMobile ? "y" : "n"}
					</HorizLayout>
				</Window>
			}
			footer={
				<Window palette='dark' noShadow border='none' innerPadding='none'>
					TurboReact
				</Window>
			}
			left={
				<Window
					outerPadding
					border='single'
					caption='Menu'
					palette='grey'
					innerPadding='none'>
					<MainMenu {...p} onNavigate={n} />
				</Window>
			}>
			{p.children}
		</AppLayout>
	);
}

function HeaderMobile(
	p: TDemoAppProps & { onNavigate: (url: string) => void }
) {
	const l = useLayer();

	return (
		<Window palette='dark' innerPadding='none' border='none' noShadow>
			<PaletteProvider palette='blue'>
				<HorizLayout
					gap={"1em"}
					left={
						<Button onClick={() => showMenu()} variant='plain'>
							Menu
						</Button>
					}>
					TurboReact 1.0
				</HorizLayout>
			</PaletteProvider>
		</Window>
	);

	function showMenu() {
		l.show((hideFct) => {
			return (
				<>
					<Glass backdrop visible></Glass>
					<Glass visible>
						<ClosingEffect
							onClose={hideFct}
							onRender={(onClose) => {
								return (
									<Window
										palette='grey'
										innerPadding='none'
										onClose={() => onClose()}>
										<MainMenu
											{...p}
											onNavigate={(url) => {
												p.onNavigate(url);
												onClose();
											}}></MainMenu>
									</Window>
								);
							}}></ClosingEffect>
					</Glass>
				</>
			);
		});
	}
}

function MainMenu(p: TDemoAppProps & { onNavigate: (url: string) => void }) {
	return (
		<Menu
			onClick={(id) => handleMenu(id)}
			items={menuItems.map((item) => ({
				...item,
				selected: item.id == p.selected,
				prefix: item.id == p.selected ? "•" : undefined,
			}))}></Menu>
	);

	function handleMenu(id: string) {
		p.onNavigate(`/${id}`);
	}
}
