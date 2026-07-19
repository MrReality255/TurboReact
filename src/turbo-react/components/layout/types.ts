import { CSSProperties } from "react";
import { TPalette, TPaletteProps } from "../types";

export type TScrollbarPalette = TPalette;

export type THorizAlignMode = "right";

export type TAppLayoutSizes = {
  header?: number;
  footer?: number;
  left?: number;
  right?: number;
  leftSpace?: number;
  rightSpace?: number;
};

export type TAppLayoutMobileProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sizes?: TAppLayoutSizes;
};

export type TAppLayoutProps = TPaletteProps & {
  children?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sizes?: TAppLayoutSizes;
  sizeUnit?: string;
  mobile?: TAppLayoutMobileProps;
  scrollbarPalette?: TScrollbarPalette;
};

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
  gap?: string | undefined;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};
