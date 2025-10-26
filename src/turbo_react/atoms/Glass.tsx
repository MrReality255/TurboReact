import { useState } from "react";
import styles from "./Glass.module.css";
import { TGlassEvent, TGlassProps } from "./types";

export function Glass(p: TGlassProps) {
	const [lastTouch, setLastTouch] = useState<TGlassEvent | null>(null);
	return p.visible ? (
		<div
			className={styles.glass + (p.backdrop ? " " + styles.backdrop : "")}
			onClick={() => p.onClick?.()}
			onTouchMove={(e) => {
				e.preventDefault();
				e.stopPropagation();
				const touchRec = {
					buttons: 1,
					clientX: e.touches[0].clientX,
					clientY: e.touches[0].clientY,
				};
				p.onMouseMove?.(touchRec);
				setLastTouch(touchRec);
			}}
			onTouchStart={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onTouchEnd={() => {
				lastTouch && p.onMouseUp?.(lastTouch);
			}}
			onPointerMove={(e) => {
				e.preventDefault();
				e.stopPropagation();
				e.preventDefault();
				p.onMouseMove?.(e);
			}}
			onPointerUp={(e) => p.onMouseUp?.(e)}>
			{p.children}
		</div>
	) : (
		<></>
	);
}
