"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { login as apiLogin, logout as apiLogout, refresh as apiRefresh } from "@/lib/api/auth";
import { setAccessToken as setClientAccessToken, setAuthFailureHandler } from "@/lib/api/client";
import type { LoginPayload, User } from "@/lib/types/auth";
import { useRouter } from "next/navigation";

type AuthContextValue = {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClientAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    setAuthFailureHandler(() => {
      setAccessToken(null);
      setUser(null);
      router.replace("/login");
    });

    return () => {
      setAuthFailureHandler(null);
    };
  }, [router]);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(payload);
      setAccessToken(response.accessToken);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
    } finally {
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
      router.replace("/login");
    }
  }, [router]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await apiRefresh();
      setAccessToken(token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated: Boolean(accessToken),
      isLoading,
      login,
      logout,
      refresh,
    }),
    [accessToken, user, isLoading, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
