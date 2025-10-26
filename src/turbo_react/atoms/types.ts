import { CSSProperties, RefObject } from "react";
import {
	TControlProps,
	TInputProps,
	TPalette,
	TPaletteProps,
	TRect,
	TViewProps,
} from "../utils/types";

export type TAlignType = "left" | "center" | "right";
export type TButtonVariant = "standard" | "plain" | "link" | "text";
export type TTextBoxMode = "text" | "password" | "number" | "email";
export type TWindowInnerPadding = "none" | "space";

export type TButtonProps = TControlProps & {
	children?: React.ReactNode;

	default?: boolean;
	fill?: boolean;
	variant?: TButtonVariant;
	width?: string | number;
	w0?: boolean;
	w1?: boolean;
	onClick?: () => void;
};

export type TCheckBoxProps = TInputProps & {
	caption?: string;
};

export type TDropDownProps = Omit<TTextBoxProps, "mode"> & {
	items: TMenuItem[];
	inputRef?: RefObject<HTMLInputElement>;
	wrapperRef?: RefObject<HTMLDivElement>;
	windowPalette?: TPalette;
};

export type TErrorPanelProps = TViewProps;

export type TGlassEvent = {
	clientX: number;
	clientY: number;
	buttons: number;
};

export type TGlassProps = {
	backdrop?: boolean;
	children?: React.ReactNode;
	visible: boolean;
	onClick?: () => void;
	onMouseMove?: (e: TGlassEvent) => void;
	onMouseUp?: (e: TGlassEvent) => void;
};

export type TGroupBoxProps = TViewProps & {
	caption?: string;
	disabled?: boolean;
	height?: string | number;
	width?: string | number;
};
export type THeadingProps = TViewProps;

export type TMenuItem = {
	id: string;
	disabled?: boolean;
	label?: string;
	prefix?: string;
	prefixColor?: string;
	prefixWidth?: string | number;
	secondary?: string;
	secondaryColor?: string;
	selected?: boolean;
	withSeparator?: boolean;
};

export type TMenuProps = TPaletteProps & {
	selectedRef?: RefObject<HTMLAnchorElement>;

	items: TMenuItem[];
	onClick?: (id: string) => void;
	onSelect?: (id: string) => void;
};

export type TNameValueItem = {
	name: string | React.ReactNode;
	value: string | React.ReactNode;
	action?: string | React.ReactNode;
};

export type TNameValueProps = TViewProps & {
	name?: string | React.ReactNode;
	action?: string | React.ReactNode;
	actionWidth?: string | number;
	labelWidth?: string | number;
	items?: TNameValueItem[];
};

export type TNotificationProps = TViewProps & {
	style?: CSSProperties;
	timeout?: number;
};

export type TClosingEffect = "resize" | "opacity";

export type TClosingEffectProps = {
	animationDuration?: number;
	effect?: TClosingEffect;
	emptyMode?: boolean;
	onClose?: () => void;
	onRender: (closeFct: () => void, props: CSSProperties) => React.ReactNode;
};

export type TProgressBarProps = TInputProps & {
	blockWidth?: number;
	caption?: string;
	left?: number;
	readOnly?: boolean;
	showValue?: boolean;
};

export type TRadioButtonProps = TInputProps & {
	caption?: string;
};

export type TTableValueProvider<T> =
	| string
	| React.ReactNode
	| ((item: T) => string | React.ReactNode);

export type TTableColumnProps<T extends object> = {
	id: string;
	align?: TAlignType;
	caption?: string | React.ReactNode;
	data?: TTableValueProvider<T>;
	icon?: string;
	sortIcon?: "up" | "down";
	width?: string | number;
};

export type TTableProps<T extends object> = TPaletteProps & {
	data: T[];
	columns: TTableColumnProps<T>[];
	onHeaderClick?: (col: TTableColumnProps<T>, idx: number) => void;
	onRowClick?: (value: T, idx: number) => void;
};

export type TTextBoxProps = TInputProps & {
	align?: TAlignType;
	caption?: string;
	mode?: TTextBoxMode;
	prefix?: string;
	prefixColor?: string;
	prefixStyle?: CSSProperties;
	readOnly?: boolean;
	suffix?: string;
	suffixColor?: string;
	suffixStyle?: CSSProperties;
	inputStyle?: CSSProperties;

	wrapperRef?: RefObject<HTMLDivElement>;
	inputRef?: RefObject<HTMLInputElement>;

	onFocus?: () => void;
	onClick?: () => void;
};

export type TViewportProps = {
	center?: boolean;
	centerV?: boolean;
	centerH?: boolean;
	fill?: boolean;
	children?: React.ReactNode;
	width?: string | number;
	height?: string | number;
	rect?: TRect;
	bgColor?: string;
	scrollbar?: boolean;
	divRef?: RefObject<HTMLDivElement>;
	style?: CSSProperties;
};

export type TWindowProps = TPaletteProps & {
	children?: React.ReactNode;

	fill?: boolean;
	noShadow?: boolean;
	border?: "std" | "single" | "none";
	outerPadding?: boolean;
	innerPadding?: TWindowInnerPadding;
	caption?: string;
	space?: boolean;
	style?: CSSProperties;

	onClick?: () => void;
	onClose?: () => void;
};
