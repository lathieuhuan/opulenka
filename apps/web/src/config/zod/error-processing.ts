export class ErrorEncoder {
  static minLength(min: number | bigint | string) {
    return `MIN_LENGTH|min:${typeof min === "bigint" ? min.toString() : min}`;
  }
}

export class ErrorDecoder {
  static decode(error: string) {
    const [key, ...paramPairs] = error.split("|");
    const params = paramPairs.reduce<Record<string, string>>((acc, param) => {
      const [key, value] = param.split(":");
      acc[key] = value;
      return acc;
    }, {});
    return { key, params };
  }
}
