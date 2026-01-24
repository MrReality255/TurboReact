import { useEffect, useMemo, useRef, useState } from 'react';
import { TTextBox } from './TextBox';
import { TCompactKeyEvent, TDropDownProps, TMenuItem } from './types';
import { TGlass } from './Glass';
import { TViewport } from './Viewport';
import { TWindow } from './Window';
import { TMenu } from './Menu';
import usePalette from '../hooks/usePalette';
import { TPaletteProvider } from '../contexts/palette';
import { useValue } from '../hooks/useValue';
import { MathUtils } from '../utils/math';
import { TPalette } from '../utils/types';
import { TValueHook } from '../hooks/types';
import { TClosingEffectProvider } from './ClosingEffect';
import useAutoFocus from '../hooks/useAutoFocus';
import { TButton } from '.';

type TDropDownLayoutProps = TDropDownProps & {
  dl: ReturnType<typeof useDropDown>;
  popup: React.ReactNode;
  children?: React.ReactNode;
};

export function TDropDown(p: TDropDownProps) {
  const menu = p.items
    .map((item) => ({
      ...item,
      selected: item.id == p.value,
      id: p.mode == 'combo' ? item.label || '' : item.id,
    }))
    .filter((item) => item.id);
  const dl = useDropDown(p);

  return (
    <TDropDownLayout
      {...p}
      dl={dl}
      popup={
        <DropDownWindow
          autoFocus={true}
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
      }
    >
      <TTextBox
        {...p}
        mode="text"
        inputRef={dl.inputRef}
        value={getValue()}
        wrapperRef={dl.wrapperRef}
        suffix={
          <TButton variant="link" disabled={p.disabled} onClick={() => openPopup()}>
            ▼
          </TButton>
        }
        suffixStyle={{ opacity: p.items.length == 0 ? 0.3 : undefined }}
        readOnly={dl.mode == 'select'}
        inputStyle={{ cursor: p.items.length > 0 ? 'pointer' : undefined }}
        onClick={() => handleClick()}
        onFocus={() => handleFocus()}
        onChange={(newValue) => handleChange(newValue)}
        onKeyDown={(k, e) => handleKeyDown(k, e)}
      ></TTextBox>
    </TDropDownLayout>
  );

  function getValue() {
    switch (dl.mode) {
      case 'select':
        return p.items.find((a) => a.id == dl.v.value)?.label || '';
      case 'combo':
        return p.value;
    }
  }

  function handleClick() {
    if (dl.mode == 'select') {
      openPopup();
    }
    if (dl.mode == 'combo' && !p.value) {
      openPopup();
    }
  }

  function handleChange(newValue: string) {
    switch (dl.mode) {
      case 'combo':
        dl.v.set(newValue);
        break;
    }
  }

  function handleFocus() {
    if (!dl.flagDisableFocus.disabled && dl.mode == 'select') {
      dl.setShowOpen(p.items.length > 0);
    }
  }

  function handleKeyDown(k: string, e: TCompactKeyEvent): void {
    if (k == 'ArrowUp' || k == 'ArrowDown' || k == 'F3') {
      openPopup();
      e.stopPropagation();
    }
  }

  function openPopup() {
    dl.setShowOpen(p.items.length > 0);
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
    mode: p.mode || 'select',
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

function TDropDownLayout(p: TDropDownLayoutProps) {
  const dl = p.dl;
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
          {p.popup}
        </TViewport>
      </TGlass>
      {p.children}
    </TPaletteProvider>
  );
}

function DropDownWindow(p: {
  caption?: string;
  windowPalette?: TPalette;
  v: TValueHook;
  menu: TMenuItem[];
  autoFocus: boolean;
  onClose: () => void;
}) {
  const mySelRef = useRef<HTMLAnchorElement>(null);

  const [currentValue, setCurrentValue] = useState(p.v.value);
  const displayMenu = p.menu.map((item) => ({
    ...item,
    selected: item.id == currentValue,
  }));

  useEffect(() => {
    if (mySelRef.current && p.autoFocus) {
      mySelRef.current.focus();
    }
  }, [mySelRef.current, p.autoFocus]);

  return (
    <TClosingEffectProvider
      emptyMode
      onClose={() => p.onClose()}
      onRender={(onClose, props) => {
        return (
          <TWindow
            onHotKey={(k, e) => handleHotkey(k, e, onClose)}
            style={props}
            caption={p.caption}
            onClose={() => onClose()}
            fill
            palette={p.windowPalette}
          >
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

  function handleHotkey(k: string, _e: TCompactKeyEvent, onClose: () => void): void {
    if (k >= '1' && k <= '9') {
      const idx = parseInt(k) - 1;
      if (idx < p.menu.length) {
        p.v.set(p.menu[idx].id);
        onClose();
      }
    }
  }
}
