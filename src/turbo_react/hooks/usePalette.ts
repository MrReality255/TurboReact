import { useContext } from "react";
import { TPalette } from "../utils/types";
import { CtxPalette } from "../contexts/palette";

export default function usePalette<T extends Record<string, string>>(
	styles?: T,
	p?: { palette?: TPalette }
) {
	const c = useContext(CtxPalette);
	const palette = (p?.palette ?? c) || "mono";
	return {
		palette,
		styles: function (...list: (string | Record<string, boolean>)[]): string {
			if (!styles) {
				return list.map((a) => a as string).join(" ");
			}
			const p = styles[palette];
			if (p) {
				list = [...list, p];
			}

			return list
				.map((a) => {
					return typeof a === "string"
						? styles[a] ?? a
						: styleMapToString(a, styles);
				})
				.join(" ");
		},
	};
}
function styleMapToString<T extends Record<string, string>>(
	src: Record<string, boolean>,
	styles: T
): string {
	return Object.keys(src)
		.filter((k) => src[k])
		.map((a) => styles[a] ?? a)
		.join(" ");
}
