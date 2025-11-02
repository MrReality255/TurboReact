import { createContext, useState } from "react";
import { RowLayout } from "..";

type TLayerState = {
  layers: TLayerRenderer[];
  rows: TLayerRenderer[];
};

export type TLayerRenderer = (hideFct: () => void) => React.ReactNode;
export type TLayerUpdater = (fct: (x: TLayerState) => TLayerState) => void;

export type TLayerRenderContext = {
  layers: TLayerRenderer[];
  rows: TLayerRenderer[];
  update: TLayerUpdater;
};

export interface ILayerManager {
  show: (fct: TLayerRenderer) => () => void;
  showRow: (fct: TLayerRenderer) => () => void;
  hide: () => void;
}

export const CtxLayerRenderContext = createContext<TLayerRenderContext | null>(
  null,
);
export const CtxLayerManager = createContext<ILayerManager | null>(null);

export function LayerContainer(p: { children?: React.ReactNode }) {
  const [container, updateContainer] = useState<TLayerState>({
    layers: [],
    rows: [],
  });

  return (
    <CtxLayerRenderContext.Provider
      value={{
        layers: container.layers,
        rows: container.rows,
        update: updateContainer,
      }}
    >
      <CtxLayerManager.Provider
        value={createMainLayerManager(container, updateContainer)}
      >
        {p.children}
      </CtxLayerManager.Provider>
      {container.layers.map((renderer, idx) => {
        const mgr = createLayerManager(idx, container, updateContainer, false);
        return (
          <CtxLayerManager.Provider key={idx} value={mgr}>
            {renderer(() => mgr.hide())}
          </CtxLayerManager.Provider>
        );
      })}
      <Rows container={container} updateContainer={updateContainer}></Rows>
    </CtxLayerRenderContext.Provider>
  );
}

function Rows({
  container,
  updateContainer,
}: {
  container: TLayerState;
  updateContainer: React.Dispatch<React.SetStateAction<TLayerState>>;
}) {
  return (
    <RowLayout>
      {container.rows.map((renderer, idx) => {
        const mgr = createLayerManager(idx, container, updateContainer, true);
        return (
          <CtxLayerManager.Provider key={idx} value={mgr}>
            {renderer(() => mgr.hide())}
          </CtxLayerManager.Provider>
        );
      })}
    </RowLayout>
  );
}

function createMainLayerManager(container: TLayerState, update: TLayerUpdater) {
  return createLayerManager(-1, container, update, false);
}

function createLayerManager(
  idx: number,
  container: TLayerState,
  update: TLayerUpdater,
  isRow: boolean,
): ILayerManager {
  return {
    show: function (r: TLayerRenderer) {
      const newContainer: TLayerState = {
        layers: [...container.layers, r],
        rows: container.rows,
      };
      const newIdx = newContainer.layers.length - 1;
      update(() => newContainer);
      return function () {
        update((newC) => {
          return {
            layers: newC.layers.filter((_, i) => i < newIdx),
            rows: newC.rows,
          };
        });
      };
    },
    showRow: function (r: TLayerRenderer) {
      const newContainer: TLayerState = {
        rows: [...container.rows, r],
        layers: container.layers,
      };
      const newIdx = newContainer.rows.length - 1;
      update(() => newContainer);
      return function () {
        update((newC) => {
          return {
            rows: newC.rows.filter((_, i) => i < newIdx),
            layers: newC.layers,
          };
        });
      };
    },
    hide: function () {
      if (isRow) {
        update((newC) => {
          return {
            rows: newC.rows.filter((_, i) => i < idx),
            layers: newC.layers,
          };
        });
      }
      update((newC) => {
        return {
          layers: newC.layers.filter((_, i) => i < idx),
          rows: newC.rows,
        };
      });
    },
  };
}
