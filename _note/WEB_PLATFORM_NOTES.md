# Web Platform Support

## Issue: Google Sign-In on Web

The original implementation using `@react-native-google-signin/google-signin` **only works on iOS and Android**. It does NOT support web.

### Error You Got

```
GoogleAuthError: Google Play Services is not available or outdated
```

This error appears when trying to use the native Google Sign-In library on the web platform.

## Solution: Platform-Specific Authentication

The app now uses **different authentication methods based on the platform**:

### 📱 iOS & Android (Native)
- Uses: `@react-native-google-signin/google-signin`
- Provides native Google Sign-In experience
- Requires development build (not Expo Go)

### 🌐 Web
- Uses: `expo-auth-session` with Google OAuth
- Web-based OAuth flow
- Works in browsers
- No additional setup needed

## How It Works

The `login.tsx` screen automatically detects the platform and uses the appropriate method:

```typescript
if (Platform.OS === 'web') {
  // Use expo-auth-session for web
  await promptAsync();
} else {
  // Use native Google Sign-In for iOS/Android
  const user = await googleAuthService.signIn();
}
```

## Testing on Different Platforms

### Testing on Web (Browser)

```bash
# Start the development server for web
npx expo start --web

# Or
npm run web
```

1. Browser will open automatically
2. You'll see the login screen
3. Click "Sign in with Google"
4. Google OAuth popup will appear
5. Complete sign-in
6. You'll be redirected back to the app

### Testing on iOS/Android (Native)

```bash
# Requires development build
npx expo start --dev-client
```

1. Open with your development build app
2. Click "Sign in with Google"
3. Native Google Sign-In flow appears
4. Complete sign-in
5. Return to app

## Configuration for Web

### Google Cloud Console Setup for Web

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your **Web Client ID**
4. Add authorized JavaScript origins:
   ```
   http://localhost:8081
   http://localhost:19006
   ```

5. Add authorized redirect URIs:
   ```
   http://localhost:8081
   http://localhost:19006
   https://auth.expo.io/@your-username/demo-react-native
   ```

## Files Modified

1. **`app/login.tsx`** - Updated to support both platforms
2. **`services/google-auth-web.service.ts`** - New service for web authentication
3. **`services/google-auth.service.ts`** - Existing service for iOS/Android

## Platform Comparison

| Feature | iOS/Android | Web |
|---------|-------------|-----|
| Library | `@react-native-google-signin` | `expo-auth-session` |
| User Experience | Native modal | Browser popup |
| Setup Required | Development build | None (works in browser) |
| Offline Access | ✅ Yes | ✅ Yes |
| Token Refresh | ✅ Yes | ✅ Yes |

## Running on Web Right Now

If you want to test immediately on web:

```bash
# Add web script to package.json if not present
npm run web

# Or directly
npx expo start --web
```

The app will open in your browser and Google Sign-In will work using the web OAuth flow.

## Development Workflow

### For Web Development
1. Run `npx expo start --web`
2. Test in browser
3. No build required

### For Mobile Development
1. Create development build once
2. Run `npx expo start --dev-client`
3. Install on device
4. Test with native flow

## Troubleshooting

### Web Platform Issues

**Problem**: "Redirect URI mismatch"
- **Solution**: Add `http://localhost:19006` to authorized redirect URIs in Google Console

**Problem**: CORS errors
- **Solution**: Make sure JavaScript origins are configured in Google Console

**Problem**: Sign-in popup blocked
- **Solution**: Allow popups for localhost in your browser

### Native Platform Issues

**Problem**: "Google Play Services not available" on iOS/Android
- **Solution**: This should only appear on web now. If it appears on mobile, verify you're using a development build (not web or Expo Go)

## Best Practices

1. **Always check Platform.OS** before using platform-specific code
2. **Test on all platforms** you plan to support
3. **Configure Google Console** for each platform separately
4. **Handle errors differently** per platform

## Security Notes

- Web OAuth uses Authorization Code flow
- Tokens are stored securely in AsyncStorage
- Same security practices apply to both platforms
- Web redirect URIs must be whitelisted in Google Console

## Next Steps

1. ✅ Test on web browser (works now!)
2. ⏳ Test on iOS (requires development build)
3. ⏳ Test on Android (requires development build)

---

**Current Status**: Web platform is now fully supported! 🎉

