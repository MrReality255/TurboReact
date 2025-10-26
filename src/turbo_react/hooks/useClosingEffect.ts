import { CSSProperties, useContext, useEffect, useMemo, useState } from "react";
import { CtxLayerManager } from "../contexts/layer";
import { TClosingEffect } from "../atoms/types";

const defaultAnimationDuration = 100;

export function useClosingEffect(mode?: TClosingEffect, delay?: number) {
	mode = mode || "resize";
	delay = delay ?? defaultAnimationDuration;

	const transition = getTransition(mode, delay);

	const initState = useMemo(() => {
		return {
			transition,
			transform: mode == "resize" ? "scale(0.1)" : undefined,
			opacity: mode == "opacity" ? 0 : undefined,
		};
	}, []);

	const lmgr = useContext(CtxLayerManager);
	const [style, setStyle] = useState<CSSProperties>(initState);

	useEffect(() => {
		setStyle({
			transition,
			transform: mode == "resize" ? "scale(1)" : undefined,
			opacity: mode == "opacity" ? 1 : undefined,
		});
	}, []);

	return {
		get: function (): CSSProperties {
			return style;
		},
		close: function (onClose?: () => void) {
			setStyle(initState);
			setTimeout(() => {
				if (onClose) {
					onClose();
					return;
				}

				if (lmgr) {
					lmgr.hide();
				}
			}, delay);
		},
	};
}
function getTransition(mode: TClosingEffect, delay: number) {
	delay = delay / 1000;

	switch (mode) {
		case "resize":
			return `transform ${delay}s ease`;
		case "opacity":
			return `opacity ${delay}s ease`;
	}
}
