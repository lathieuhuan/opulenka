export class ArrayUtils {
  static toArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
  }

  static convertOneOrAll<T, R>(value: T | T[], convert: (value: T) => R): R | R[] {
    return Array.isArray(value) ? value.map(convert) : convert(value);
  }
}
