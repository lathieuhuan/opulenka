import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@opulenka/service";
import { http, RequestConfig } from "./base/http";

export function register(data: RegisterRequest, config?: RequestConfig) {
  return http.request<RegisterResponse>("POST", "/auth/register", {
    body: data,
    ...config,
  });
}

export function login(data: LoginRequest, config?: RequestConfig) {
  return http.request<LoginResponse>("POST", "/auth/login", {
    body: data,
    ...config,
  });
}
