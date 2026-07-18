import { IDataContext } from '..';

import { InputUtils } from '../utils/input';
import { useDataContext } from './useDataContext';

export function useNewFormContext(
  initialState: IDataContext | undefined,
  onCtxChange?: (prev: IDataContext) => IDataContext,
) {
  const p = useDataContext(initialState);
  onCtxChange = onCtxChange ?? ((x) => x);

  return InputUtils.newFormContext(p.ctx, (fctUpdate) => p.setCtx((ctx) => onCtxChange(fctUpdate(ctx))));
}
