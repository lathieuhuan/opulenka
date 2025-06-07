"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { login, register } from "@/services/auth-service";
import { notifier } from "@/utils/notifier";

export default function Home() {
  const t = useTranslations("HomePage");
  const [info, setInfo] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const { isPending: isRegistering, mutate: tryRegister } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      notifier.notify("Registered successfully", "success");
    },
    onError: (error) => {
      notifier.notify(error.message, "error");
    },
  });

  const { isPending: isLoggingIn, mutate: tryLogin } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      notifier.notify("Logged in successfully", "success");
    },
    onError: (error) => {
      notifier.notify(error.message, "error");
    },
  });

  const className = "border-2 border-gray-300 rounded-md p-2";

  const handleClickRegister = () => {
    if (info.email === "" || info.password === "") {
      notifier.notify("Please fill in all fields", "error");
      return;
    }

    tryRegister(info);
  };

  const handleClickLogin = () => {
    if (info.email === "" || info.password === "") {
      notifier.notify("Please fill in all fields", "error");
      return;
    }

    tryLogin(info);
  };

  return (
    <div>
      <h1>{t("TITLE")}</h1>

      <div>
        <input
          className={className}
          type="email"
          placeholder="Email"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
        />
        <input
          className={className}
          type="password"
          placeholder="Password"
          value={info.password}
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
        />

        <div className="flex gap-2">
          <button className={className} onClick={handleClickRegister}>
            {isRegistering ? "Registering..." : "Register"}
          </button>

          <button className={className} onClick={handleClickLogin}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
