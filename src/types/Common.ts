type StringNumberToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

export type {
  StringNumberToNumber
};
