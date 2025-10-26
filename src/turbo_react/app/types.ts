import { TPalette } from "../utils/types";

type TAppLayoutSizeBlock = {
	footer?: number;
	header?: number;
	left?: number;
	right?: number;

	leftSpace?: number;
	rightSpace?: number;
};

type TAppLayoutBlocks = {
	footer?: React.ReactNode;
	header?: React.ReactNode;
	left?: React.ReactNode;
	right?: React.ReactNode;
};

export type TAppContainerProps = {
	children?: React.ReactNode;
};

export type TAppLayoutProps = TAppLayoutBlocks & {
	children?: React.ReactNode;
	palette?: TPalette;

	sizeUnit?: string;
	sizes?: TAppLayoutSizeBlock;
	mobile?: TAppLayoutBlocks & {
		sizes?: TAppLayoutSizeBlock;
	};
};
