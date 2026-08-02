import { useClosingEffect } from "@mrreality255/turbo-react-forms";
import { TControlWrapperProps } from ".";

export function ControlWrapper(p: TControlWrapperProps) {
  const ce = useClosingEffect({
    initialState: p.visible,
    initialTargetState: p.visible,
    mode: "fall",
    visible: p.visible,
  });

  if (!ce.isVisible) {
    return <></>;
  }
  return (
    <div
      style={{
        ...ce.get(),
        gridColumn: p.renderProps?.column,
        gridTemplateColumns: p.renderProps?.columns,
        gap: p.renderProps?.gap,
      }}
    >
      {p.children}
    </div>
  );
}
