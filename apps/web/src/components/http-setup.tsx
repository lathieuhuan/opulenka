"use client";

import { useEffect } from "react";
import { http } from "@/services/base/http";

export function HttpSetup({ locale }: { locale: string }) {
  useEffect(() => {
    http.setLocale(locale);
  }, [locale]);

  return null;
}
