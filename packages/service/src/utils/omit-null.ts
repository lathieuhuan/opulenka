import { OmitNull } from "@/types";

export function omitNull<T extends object>(obj: T): OmitNull<T> {
  if (obj) {
    for (const key in obj) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  }
  return obj as OmitNull<T>;
}
