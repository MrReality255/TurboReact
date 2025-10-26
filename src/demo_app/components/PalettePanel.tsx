import { ColLayout, TPalette, Window, useMobile } from "../../turbo_react";

const colors: TPalette[] = [
	"blue",
	"green",
	"cyan",
	"dark",
	"grey",
	"mono",
	"red",
	"dialog",
];

export function PalettePanel(p: {
	children?: React.ReactNode;
	lineHeight?: string | number;
}) {
	const isMobile = useMobile();

	return (
		<ColLayout
			cols={isMobile ? 1 : 2}
			gap={"2em"}
			lineHeight={p.lineHeight || "10em"}>
			{colors.map((c, idx) => (
				<Window key={idx} palette={c} caption={"Palette " + c} fill>
					{p.children}
				</Window>
			))}
		</ColLayout>
	);
}
