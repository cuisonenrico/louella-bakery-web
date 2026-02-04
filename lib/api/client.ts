import type { ApiError } from "@/lib/types/api";
import type { RefreshResponse } from "@/lib/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let accessToken: string | null = null;
let authFailureHandler: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function setAuthFailureHandler(handler: (() => void) | null) {
  authFailureHandler = handler;
}

function ensureApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return API_URL;
}

async function parseError(response: Response): Promise<ApiError> {
  let message = "Request failed";
  let details: unknown;

  try {
    details = await response.json();
    if (typeof details === "object" && details && "message" in details) {
      message = String((details as { message?: string }).message);
    }
  } catch {
    try {
      message = await response.text();
    } catch {
      message = "Request failed";
    }
  }

  return {
    status: response.status,
    message,
    details,
  };
}

async function refreshAccessToken() {
  const baseUrl = ensureApiUrl();
  const response = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    setAccessToken(null);
    authFailureHandler?.();
    throw await parseError(response);
  }

  const data = (await response.json()) as RefreshResponse;
  setAccessToken(data.accessToken);
  return data.accessToken;
}

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
  retry?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const baseUrl = ensureApiUrl();
  const { auth = true, retry = true, headers, ...rest } = options;

  const requestHeaders = new Headers(headers);
  if (auth && accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: requestHeaders,
    credentials: "include",
  });

  if (response.status === 401 && auth && retry) {
    await refreshAccessToken();
    return apiFetch<T>(path, { ...options, retry: false });
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export { refreshAccessToken };
