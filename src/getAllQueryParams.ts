import type { QueryParams } from "./types.js";

export function getAllQueryParams(
  input: string | URLSearchParams
): QueryParams {
  let searchParams: URLSearchParams;

  if (typeof input === "string") {
    const queryString = input.startsWith("?") ? input.slice(1) : input;
    searchParams = new URLSearchParams(queryString);
  } else {
    searchParams = input;
  }

  const result: QueryParams = {};

  searchParams.forEach((value, key) => {
    const existingValue = result[key];

    if (existingValue === undefined) {
      result[key] = value;
      return;
    }

    result[key] = Array.isArray(existingValue)
      ? existingValue.concat(value)
      : [existingValue, value];
  });

  return result;
}