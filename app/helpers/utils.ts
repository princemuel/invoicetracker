import { cx as clsx, type CxOptions } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
        },
      ],
    },
  },
});

export function tw(...inputs: CxOptions) {
  return customTwMerge(clsx(inputs));
}

/*---------------------------------*
            NUMBER UTILS           *
  ---------------------------------*
 */

export function approximate(num = 0, fractionDigits = 2) {
  return Number.parseFloat(num.toFixed(fractionDigits));
}

export function safeNum(value: any, defaultValue = 0): number {
  const num = Number(value);
  return (Number.isNaN(num) || isNaN(num)) && !Object.is(num, 0) ?
      defaultValue
    : num;
}

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}

interface Item {
  quantity?: number;
  price?: number;
  total?: number;
}
type FirstArg = number | Item[];

export function calculateTotal<T extends FirstArg>(
  a?: T,
  b?: T extends number ? NonNullable<T>
  : T extends (infer _)[] ? "total"
  : never,
) {
  if (Array.isArray(a)) {
    return a.reduce((acc, item) => {
      const { total = 0, quantity = 0, price = 0 } = item;
      return b === "total" ? acc + total : acc + quantity * price;
    }, 0);
  }

  // bailout since the function expects 2 number params, or an array params
  return safeNum(a) * safeNum(b);
}

export const formatAmount = (price = 0, fractionDigits = 2) => {
  return Intl.NumberFormat("en-GB", {
    maximumFractionDigits: fractionDigits,
    style: "currency",
    currency: "GBP",
  }).format(price);
};

/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(
  value: T[] | null | undefined,
): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

/*---------------------------------*
            OBJECT UTILS           *
  ---------------------------------*
 */

export function serialize<T>(data: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(data));
}

export function singleton<T>(name: string, callback: () => T): NonNullable<T> {
  const g = globalThis as any;
  g.__singletons ??= new Map();

  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name);
}

/*---------------------------------*
            MISC                   *
  ---------------------------------*
 */

export function buildItemCountMsg(message: string) {
  return function (data: any[]) {
    const itemCount = data?.length || 0;
    const verb = itemCount === 1 ? "is" : "are";

    return message
      .replace("{{ verb }}", verb)
      .replace("{{ count }}", `${itemCount}`);
  };
}
