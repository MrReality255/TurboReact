import { PropsWithChildren } from "react";
import { TControlContainerProps } from "./types";

export function TControlContainer(
  p: PropsWithChildren<TControlContainerProps>,
) {
  return (
    <div
      style={{
        gridTemplateColumns: p.columns,
        display: p.columns ? "grid" : undefined,
        gap: p.gap,
      }}
    >
      {p.children}
    </div>
  );
}
