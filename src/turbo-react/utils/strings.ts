import { DateTime } from "luxon";
import { MiscUtils } from "./misc";

export type CssOption = string | Record<string, boolean>;
export type TDateTimeFormat = "datetime" | "date" | "time";

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

  formatDateTime: function (
    x: DateTime | string | number | undefined,
    fmt: TDateTimeFormat
  ) {
    if (typeof x !== "object") {
      x = StrUtils.parseDateTime(x);
    }
    return formatDateTime(x, fmt);
  },

  parseDateTime: function (
    x: string | number | undefined
  ): DateTime | undefined {
    switch (typeof x) {
      case "undefined":
        return undefined;
      case "number":
        return parseDateTimeNr(x);
    }
  },
};

function formatDateTime(dt: DateTime | undefined, fmt: TDateTimeFormat) {
  if (!dt || dt.toUnixInteger() == 0) {
    return "---";
  }

  switch (fmt) {
    case "datetime":
      return dt.toLocaleString({ dateStyle: "short", timeStyle: "medium" });
    case "date":
      return dt.toLocaleString({ dateStyle: "short" });
    case "time":
      return dt.toLocaleString({ timeStyle: "medium" });
  }
}

function parseDateTimeNr(x: number): DateTime | undefined {
  switch (true) {
    case x < 0:
      return undefined;
    case x < 10000000000:
      return DateTime.fromSeconds(x);
    default:
      return DateTime.fromMillis(x);
  }
}
