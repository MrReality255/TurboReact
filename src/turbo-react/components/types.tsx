export type TPalette =
  "blue" | "green" | "cyan" | "grey" | "dark" | "red" | "dialog" | "mono";

export type TControlProps = TPaletteProps & {
  autoFocus?: boolean;
  disabled?: boolean;
};

export type TPaletteProps = {
  palette?: TPalette;
};

export type TRect = {
  x?: number | string;
  y?: number | string;
  x2?: number | string;
  y2?: number | string;
};
