import { createContext } from "react";
import { TPalette } from "../utils/types";

export const CtxPalette = createContext<TPalette>("blue");

export function PaletteProvider(p: {
	palette: TPalette;
	children?: React.ReactNode;
}) {
	return (
		<CtxPalette.Provider value={p.palette}>{p.children}</CtxPalette.Provider>
	);
}
