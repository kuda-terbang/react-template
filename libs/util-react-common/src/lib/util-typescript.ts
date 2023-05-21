/* eslint-disable @typescript-eslint/no-explicit-any */
export const getDeepValue = <Obj, FirstKey extends keyof Obj>(
  obj: Obj,
  firstKey: FirstKey
): Obj[FirstKey] => {
  return obj[firstKey] as any;
};
