import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { MathUtils } from "../utils/math";

export function LoadingBar() {
	const barLength = 30;

	const [state, setState] = useState({ v: barLength + 60, dir: 1 });
	useEffect(() => {
		let isActive = true;
		tick(() => isActive);
		return () => {
			isActive = false;
		};
	});

	return (
		<ProgressBar
			value={"" + state.v}
			left={MathUtils.clamp(state.v - barLength, 0, 100)}></ProgressBar>
	);

	function tick(checkActive: () => boolean) {
		setTimeout(() => {
			if (!checkActive()) {
				return;
			}

			setState((oldState) => {
				const value = oldState.v;
				const newDir = (oldState.dir == 1 ? value < 100 : value > barLength)
					? oldState.dir
					: 0 - oldState.dir;

				return { v: value + newDir * 0.25, dir: newDir };
			});
		}, 5);
	}
}
