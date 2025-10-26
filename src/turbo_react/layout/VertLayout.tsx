import { TVertLayoutProps } from ".";

export function VertLayout(p: TVertLayoutProps) {
	return (
		<div
			style={{
				gap: p.gap,
				flexDirection: "column",
				display: "flex",
				width: "100%",
				height: p.autoHeight ? undefined : "100%",
			}}>
			{p.header && <div>{p.header}</div>}
			<div style={{ overflow: "auto", flexGrow: 1, position: "relative" }}>
				{p.children}
			</div>
			{p.footer && <div>{p.footer}</div>}
		</div>
	);
}
