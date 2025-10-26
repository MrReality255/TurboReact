import { CSSProperties } from "react";

export type THorizAlignMode = "right";

export type TColLayoutProps = {
	cols: number;
	gap?: number | string;
	lineHeight?: string | number;
	minWidth?: string | number;
	children?: React.ReactNode;
};

export type THorizLayoutProps = {
	children?: React.ReactNode;
	gap?: number | string;
	left?: React.ReactNode;
	leftWidth?: number | string;
	rightWidth?: number | string;
	alignMode?: THorizAlignMode;
};

export type TRowLayoutProps = {
	children?: React.ReactNode;
	gap?: number | string;
	style?: CSSProperties;
};

export type TVertLayoutProps = {
	autoHeight?: boolean;
	children?: React.ReactNode;
	gap?:string|undefined;
	header?: React.ReactNode;
	footer?: React.ReactNode;
};
