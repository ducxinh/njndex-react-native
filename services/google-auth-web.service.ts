import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import type { User } from '@/contexts/auth-context';

WebBrowser.maybeCompleteAuthSession();

export class GoogleAuthWebError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'GoogleAuthWebError';
  }
}

export class GoogleAuthWebService {
  private static instance: GoogleAuthWebService;

  private constructor() {}

  static getInstance(): GoogleAuthWebService {
    if (!GoogleAuthWebService.instance) {
      GoogleAuthWebService.instance = new GoogleAuthWebService();
    }
    return GoogleAuthWebService.instance;
  }

  /**
   * Create Google Auth Request Hook
   * This should be called at the component level
   */
  useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
      iosClientId: '800437692907-t2c3cjpcgfpl0cg3eq3ucqeukb46oacj.apps.googleusercontent.com',
      webClientId: '800437692907-cloqkfj0e7v13hcp0lkum6saeq7vvb1t.apps.googleusercontent.com',
      // Android client ID would go here if different
    });

    return { request, response, promptAsync };
  }

  /**
   * Exchange code for user info
   */
  async getUserInfo(accessToken: string): Promise<User> {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userInfo = await response.json();

      if (!userInfo.id) {
        throw new GoogleAuthWebError('No user data received from Google');
      }

      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name || userInfo.email,
        photo: userInfo.picture,
        idToken: accessToken,
      };
    } catch (error: any) {
      throw new GoogleAuthWebError(
        error.message || 'Failed to fetch user info',
        'FETCH_USER_INFO_FAILED'
      );
    }
  }
}

export const googleAuthWebService = GoogleAuthWebService.getInstance();

