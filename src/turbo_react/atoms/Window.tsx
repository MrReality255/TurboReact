import { TWindowProps } from ".";
import { PaletteProvider, StrUtils } from "..";
import usePalette from "../hooks/usePalette";
import styles from "./Window.module.css";

export function Window(p: TWindowProps) {
	return p.fill ? (
		<WindowFill {...p}></WindowFill>
	) : (
		<WindowAutoSize {...p}></WindowAutoSize>
	);
}

function WindowAutoSize(p: TWindowProps) {
	const plt = usePalette(styles, p);
	return (
		<PaletteProvider palette={plt.palette}>
			<div
				className={plt.styles(styles.main, styles.autoSize, {
					[styles.space]: !!p.space,
					[styles.clickable]: !!p.onClick,
				})}
				onClick={p.onClick}
				style={{ ...p.style }}>
				<div
					className={plt.styles(styles.frameBck, {
						[styles.shadow]: !p.noShadow,
					})}>
					<div className={styles.outerMargin}>
						<div className={plt.styles({ [styles.padding]: !!p.outerPadding })}>
							<div
								className={plt.styles(styles.frameStd, {
									[styles.single]: p.border == "single",
									[styles.borderless]: p.border == "none",
								})}>
								<WindowClose {...p}></WindowClose>
								{p.caption && <WindowTitle {...p} isFill={false}></WindowTitle>}
								<WindowContent {...p}></WindowContent>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PaletteProvider>
	);
}

function WindowFill(p: TWindowProps) {
	const plt = usePalette(styles, p);
	return (
		<PaletteProvider palette={plt.palette}>
			<div
				className={plt.styles(styles.main, styles.fullSize, {
					[styles.clickable]: !!p.onClick,
				})}
				onClick={p.onClick}
				style={{ ...p.style }}>
				<div
					className={plt.styles(styles.outerBox, {
						[styles.shadow]: !p.noShadow,
					})}>
					<div className={plt.styles(styles.fullSize, styles.frameBck)}>
						<div
							className={plt.styles(styles.wrapper, {
								[styles.padding]: !!p.outerPadding,
							})}>
							<div
								className={plt.styles(
									styles.frame,
									styles.frameStd,
									styles.frameBck,
									{
										[styles.single]: p.border == "single",
										[styles.borderless]: p.border == "none",
									}
								)}>
								<WindowClose {...p}></WindowClose>
								{p.caption && <WindowTitle {...p} isFill={true}></WindowTitle>}
								<WindowContent {...p}></WindowContent>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PaletteProvider>
	);
}

function WindowClose(p: TWindowProps) {
	const plt = usePalette(styles, p);
	return !!p.onClose ? (
		<div className={plt.styles(styles.close, styles.frameBck)}>
			[
			<button onClick={() => p.onClose?.()} className={plt.styles(styles.btn)}>
				■
			</button>
			]
		</div>
	) : (
		<></>
	);
}

function WindowContent(p: TWindowProps) {
	const plt = usePalette(styles, p);
	return (
		<div
			className={plt.styles(styles.content, {
				[styles.contentWithTitle]: !!p.caption || !!p.onClose,
				[styles.contentPadding]: !p.innerPadding,
				[styles.contentPaddingSpace]: p.innerPadding == "space",
			})}>
			<div className={styles.contentInsideWrapper}>{p.children}</div>
		</div>
	);
}

function WindowTitle(p: TWindowProps & { isFill: boolean }) {
	return (
		<div className={StrUtils.classes(styles.titleWrapper)}>
			<div
				className={StrUtils.classes(styles.title, {
					[styles.frameBck]: !p.isFill,
				})}>
				{p.caption}
			</div>
		</div>
	);
}
