import { THorizLayoutProps } from ".";

export function HorizLayout(p: THorizLayoutProps) {
	return (
		<div style={{ display: "flex", gap: p.gap }}>
			<div
				style={{
					flexGrow:
						p.leftWidth === undefined && p.rightWidth !== undefined
							? 1
							: undefined,
					width: p.leftWidth,
				}}>
				{p.left}
			</div>
			<div
				style={{
					flexGrow: p.rightWidth === undefined ? 1 : undefined,
					width: p.rightWidth,
					textAlign: p.alignMode == "right" ? "right" : undefined,
				}}>
				{p.children}
			</div>
		</div>
	);
}
