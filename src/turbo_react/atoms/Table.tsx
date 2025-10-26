import { TTableColumnProps, TTableProps, TTableValueProvider } from "./types";
import usePalette from "../hooks/usePalette";
import { PaletteProvider } from "../contexts/palette";
import { TPalette } from "../utils/types";
import { useState } from "react";

import styles from "./Table.module.css";
import { DateTime } from "luxon";

export function Table<T extends object>(props: TTableProps<T>) {
	const plt = usePalette(styles, props);

	return (
		<PaletteProvider palette={plt.palette}>
			<table className={plt.styles(styles.tb)}>
				<thead>
					<tr className={styles.hdr}>
						{props.columns.map((p, idx) => {
							return (
								<CellHeader
									key={idx}
									{...p}
									palette={plt.palette}
									onClick={
										props.onHeaderClick
											? () => props.onHeaderClick?.(p, idx)
											: undefined
									}></CellHeader>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{props.data.map((row, idx) => {
						return (
							<tr
								onClick={() => props.onRowClick?.(row, idx)}
								key={idx}
								className={plt.styles({
									[styles.alt]: idx % 2 == 1,
									[styles.ptr]: !!props.onRowClick,
								})}>
								{props.columns.map((p, c) => {
									return (
										<td key={c} style={{ textAlign: p.align }}>
											<CellValue d={p.data} row={row}></CellValue>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</PaletteProvider>
	);
}

function CellHeader<T extends object>(
	p: TTableColumnProps<T> & { palette: TPalette; onClick?: () => void }
) {
	const [showIcon, setShowIcon] = useState(false);
	const plt = usePalette(styles, p);
	let caption = p.caption ?? p.id;
	if (!caption) {
		caption = <>&nbsp;</>;
	}

	const icon = p.icon ?? getSortIcon(p);
	return (
		<th
			style={{
				textAlign: p.align || "left",
				width: p.width,
				cursor: p.onClick ? "pointer" : undefined,
			}}
			onMouseEnter={() => setShowIcon(true)}
			onMouseLeave={() => setShowIcon(false)}
			onClick={() => p.onClick?.()}>
			{showIcon && (
				<span
					className={plt.styles(styles.icon, {
						[styles.iconR]: p.align == "right",
						[styles.ptr]: !!p.onClick,
					})}>
					{icon}
				</span>
			)}
			{caption}
		</th>
	);
}

function CellValue<T extends object>(p: { d: TTableValueProvider<T>; row: T }) {
	if (typeof p.d === "function") {
		const value = p.d(p.row);
		return value;
	}
	const key = p.d;
	if (typeof key === "string") {
		return formatValue((p.row as Record<string, unknown>)[key]);
	}

	return p.d;
}

function formatValue(x: unknown) {
	if (typeof x === "object" && x instanceof DateTime) {
		return x.toLocaleString({ dateStyle: "medium", timeStyle: "medium" });
	}
	return "" + x;
}

function getSortIcon<T extends object>(p: TTableColumnProps<T>) {
	switch (p.sortIcon) {
		case "down":
			return "↓";
		case "up":
			return "↑";
	}
	return undefined;
}
