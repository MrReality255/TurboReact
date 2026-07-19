import { CSSProperties, RefObject } from "react";
import { TControlProps, TPaletteProps, TRect } from "../types";

export type TButtonVariant = "standard" | "plain" | "link" | "text";
export type TWindowInnerPadding = "none" | "space";

export type TButtonProps = TControlProps & {
  children?: React.ReactNode;

  default?: boolean;
  down?: boolean;
  fill?: boolean;
  variant?: TButtonVariant;
  width?: string | number;
  w0?: boolean;
  w1?: boolean;
  onClick?: () => void;
};

export type TMenuItemProps = {
  id: string;
  disabled?: boolean;
  caption?: string;
  prefix?: string;
  prefixColor?: string;
  prefixWidth?: string | number;
  secondary?: string;
  secondaryColor?: string;
  selected?: boolean;
  withSeparator?: boolean;
};

export type TMenuEventHandlerRef = {
  current: null | ((keyCode: string) => boolean);
};

export type TMenuProps = TPaletteProps & {
  selectedRef?: RefObject<HTMLAnchorElement | null>;
  menuEventHandlerRef?: TMenuEventHandlerRef;

  items: TMenuItemProps[];
  onClick?: (id: string) => void;
  onSelect?: (id: string) => void;
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
  divRef?: RefObject<HTMLDivElement | null>;
  style?: CSSProperties;
  padding?: {
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
  };
  onClick?: (e: { stopPropagation: () => void }) => void;
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
  onHotKey?: (hotkey: string, event: KeyboardEvent) => void;
};
