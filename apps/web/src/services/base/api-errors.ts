import { COMMON_ERRORS } from "@opulenka/service";

// Common errors
export const API_ERRORS = {
  CONNECTION_ERROR: "CONNECTION_ERROR",
  ...COMMON_ERRORS,
} as const;

export const apiErrorsByLocale: Record<string, Record<keyof typeof API_ERRORS, string>> = {
  en: {
    [API_ERRORS.CONNECTION_ERROR]: "Connection error",
    [API_ERRORS.SYSTEM_ERROR]: "System error",
    [API_ERRORS.BAD_REQUEST]: "Bad request",
    [API_ERRORS.UNAUTHORIZED]: "Unauthorized",
    [API_ERRORS.FORBIDDEN]: "Forbidden",
  },
  vi: {
    [API_ERRORS.CONNECTION_ERROR]: "Lỗi kết nối",
    [API_ERRORS.SYSTEM_ERROR]: "Lỗi hệ thống",
    [API_ERRORS.BAD_REQUEST]: "Yêu cầu không hợp lệ",
    [API_ERRORS.UNAUTHORIZED]: "Không được phép",
    [API_ERRORS.FORBIDDEN]: "Không được phép truy cập",
  },
};
