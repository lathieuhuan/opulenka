export class StringUtils {
  static isEmpty(str?: string | null) {
    return !str || str.trim() === "";
  }
}
