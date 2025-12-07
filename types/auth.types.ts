/**
 * Authentication related type definitions
 */

export interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  idToken?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface GoogleSignInConfig {
  iosClientId?: string;
  webClientId?: string;
  scopes?: string[];
  offlineAccess?: boolean;
  forceCodeForRefreshToken?: boolean;
}

export enum AuthErrorCode {
  SIGN_IN_CANCELLED = 'SIGN_IN_CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE = 'PLAY_SERVICES_NOT_AVAILABLE',
  UNKNOWN = 'UNKNOWN',
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

