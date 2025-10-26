export type TControlProps = TPaletteProps & {
	disabled?: boolean;
};

export type TInputProps = TControlProps & {
	defaultValue?: string;
	value?: string;
	onChange?: (newValue: string) => void;
	onChanging?: (newValue: string) => string;
};

export type TMouseState = {
	x: number;
	y: number;
	buttons: number;
};

export type TPaletteProps = {
	palette?: TPalette;
};

export type TViewProps = TPaletteProps & {
	children?: React.ReactNode;
};

export type TPalette =
	| "blue"
	| "green"
	| "cyan"
	| "grey"
	| "dark"
	| "red"
	| "dialog"
	| "mono";

export type TRect = {
	x?: number | string;
	y?: number | string;
	x2?: number | string;
	y2?: number | string;
};
