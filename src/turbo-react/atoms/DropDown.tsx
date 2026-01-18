import { useEffect, useMemo, useRef, useState } from 'react';
import { TTextBox } from './TextBox';
import { TDropDownProps, TMenuItem } from './types';
import { TGlass } from './Glass';
import { TViewport } from './Viewport';
import { TWindow } from './Window';
import { TMenu } from './Menu';
import usePalette from '../hooks/usePalette';
import { TPaletteProvider } from '../contexts/palette';
import { useValue } from '../hooks/useValue';
import { MathUtils } from '../utils/math';
import { TInputProps, TPalette } from '../utils/types';
import { TValueHook } from '../hooks/types';
import { TClosingEffectProvider } from './ClosingEffect';
import useAutoFocus from '../hooks/useAutoFocus';

export function TDropDown(p: TDropDownProps) {
  const menu = p.items.map((item) => ({
    ...item,
    selected: item.id == p.value,
  }));
  const dl = useDropDown(p);

  return (
    <TPaletteProvider {...dl.palette}>
      <TGlass visible={dl.showOpen} backdrop></TGlass>
      <TGlass
        visible={dl.showOpen}
        onClick={() => {
          dl.setShowOpen(false);
        }}
      >
        <TViewport
          divRef={dl.viewportRef}
          rect={{
            x: dl.rect?.x,
            y: dl.windowY,
          }}
          width={dl.rect?.width}
          height={`${dl.height}em`}
        >
          <DropDownWindow
            caption={p.caption}
            v={dl.v}
            menu={menu}
            onClose={() => {
              dl.setShowOpen(false);
              dl.flagDisableFocus.disabled = true;
              dl.inputRef.current?.focus();
              dl.flagDisableFocus.disabled = false;
            }}
            windowPalette={dl.windowPalette}
          ></DropDownWindow>
        </TViewport>
      </TGlass>
      <TTextBox
        {...p}
        inputRef={dl.inputRef}
        value={p.items.find((a) => a.id == dl.v.value)?.label || ''}
        wrapperRef={dl.wrapperRef}
        suffix="▼"
        suffixStyle={{ opacity: p.items.length == 0 ? 0.3 : undefined }}
        readOnly
        inputStyle={{ cursor: p.items.length > 0 ? 'pointer' : undefined }}
        onClick={() => dl.setShowOpen(p.items.length > 0)}
        onFocus={() => handleFocus()}
      ></TTextBox>
    </TPaletteProvider>
  );

  function handleFocus() {
    if (!dl.flagDisableFocus.disabled) {
      dl.setShowOpen(p.items.length > 0);
    }
  }
}

function useDropDown(p: TDropDownProps) {
  const v = useValue(p);

  const plt = usePalette(undefined, p);
  const tmpRef = useRef<HTMLDivElement>(null);
  const tmpInputRef = useRef<HTMLInputElement>(null);
  const [showOpen, setShowOpen] = useState(false);
  const windowPalette = p.windowPalette ?? (plt.palette == 'dialog' ? 'blue' : plt.palette);

  const height = MathUtils.clamp(p.items.length * 2.3 + 2.7, 3, 21);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewportRef.current || !rect) {
      return;
    }
    const viewportRect = viewportRef.current.getBoundingClientRect();
    const y = rect.y + rect.height;
    const diff = y + viewportRect.height - (window.visualViewport?.height || 0);

    setWindowY(y - (diff > 0 ? diff : 0));
  }, [viewportRef.current, showOpen]);

  const [windowY, setWindowY] = useState(0);

  const wrapperRef = p.wrapperRef ?? tmpRef;
  const inputRef = p.inputRef ?? tmpInputRef;
  const rect = wrapperRef.current && wrapperRef.current.getBoundingClientRect();
  const flagDisableFocus = useMemo(() => ({ disabled: false }), []);

  useAutoFocus(p, tmpInputRef);

  return {
    flagDisableFocus,
    height,
    palette: plt,
    rect,
    v,
    windowPalette,
    windowY,

    showOpen,
    setShowOpen,

    inputRef,
    viewportRef,
    wrapperRef,
  };
}

function DropDownWindow(p: {
  caption?: string;
  windowPalette?: TPalette;
  v: TValueHook;
  menu: TMenuItem[];
  onClose: () => void;
}) {
  const mySelRef = useRef<HTMLAnchorElement>(null);

  const [currentValue, setCurrentValue] = useState(p.v.value);
  const displayMenu = p.menu.map((item) => ({ ...item, selected: item.id == currentValue }));

  useEffect(() => {
    if (mySelRef.current) {
      mySelRef.current.focus();
    }
  }, [mySelRef.current]);

  return (
    <TClosingEffectProvider
      emptyMode
      onClose={() => p.onClose()}
      onRender={(onClose, props) => {
        return (
          <TWindow style={props} caption={p.caption} onClose={() => onClose()} fill palette={p.windowPalette}>
            <TMenu
              selectedRef={mySelRef}
              items={displayMenu}
              onClick={(option) => {
                p.v.set(option);
                onClose();
              }}
              onSelect={(option) => setCurrentValue(option)}
            ></TMenu>
          </TWindow>
        );
      }}
    ></TClosingEffectProvider>
  );
}
