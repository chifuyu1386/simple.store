import { http } from "./http";
import type { AuthResponse, LoginCredentials, User } from "../types/auth";

export function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return http<AuthResponse>("/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function getCurrentUser(token: string): Promise<User> {
  return http<User>("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}