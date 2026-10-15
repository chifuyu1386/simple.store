import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { LoginCredentials, User } from "../types/auth";
import { getCurrentUser, login as loginService } from "../services/authService";
import { authReducer, initialAuthState } from "./authReducer";

const TOKEN_KEY = "simple-store-token";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // ─── بارگذاری کاربر لاگین‌شده در شروع ───
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      dispatch({ type: "INITIALIZED" });
      return;
    }

    let ignore = false;

    async function restore() {
      try {
        const user = await getCurrentUser(token!);
        if (!ignore) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, token: token! },
          });
        }
      } catch {
        // توکن منقضی یا نامعتبر
        localStorage.removeItem(TOKEN_KEY);
        if (!ignore) dispatch({ type: "INITIALIZED" });
      }
    }

    restore();
    return () => {
      ignore = true;
    };
  }, []);

  // ─── اکشن‌ها ───
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await loginService(credentials);
      const { accessToken, ...user } = response;

      localStorage.setItem(TOKEN_KEY, accessToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token: accessToken },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "خطا در ورود به حساب";
      dispatch({ type: "LOGIN_ERROR", payload: { message } });
      throw err; // دوباره پرتاب کن که کامپوننت بتونه مدیریت کنه
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    if (state.error) dispatch({ type: "LOGIN_ERROR", payload: { message: "" } });
  };

  const value: AuthContextValue = {
    user: state.user,
    token: state.token,
    isAuthenticated: Boolean(state.user && state.token),
    isInitializing: state.isInitializing,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth باید داخل AuthProvider استفاده بشه");
  }
  return ctx;
}