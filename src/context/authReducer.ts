import type { AuthAction, AuthState } from "../types/auth";

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isInitializing: true,
  error: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, error: null };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isInitializing: false,
        error: null,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload.message,
        isInitializing: false,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isInitializing: false,
        error: null,
      };

    case "INITIALIZED":
      return { ...state, isInitializing: false };

    default:
      return state;
  }
}