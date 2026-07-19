import { useState } from "react";

import styles from "./Table.module.css";
import { DateTime } from "luxon";
import usePalette from "../../hooks/usePalette";
import { useMobile } from "../../hooks/useMobile";
import {
  TPaletteProvider,
  TTableColumnProps,
  TTableProps,
  TTableValueProvider,
} from "../..";
import { TPalette } from "../types";

export function TTable<T extends object>(props: TTableProps<T>) {
  const plt = usePalette(styles, props);

  return (
    <TPaletteProvider palette={plt.palette}>
      <table className={plt.styles(styles.tb)}>
        <thead>
          <tr className={styles.hdr}>
            {props.columns.map((p, idx) => {
              return (
                <CellHeader
                  key={idx}
                  {...p}
                  palette={plt.palette}
                  onClick={
                    props.onHeaderClick
                      ? () => props.onHeaderClick?.(p, idx)
                      : undefined
                  }
                ></CellHeader>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, idx) => {
            const key = props.rowKey ? props.rowKey(row, idx) : idx;
            return (
              <tr
                onClick={() => props.onRowClick?.(row, idx)}
                key={key}
                className={plt.styles({
                  [styles.alt]: idx % 2 === 1,
                  [styles.ptr]: !!props.onRowClick,
                })}
              >
                {props.columns.map((p, c) => {
                  return (
                    <td key={c} style={{ textAlign: p.align }}>
                      <CellValue
                        d={p.data}
                        row={row}
                        onFormat={p.onFormat}
                      ></CellValue>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TPaletteProvider>
  );
}

function CellHeader<T extends object>(
  p: TTableColumnProps<T> & { palette: TPalette; onClick?: () => void },
) {
  const [showIcon, setShowIcon] = useState(false);
  const isMobile = useMobile();
  const plt = usePalette(styles, p);
  let caption = p.caption ?? p.id;
  if (!caption) {
    caption = <>&nbsp;</>;
  }

  const icon = p.icon ?? getSortIcon(p);
  const iconVisible = isMobile ? !!icon : showIcon;

  return (
    <th
      style={{
        textAlign: p.align || "left",
        width: p.width,
        cursor: p.onClick ? "pointer" : undefined,
      }}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      onClick={() => p.onClick?.()}
    >
      {iconVisible && (
        <span
          className={plt.styles(styles.icon, {
            [styles.iconR]: p.align === "right",
            [styles.ptr]: !!p.onClick,
          })}
        >
          {icon}
        </span>
      )}
      {caption}
    </th>
  );
}

function CellValue<T extends object>(p: {
  d: TTableValueProvider<T> | undefined;
  row: T;
  onFormat?: (value: unknown) => string | React.ReactNode;
}) {
  if (typeof p.d === "function") {
    return p.d(p.row);
  }
  if (typeof p.d === "string") {
    const raw = (p.row as Record<string, unknown>)[p.d];
    if (p.onFormat) {
      return p.onFormat(raw);
    }
    return formatValue(raw);
  }
  return p.d;
}

function formatValue(x: unknown) {
  if (
    typeof x === "object" &&
    x !== null &&
    "toLocaleString" in x &&
    x instanceof DateTime
  ) {
    return x.toLocaleString({ dateStyle: "medium", timeStyle: "medium" });
  }
  return "" + x;
}

function getSortIcon<T extends object>(p: TTableColumnProps<T>) {
  switch (p.sortIcon) {
    case "down":
      return "↓";
    case "up":
      return "↑";
  }
  return undefined;
}
