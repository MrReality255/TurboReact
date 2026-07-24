import { TControlWrapperProps } from ".";

export function ControlWrapper(p: TControlWrapperProps) {
  if (!p.visible) {
    return <></>;
  }
  return (
    <div
      style={{
        gridColumn: p.renderProps?.column,
        gridTemplateColumns: p.renderProps?.columns,
        gap: p.renderProps?.gap,
      }}
    >
      {p.children}
    </div>
  );
}
