import { useState } from "react";

import { IDataContext } from "..";

const defaultInitialState = {
  data: {},
  isValidated: false,
  isDisabled: false,
  isValid: true,
  isLoading: false,
};

export function useDataContext(initialState: IDataContext | undefined) {
  const [ctx, setCtx] = useState<IDataContext>(
    initialState ?? defaultInitialState,
  );

  return { ctx, setCtx };
}
