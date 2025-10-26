import { TMenuProps } from "./types";

import styles from "./Menu.module.css";
import usePalette from "../hooks/usePalette";
import { KeyboardEvent, useRef } from "react";
import { MathUtils } from "../utils/math";

export function Menu(p: TMenuProps) {
	const plt = usePalette(styles, p);
	const mySelRef = useRef<HTMLAnchorElement>(null);
	const firstSelected = MathUtils.clamp(
		p.items.findIndex((item) => item.selected),
		0,
		p.items.length
	);
	const selRef = p.selectedRef ?? mySelRef

	return (
		<div className={plt.styles(styles.menu)}>
			<ul>
				{p.items.map((item, idx) => (
					<li
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							p.onClick?.(item.id);
						}}
						key={item.id}
						className={plt.styles({
							[styles.separator]: !!item.withSeparator,
							[styles.selected]: !!item.selected,
							[styles.disabled]: !!item.disabled,
						})}>
						<a
							ref={firstSelected == idx ? selRef : undefined}
							onKeyDown={(k) => handleKey(k)}
							href='#'
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								p.onClick?.(item.id);
							}}>
							<span
								className={styles.prefix}
								style={{ color: item.prefixColor, width: item.prefixWidth }}>
								{item.prefix}
							</span>
							{item.label || item.id}
							<span
								className={styles.secondary}
								style={{ color: item.secondaryColor }}>
								{item.secondary}
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);

	function handleKey(k: KeyboardEvent<HTMLAnchorElement>): void {
		switch (k.code) {
			case "ArrowDown":
				k.stopPropagation();
				k.preventDefault();
				p.onSelect?.(findNext(1, true));
				break;
			case "ArrowUp":
				k.stopPropagation();
				k.preventDefault();
				p.onSelect?.(findNext(-1, true));
				break;
			case "Home":
				k.stopPropagation();
				k.preventDefault();
				p.onSelect?.(findNext(0, false));
				break;
			case "End":
				k.stopPropagation();
				k.preventDefault();
				p.onSelect?.(findNext(-1, false));
				break;
			case "PageUp":
				k.stopPropagation();
				k.preventDefault();
				p.onSelect?.(findNext(-10, true));
				break;
			case "PageDown":
				k.stopPropagation();
				k.preventDefault();
				p.onSelect?.(findNext(10, true));
				break;
			default:
				console.log(k.code);
		}
	}

	function findNext(pos: number, isRelative: boolean) {
		return p.items[findNextIdx(pos, isRelative)].id;
	}

	function findNextIdx(pos: number, isRelative: boolean) {
		const dir = pos >= 0 ? 1 : -1;
		pos = MathUtils.clamp(
			isRelative ? firstSelected + pos : pos == -1 ? p.items.length - 1 : pos,
			0,
			p.items.length - 1
		);
		while (pos >= 0 && pos < p.items.length) {
			if (p.items[pos] && !p.items[pos].disabled) {
				return pos;
			}
			pos += dir;
		}
		return pos;
	}
}
