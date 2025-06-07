"use client";

export const notifier = {
  notify: (message: string, type: "success" | "error" | "warning" | "info") => {
    alert(`${type}: ${message}`);
  },
};
