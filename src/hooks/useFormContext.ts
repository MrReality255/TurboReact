import { IDataContext } from "..";

import { InputUtils } from "../utils/input";
import { useDataContext } from "./useDataContext";

export function useNewFormContext(initialState: IDataContext | undefined) {
  const p = useDataContext(initialState);
  return InputUtils.newFormContext(p.ctx, p.setCtx);
}
