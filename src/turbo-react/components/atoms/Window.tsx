import { useEffect } from "react";

import { TWindowProps } from ".";

import styles from "./Window.module.css";
import { TPaletteProvider } from "../providers/palette";
import usePalette from "../../hooks/usePalette";
import { StrUtils } from "@mrreality255/turbo-react-forms";

export function TWindow(p: TWindowProps) {
  const plt = usePalette(styles, p);
  const isFill = !!p.fill;

  const innerContent = (
    <>
      <WindowClose {...p}></WindowClose>
      {p.caption && (
        <WindowTitle caption={p.caption} isFill={isFill}></WindowTitle>
      )}
      <WindowContent {...p}></WindowContent>
    </>
  );

  return (
    <TPaletteProvider palette={plt.palette}>
      <div
        className={plt.styles(styles.main, {
          [styles.autoSize]: !isFill,
          [styles.fullSize]: isFill,
          [styles.space]: !isFill && !!p.space,
          [styles.clickable]: !!p.onClick,
        })}
        onClick={p.onClick}
        style={{ ...p.style }}
      >
        {isFill ? (
          <div
            className={plt.styles(styles.outerBox, {
              [styles.shadow]: !p.noShadow,
            })}
          >
            <div className={plt.styles(styles.fullSize, styles.frameBck)}>
              <div
                className={plt.styles(styles.wrapper, {
                  [styles.padding]: !!p.outerPadding,
                })}
              >
                <div
                  className={plt.styles(
                    styles.frame,
                    styles.frameStd,
                    styles.frameBck,
                    {
                      [styles.single]: p.border == "single",
                      [styles.borderless]: p.border == "none",
                    },
                  )}
                >
                  {innerContent}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={plt.styles(styles.frameBck, {
              [styles.shadow]: !p.noShadow,
            })}
          >
            <div className={styles.outerMargin}>
              <div
                className={plt.styles({ [styles.padding]: !!p.outerPadding })}
              >
                <div
                  className={plt.styles(styles.frameStd, {
                    [styles.single]: p.border == "single",
                    [styles.borderless]: p.border == "none",
                  })}
                >
                  {innerContent}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TPaletteProvider>
  );
}

function WindowClose(p: TWindowProps) {
  const plt = usePalette(styles, p);
  return !!p.onClose ? (
    <div className={plt.styles(styles.close, styles.frameBck)}>
      [
      <button onClick={() => p.onClose?.()} className={plt.styles(styles.btn)}>
        ■
      </button>
      ]
    </div>
  ) : (
    <></>
  );
}

function WindowContent(p: TWindowProps) {
  const plt = usePalette(styles, p);

  function hotkeyHandler(event: KeyboardEvent) {
    if (event.key == "Escape") {
      p?.onClose?.();
    }

    p?.onHotKey?.(event.key, event);
  }

  useEffect(() => {
    const hasHotkeyHandler = !!p.onClose || !!p.onHotKey;
    if (hasHotkeyHandler) {
      window.addEventListener("keydown", hotkeyHandler);
    }
    return () => {
      if (hasHotkeyHandler) {
        window.removeEventListener("keydown", hotkeyHandler);
      }
    };
  });

  return (
    <div
      className={plt.styles(styles.content, {
        [styles.contentWithTitle]: !!p.caption || !!p.onClose,
        [styles.contentPadding]: !p.innerPadding,
        [styles.contentPaddingSpace]: p.innerPadding == "space",
      })}
    >
      <div className={plt.styles(styles.contentInsideWrapper)}>
        {p.children}
      </div>
    </div>
  );
}

function WindowTitle(p: { caption: string; isFill: boolean }) {
  return (
    <div className={StrUtils.classes(styles.titleWrapper)}>
      <div
        className={StrUtils.classes(styles.title, {
          [styles.frameBck]: !p.isFill,
        })}
      >
        {p.caption}
      </div>
    </div>
  );
}
