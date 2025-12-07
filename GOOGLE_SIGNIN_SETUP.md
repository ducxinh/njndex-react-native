# Google Sign-In Setup Guide

This guide will help you configure Google Sign-In for your React Native Expo app.

## Prerequisites

- Google Cloud Console account
- Expo account
- Development environment set up

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** or **Google Sign-In API**

## Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (or Internal if using Google Workspace)
3. Fill in the required fields:
   - App name
   - User support email
   - Developer contact email
4. Add scopes: `email`, `profile`, `openid`
5. Save and continue

## Step 3: Create OAuth 2.0 Client IDs

You need to create **3 different client IDs**:

### 3.1 Web Client ID (Required for iOS, Android, and Web)

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Name it: "Web client (for mobile app)"
5. Add to **Authorized JavaScript origins**:
   ```
   http://localhost:19006
   http://localhost:8081
   https://your-app-domain.com (for production)
   ```
6. Add to **Authorized redirect URIs**:
   ```
   https://auth.expo.io/@your-expo-username/demo-react-native
   http://localhost:19006
   http://localhost:8081
   ```
7. Click **Create** and save the **Client ID**

### 3.2 iOS Client ID

1. Click **Create Credentials** > **OAuth client ID**
2. Select **iOS**
3. Name it: "iOS client"
4. Bundle ID: `com.ducxinhit.demoreactnative` (must match your app.json)
5. Click **Create** and save the **Client ID**

### 3.3 Android Client ID

1. Get your SHA-1 fingerprint:
   ```bash
   # For debug builds
   cd android
   ./gradlew signingReport
   
   # Or using keytool
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

2. Click **Create Credentials** > **OAuth client ID**
3. Select **Android**
4. Name it: "Android client"
5. Package name: `com.ducxinhit.demoreactnative`
6. SHA-1 certificate fingerprint: (paste from step 1)
7. Click **Create**

## Step 4: Download Google Services Files

### For iOS:
1. In Google Cloud Console, download **GoogleService-Info.plist**
2. Place it in your project root: `/GoogleService-Info.plist`

### For Android:
1. In Google Cloud Console, download **google-services.json**
2. Place it in your project root: `/google-services.json`

**Note**: If these files are not available from the Cloud Console, you can create a Firebase project and download them from there.

## Step 5: Update Configuration Files

### Update `services/google-auth.service.ts`

Replace the placeholders with your actual Client IDs:

```typescript
GoogleSignin.configure({
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
```

### Update `.gitignore`

Add these lines to prevent committing sensitive files:

```
# Google Services
google-services.json
GoogleService-Info.plist
```

## Step 6: Environment Variables (Optional but Recommended)

For better security, use environment variables:

1. Install expo-constants if not already installed:
   ```bash
   npx expo install expo-constants
   ```

2. Create `app.config.js` (replace `app.json`):

```javascript
export default {
  expo: {
    // ... your existing config from app.json
    extra: {
      googleSignIn: {
        iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
        webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      },
    },
  },
};
```

3. Create `.env` file:
```
GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

4. Update `services/google-auth.service.ts`:
```typescript
import Constants from 'expo-constants';

GoogleSignin.configure({
  iosClientId: Constants.expoConfig?.extra?.googleSignIn?.iosClientId,
  webClientId: Constants.expoConfig?.extra?.googleSignIn?.webClientId,
  // ... rest of config
});
```

## Step 7: Build and Test

### Development Build (Required for Google Sign-In)

Since Google Sign-In uses native modules, you need to create a development build:

```bash
# Install EAS CLI if not already installed
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Create development build for iOS
eas build --profile development --platform ios

# Create development build for Android
eas build --profile development --platform android
```

### Running the App

```bash
# Start the development server
npx expo start --dev-client

# Then scan the QR code with your development build app
```

## Step 8: Testing

1. Launch your development build
2. You should see the Login screen
3. Tap "Sign in with Google"
4. Complete the Google Sign-In flow
5. You should be redirected to the Home screen
6. Check the Profile tab to see your user information

## Troubleshooting

### iOS Issues

- **"Sign in cancelled"**: Make sure your iOS Client ID is correctly configured
- **"Play Services not available"**: This is normal on iOS, the library handles it

### Android Issues

- **"Developer Error"**: Check that your SHA-1 fingerprint matches
- **"Sign in failed"**: Verify your package name matches in Google Console and app.json

### Common Issues

1. **Web Client ID is required**: Make sure you're using the Web Client ID (not iOS or Android) in the `webClientId` field
2. **Redirect URI mismatch**: Ensure the redirect URI in Google Console matches your Expo slug
3. **Bundle ID / Package mismatch**: Verify bundle identifiers match exactly

## Production Setup

For production builds:

1. Generate production SHA-1 certificate:
   ```bash
   keytool -list -v -keystore your-release-key.keystore
   ```

2. Add the production SHA-1 to your Android OAuth client in Google Console

3. Update your app.config.js with production client IDs

4. Build production version:
   ```bash
   eas build --profile production --platform all
   ```

## Security Best Practices

1. ✅ Never commit `google-services.json` or `GoogleService-Info.plist`
2. ✅ Use environment variables for sensitive data
3. ✅ Implement token refresh logic
4. ✅ Validate tokens on your backend server
5. ✅ Use HTTPS for all API calls
6. ✅ Implement proper error handling

## Resources

- [Google Sign-In Documentation](https://developers.google.com/identity/sign-in/ios)
- [React Native Google Sign-In](https://github.com/react-native-google-signin/google-signin)
- [Expo Development Builds](https://docs.expo.dev/development/introduction/)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [React Native Google Sign-In docs](https://react-native-google-signin.github.io/docs/)
3. Check Expo forums for similar issues
4. Review Google Cloud Console configuration

---

**Note**: This implementation uses `@react-native-google-signin/google-signin` which requires a development build. Expo Go does not support this library.

