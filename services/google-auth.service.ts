import type { User } from "@/contexts/auth-context";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export class GoogleAuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "GoogleAuthError";
  }
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;

  private constructor() {
    this.configure();
  }

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  /**
   * Configure Google Sign-In
   * You need to replace these with your actual client IDs from Google Cloud Console
   */
  private configure() {
    GoogleSignin.configure({
      // iOS client ID from Google Cloud Console
      // iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
      iosClientId:
        "800437692907-t2c3cjpcgfpl0cg3eq3ucqeukb46oacj.apps.googleusercontent.com",

      // Web client ID (used for both iOS and Android)
      // webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
      webClientId:
        "800437692907-cloqkfj0e7v13hcp0lkum6saeq7vvb1t.apps.googleusercontent.com",

      // Scopes you want to request
      scopes: ["profile", "email"],

      // Offline access to get refresh token
      offlineAccess: true,

      // Force code for web
      forceCodeForRefreshToken: true,
    });
  }

  /**
   * Sign in with Google
   */
  async signIn(): Promise<User> {
    try {
      // Check if device supports Google Play Services (Android)
      await GoogleSignin.hasPlayServices();

      // Sign in
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.data) {
        throw new GoogleAuthError("No user data received from Google");
      }

      const { user, idToken } = userInfo.data;

      // Map Google user to our User type
      const mappedUser: User = {
        id: user.id,
        email: user.email,
        name: user.name || user.email,
        photo: user.photo || undefined,
        idToken: idToken || undefined,
      };

      return mappedUser;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Sign out from Google
   */
  async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Revoke access (removes all granted permissions)
   */
  async revokeAccess(): Promise<void> {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Check if user is already signed in
   */
  async isSignedIn(): Promise<boolean> {
    return await GoogleSignin.isSignedIn();
  }

  /**
   * Get current user info (if signed in)
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();

      if (!userInfo?.data?.user) {
        return null;
      }

      const { user, idToken } = userInfo.data;

      return {
        id: user.id,
        email: user.email,
        name: user.name || user.email,
        photo: user.photo || undefined,
        idToken: idToken || undefined,
      };
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  }

  /**
   * Handle and map Google Sign-In errors to user-friendly messages
   */
  private handleError(error: any): GoogleAuthError {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return new GoogleAuthError("Sign in was cancelled", error.code);
    }

    if (error.code === statusCodes.IN_PROGRESS) {
      return new GoogleAuthError("Sign in is already in progress", error.code);
    }

    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return new GoogleAuthError(
        "Google Play Services is not available or outdated",
        error.code
      );
    }

    // Generic error
    return new GoogleAuthError(
      error.message || "An unknown error occurred during sign in",
      error.code
    );
  }
}

// Export singleton instance
export const googleAuthService = GoogleAuthService.getInstance();
