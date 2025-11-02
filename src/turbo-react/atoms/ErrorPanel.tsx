import { Window } from "../atoms/Window";
import { PaletteProvider } from "../contexts/palette";
import usePalette from "../hooks/usePalette";
import { TErrorPanelProps } from "./types";

export function ErrorPanel(p: TErrorPanelProps) {
  const plt = usePalette(undefined, p);
  return (
    <PaletteProvider palette={plt.palette}>
      <Window palette="red" border="none" innerPadding="none" noShadow>
        <div style={{ marginTop: "0.25em", marginBottom: "0.25em" }}>
          {p.children}
        </div>
      </Window>
    </PaletteProvider>
  );
}
