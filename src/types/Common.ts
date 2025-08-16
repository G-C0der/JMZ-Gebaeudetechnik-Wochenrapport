type NumericStringToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

export type {
  NumericStringToNumber
};
