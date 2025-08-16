export function isoStringToDate(isoString: string): Date | undefined {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return undefined;
  }
  return date;
}

export function isoStringFieldsToDate<T extends object>(obj: T, fields: (keyof T)[]): T {
  for (const key of fields) {
    if (typeof obj[key] === "string") {
      // Default to 2001-01-01 if the ISO string is invalid
      obj[key] = (isoStringToDate(obj[key]) || new Date(978307200000)) as T[typeof key];
    }
  }
  return obj;
}
