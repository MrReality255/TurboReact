import { TNameValueProps } from "./types";

import styles from "./NameValue.module.css";
import usePalette from "../hooks/usePalette";
import { ViewUtils } from "../utils/view";

export function NameValue(p: TNameValueProps) {
  if (!p.items) {
    return <NameValueSingleItem {...p}></NameValueSingleItem>;
  }

  return (
    <>
      {p.items.map((item, key) => {
        return (
          <NameValueSingleItem
            {...p}
            name={item.name}
            children={item.value}
            action={item.action}
            key={key}
          ></NameValueSingleItem>
        );
      })}
      {p.children && <NameValueSingleItem {...p}></NameValueSingleItem>}
    </>
  );
}

function NameValueSingleItem(p: TNameValueProps) {
  const plt = usePalette(styles, p);

  return (
    <div
      className={plt.styles(styles.nv)}
      style={{
        display: p.labelWidth === undefined ? undefined : "flex",
      }}
    >
      <div className={plt.styles(styles.label)} style={{ width: p.labelWidth }}>
        {p.name}
      </div>
      <div
        className={plt.styles(styles.value)}
        style={{
          display: p.action ? "flex" : undefined,
          gap: p.action ? "1em" : undefined,
        }}
      >
        {ViewUtils.wrapper(
          p.children,
          (x) => (
            <>
              <div style={{ flexGrow: 1 }}>{x}</div>
              <div style={{ width: p.actionWidth, minWidth: p.actionWidth }}>
                {p.action}
              </div>
            </>
          ),
          !!p.action,
        )}
      </div>
    </div>
  );
}
