import { TRowLayoutProps } from ".";

export function TRowLayout(p: TRowLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: p.gap ?? "1em",
        ...p.style,
      }}
    >
      {p.children}
    </div>
  );
}
