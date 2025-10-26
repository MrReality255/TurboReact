import usePalette from "../hooks/usePalette";
import styles from "./Heading.module.css";
import { THeadingProps } from "./types";

export function Heading(p: THeadingProps) {
	const plt = usePalette(styles, p);
	return <h1 className={plt.styles(styles.heading)}>{p.children}</h1>;
}
