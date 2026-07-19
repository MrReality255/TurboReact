import { TAppLayoutProps } from "./types";

import styles from "./AppLayout.module.css";
import usePalette from "../../hooks/usePalette";
import { TViewport } from "../atoms/Viewport";
import { TPaletteProvider } from "../providers/palette";
import { useMobile } from "../../hooks/useMobile";
import { TPalette } from "../types";

const scrollbarPalettes: Record<
  TPalette,
  {
    track: string;
    trackBorder: string;
    thumb: string;
    thumbBorder: string;
    thumbHover: string;
    thumbActive: string;
    button: string;
    buttonBorder: string;
    buttonHover: string;
    corner: string;
  }
> = {
  blue: {
    track: "#003",
    trackBorder: "#006",
    thumb: "#0aa",
    thumbBorder: "#0cc",
    thumbHover: "#0ff",
    thumbActive: "#fff",
    button: "#006",
    buttonBorder: "#099",
    buttonHover: "#099",
    corner: "#003",
  },
  cyan: {
    track: "#033",
    trackBorder: "#066",
    thumb: "#0cc",
    thumbBorder: "#099",
    thumbHover: "#0ff",
    thumbActive: "#fff",
    button: "#066",
    buttonBorder: "#099",
    buttonHover: "#099",
    corner: "#033",
  },
  green: {
    track: "#010",
    trackBorder: "#030",
    thumb: "#0a0",
    thumbBorder: "#0c0",
    thumbHover: "#0f0",
    thumbActive: "#fff",
    button: "#030",
    buttonBorder: "#060",
    buttonHover: "#060",
    corner: "#010",
  },
  red: {
    track: "#200",
    trackBorder: "#600",
    thumb: "#c00",
    thumbBorder: "#f00",
    thumbHover: "#f44",
    thumbActive: "#fff",
    button: "#600",
    buttonBorder: "#900",
    buttonHover: "#900",
    corner: "#200",
  },
  dark: {
    track: "#111",
    trackBorder: "#333",
    thumb: "#990",
    thumbBorder: "#bb0",
    thumbHover: "#ff0",
    thumbActive: "#fff",
    button: "#333",
    buttonBorder: "#550",
    buttonHover: "#550",
    corner: "#111",
  },
  grey: {
    track: "#444",
    trackBorder: "#666",
    thumb: "#aaa",
    thumbBorder: "#ccc",
    thumbHover: "#ddd",
    thumbActive: "#fff",
    button: "#666",
    buttonBorder: "#888",
    buttonHover: "#888",
    corner: "#444",
  },
  dialog: {
    track: "#333",
    trackBorder: "#555",
    thumb: "#999",
    thumbBorder: "#bbb",
    thumbHover: "#ccc",
    thumbActive: "#fff",
    button: "#555",
    buttonBorder: "#777",
    buttonHover: "#777",
    corner: "#333",
  },
  mono: {
    track: "#111",
    trackBorder: "#333",
    thumb: "#777",
    thumbBorder: "#999",
    thumbHover: "#aaa",
    thumbActive: "#fff",
    button: "#333",
    buttonBorder: "#555",
    buttonHover: "#555",
    corner: "#111",
  },
};

export function TAppLayout(p: TAppLayoutProps) {
  const plt = usePalette(styles, p);
  const isMobile = useMobile();

  const sbPalette = scrollbarPalettes[p.scrollbarPalette ?? "cyan"];
  const scrollbarVars = {
    "--sb-track": sbPalette.track,
    "--sb-track-border": sbPalette.trackBorder,
    "--sb-thumb": sbPalette.thumb,
    "--sb-thumb-border": sbPalette.thumbBorder,
    "--sb-thumb-hover": sbPalette.thumbHover,
    "--sb-thumb-active": sbPalette.thumbActive,
    "--sb-button": sbPalette.button,
    "--sb-button-border": sbPalette.buttonBorder,
    "--sb-button-hover": sbPalette.buttonHover,
    "--sb-corner": sbPalette.corner,
  } as React.CSSProperties;

  const layout = {
    ...p,
    ...(isMobile ? p.mobile : undefined),
    sizes: {
      ...p.sizes,
      ...(isMobile ? p.mobile?.sizes : undefined),
    },
  };

  const has = {
    left: !!layout.left && layout.sizes?.left !== 0,
    right: !!layout.right && layout.sizes?.right !== 0,
    footer: !!layout.footer && layout.sizes?.footer !== 0,
    header: !!layout.header && layout.sizes?.header !== 0,
  };

  const sizes = {
    header: has.header ? size(layout.sizes?.header) : 0,
    footer: has.footer ? size(layout.sizes?.footer) : 0,

    left: has.left ? size(layout.sizes?.left, layout.sizes?.leftSpace) : 0,
    right: has.right ? size(layout.sizes?.right, layout.sizes?.rightSpace) : 0,
  };

  return (
    <div className={plt.styles(styles.appLayout)} style={scrollbarVars}>
      <TPaletteProvider palette={plt.palette}>
        <TViewport rect={{ x: 0, y: 0, x2: 0, y2: 0 }}>
          {has.header && (
            <TViewport rect={{ x: 0, y: 0, x2: 0 }} height={sizes.header}>
              {layout.header}
            </TViewport>
          )}
          {has.left && (
            <TViewport
              rect={{ x: 0, y: sizes.header, y2: sizes.footer }}
              width={size(layout.sizes?.left)}
            >
              {layout.left}
            </TViewport>
          )}
          <TViewport
            rect={{
              x: sizes.left,
              y: sizes.header,
              x2: sizes.right,
              y2: sizes.footer,
            }}
            scrollbar
          >
            {p.children}
          </TViewport>
          {has.right && (
            <TViewport
              rect={{ x2: 0, y: sizes.header, y2: sizes.footer }}
              width={size(layout.sizes?.right)}
            >
              {layout.right}
            </TViewport>
          )}
          {has.footer && (
            <TViewport rect={{ x: 0, x2: 0, y2: 0 }} height={sizes.footer}>
              {layout.footer}
            </TViewport>
          )}
        </TViewport>
      </TPaletteProvider>
    </div>
  );

  function size(...v: (number | undefined)[]) {
    const sum = v.filter((a) => a !== undefined).reduce((a, b) => a + b, 0);
    const hasAny = v.find((a) => a !== undefined);

    if (!hasAny) {
      return undefined;
    }

    if (!p.sizeUnit) {
      return sum;
    }
    return sum + p.sizeUnit;
  }
}
