import { useId } from "react";
import { TCheckBoxProps } from "./types";

import styles from "./CheckBox.module.css";
import usePalette from "../hooks/usePalette";
import { useValue } from "../hooks/useValue";

export function Checkbox(p: TCheckBoxProps) {
	const id = useId();
	const plt = usePalette(styles, p);
	const v = useValue(p);
	return (
		<>
			<input
				checked={v.value == "true"}
				className={plt.styles(styles.cb)}
				id={id}
				type='checkbox'
				disabled={p.disabled}
				onChange={(e) => {
					v.set(e.currentTarget.checked ? "true" : "");
				}}></input>
			{p.caption && (
				<label
					className={plt.styles(styles.cb, { [styles.disabled]: !!p.disabled })}
					htmlFor={id}>
					{p.caption}
				</label>
			)}
		</>
	);
}
