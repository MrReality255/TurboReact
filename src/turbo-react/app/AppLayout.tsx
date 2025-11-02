import { TAppLayoutProps } from "./types";

import styles from "./AppLayout.module.css";
import usePalette from "../hooks/usePalette";
import { Viewport } from "../atoms/Viewport";
import { PaletteProvider } from "../contexts/palette";
import { useMobile } from "../hooks/useMobile";

export function AppLayout(p: TAppLayoutProps) {
  const plt = usePalette(styles, p);
  const isMobile = useMobile();

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
    <div className={plt.styles(styles.appLayout)}>
      <PaletteProvider palette={plt.palette}>
        <Viewport rect={{ x: 0, y: 0, x2: 0, y2: 0 }}>
          {has.header && (
            <Viewport rect={{ x: 0, y: 0, x2: 0 }} height={sizes.header}>
              {layout.header}
            </Viewport>
          )}
          {has.left && (
            <Viewport
              rect={{ x: 0, y: sizes.header, y2: sizes.footer }}
              width={size(layout.sizes?.left)}
            >
              {layout.left}
            </Viewport>
          )}
          <Viewport
            rect={{
              x: sizes.left,
              y: sizes.header,
              x2: sizes.right,
              y2: sizes.footer,
            }}
            scrollbar
          >
            {p.children}
          </Viewport>
          {has.right && (
            <Viewport
              rect={{ x2: 0, y: sizes.header, y2: sizes.footer }}
              width={size(layout.sizes?.right)}
            >
              {layout.right}
            </Viewport>
          )}
          {has.footer && (
            <Viewport rect={{ x: 0, x2: 0, y2: 0 }} height={sizes.footer}>
              {layout.footer}
            </Viewport>
          )}
        </Viewport>
      </PaletteProvider>
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
