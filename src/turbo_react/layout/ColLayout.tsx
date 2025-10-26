import React from "react";
import { TColLayoutProps } from "./types";

export function ColLayout(p: TColLayoutProps) {
	const childArray = React.Children.toArray(p.children);
	const rowCount = Math.ceil(childArray.length / p.cols);
	const lines = [...Array(rowCount)].map((_, idx) => {
		const row = childArray.slice(idx * p.cols, (idx + 1) * p.cols);
		const n = [...Array(p.cols)].map((_, idx) =>
			idx < row.length ? row[idx] : ""
		);
		return (
			<div key={idx}
				style={{
					height: p.lineHeight,
					display: "flex",
					gap: p.gap,
					minWidth: p.minWidth,
				}}>
				{n.map((cell,idx) => (
					<div key={idx} style={{ flex: 1, width: "100%" }}>{cell}</div>
				))}
			</div>
		);
	});
	return <div>{lines}</div>;
}
