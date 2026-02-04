import { apiFetch, refreshAccessToken, setAccessToken } from "./client";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from "@/lib/types/auth";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    auth: false,
  });

  setAccessToken(response.accessToken);
  return response;
}

export async function register(payload: RegisterPayload) {
  return apiFetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    auth: false,
  });
}

export async function requestPasswordReset(payload: { email: string }) {
  return apiFetch("/api/v1/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    auth: false,
  });
}

export async function logout() {
  await apiFetch("/api/v1/auth/logout", {
    method: "POST",
  });
  setAccessToken(null);
}

export async function refresh() {
  return refreshAccessToken();
}

export async function getCurrentUser(): Promise<User> {
  return apiFetch<User>("/api/v1/auth/me");
}
