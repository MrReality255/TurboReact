import { useId } from "react";

import styles from "./RadioButton.module.css";
import usePalette from "../hooks/usePalette";
import { TRadioButtonProps } from "./types";

export function RadioButton(p: TRadioButtonProps) {
	const id = useId();
	const plt = usePalette(styles, p);
	return (
		<>
			<input
				className={styles.rb}
				id={id}
				type='radio'
				disabled={p.disabled}></input>
			{p.caption && (
				<label
					className={plt.styles(styles.rb, { [styles.disabled]: !!p.disabled })}
					htmlFor={id}>
					{p.caption}
				</label>
			)}
		</>
	);
}
