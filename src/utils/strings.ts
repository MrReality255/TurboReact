import { MiscUtils } from "./misc";

export type CssOption = string | Record<string, boolean>;

export const StrUtils = {
  classes: function (...options: CssOption[]) {
    const strOptions = options.map((item) => {
      if (typeof item === "string") {
        return [item];
      }

      return Object.entries(item)
        .filter((c) => c[1])
        .map((c) => c[0]);
    });

    return MiscUtils.distint(strOptions).join(" ");
  },
};
