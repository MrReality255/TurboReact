import { TWindow } from '../atoms/Window';
import { TPaletteProvider } from '../contexts/palette';
import usePalette from '../hooks/usePalette';
import { TErrorPanelProps } from './types';

export function TErrorPanel(p: TErrorPanelProps) {
  const plt = usePalette(undefined, p);
  return (
    <TPaletteProvider palette={plt.palette}>
      <TWindow palette="red" border="none" innerPadding="none" noShadow>
        <div style={{ marginTop: '0.0em', marginBottom: '0.0em' }}>{p.children}</div>
      </TWindow>
    </TPaletteProvider>
  );
}
