import { useEffect, useMemo, useRef, useState } from "react";
import { TextBox } from "./TextBox";
import { TDropDownProps, TMenuItem } from "./types";
import { Glass } from "./Glass";
import { Viewport } from "./Viewport";
import { Window } from "./Window";
import { Menu } from "./Menu";
import usePalette from "../hooks/usePalette";
import { PaletteProvider } from "../contexts/palette";
import { useValue } from "../hooks/useValue";
import { MathUtils } from "../utils/math";
import { TPalette } from "../utils/types";
import { TValueHook } from "../hooks/types";
import { ClosingEffect } from "./ClosingEffect";

export function DropDown(p: TDropDownProps) {
  const plt = usePalette(undefined, p);
  const tmpRef = useRef<HTMLDivElement>(null);
  const tmpInputRef = useRef<HTMLInputElement>(null);
  const [showOpen, setShowOpen] = useState(false);
  const v = useValue(p);

  const windowPalette =
    p.windowPalette ?? (plt.palette == "dialog" ? "blue" : plt.palette);
  const menu = p.items.map((item) => ({
    ...item,
    selected: item.id == p.value,
  }));
  const height = MathUtils.clamp(p.items.length * 2.3 + 2.7, 3, 21);

  const [windowY, setWindowY] = useState(0);

  const wrapperRef = p.wrapperRef ?? tmpRef;
  const inputRef = p.inputRef ?? tmpInputRef;
  const rect = wrapperRef.current && wrapperRef.current.getBoundingClientRect();
  const viewportRef = useRef<HTMLDivElement>(null);
  const flagDisableFocus = useMemo(() => ({ disabled: false }), []);

  useEffect(() => {
    if (!viewportRef.current || !rect) {
      return;
    }
    const viewportRect = viewportRef.current.getBoundingClientRect();
    const y = rect.y + rect.height;
    const diff = y + viewportRect.height - (window.visualViewport?.height || 0);

    setWindowY(y - (diff > 0 ? diff : 0));
  }, [viewportRef.current, showOpen]);

  return (
    <PaletteProvider {...plt}>
      <Glass visible={showOpen} backdrop></Glass>
      <Glass
        visible={showOpen}
        onClick={() => {
          setShowOpen(false);
        }}
      >
        <Viewport
          divRef={viewportRef}
          rect={{
            x: rect?.x,
            y: windowY,
          }}
          width={rect?.width}
          height={`${height}em`}
        >
          <DropDownWindow
            caption={p.caption}
            v={v}
            menu={menu}
            onClose={() => {
              setShowOpen(false);
              flagDisableFocus.disabled = true;
              inputRef.current?.focus();
              flagDisableFocus.disabled = false;
            }}
            windowPalette={windowPalette}
          ></DropDownWindow>
        </Viewport>
      </Glass>
      <TextBox
        {...p}
        inputRef={inputRef}
        value={v.value}
        wrapperRef={p.wrapperRef ?? tmpRef}
        suffix="▼"
        suffixStyle={{ opacity: p.items.length == 0 ? 0.3 : undefined }}
        readOnly
        inputStyle={{ cursor: p.items.length > 0 ? "pointer" : undefined }}
        onClick={() => setShowOpen(p.items.length > 0)}
        onFocus={() => handleFocus()}
      ></TextBox>
    </PaletteProvider>
  );

  function handleFocus() {
    if (!flagDisableFocus.disabled) {
      setShowOpen(p.items.length > 0);
    }
  }
}

function DropDownWindow(p: {
  caption?: string;
  windowPalette?: TPalette;
  v: TValueHook;
  menu: TMenuItem[];
  onClose: () => void;
}) {
  const mySelRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (mySelRef.current) {
      mySelRef.current.focus();
    }
  }, [mySelRef.current]);

  return (
    <ClosingEffect
      emptyMode
      onClose={() => p.onClose()}
      onRender={(onClose, props) => {
        return (
          <Window
            style={props}
            caption={p.caption}
            onClose={() => onClose()}
            fill
            palette={p.windowPalette}
          >
            <Menu
              selectedRef={mySelRef}
              items={p.menu}
              onClick={(option) => {
                p.v.set(option);
                onClose();
              }}
              onSelect={(option) => p.v.set(option)}
            ></Menu>
          </Window>
        );
      }}
    ></ClosingEffect>
  );
}
