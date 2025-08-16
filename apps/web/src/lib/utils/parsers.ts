export function parseSearchParams(
  searchParams: URLSearchParams,
  defaultParams?: Record<string, any>,
) {
  const query: Record<string, any> = {
    ...defaultParams,
  };

  for (const [key, value] of searchParams.entries()) {
    // Convert numeric strings to numbers
    if (!isNaN(Number(value)) && value !== "") {
      query[key] = Number(value);
    } else {
      query[key] = value;
    }
  }

  return query;
}

export function toSearchParams(obj: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();

  for (const key in obj) {
    const value = obj[key];

    if (value !== undefined && value !== null) {
      if (value instanceof Date) {
        params.append(key, value.toISOString());
      } else {
        params.append(key, String(value));
      }
    }
  }
  return params;
}
