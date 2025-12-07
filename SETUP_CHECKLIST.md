# Google Sign-In Setup Checklist

Use this checklist to ensure you've completed all necessary steps.

## ✅ Pre-Setup (Completed)

- [x] Install dependencies
- [x] Create authentication context
- [x] Create Google Auth service
- [x] Create login screen
- [x] Create profile screen
- [x] Update app layout with auth protection
- [x] Configure app.json

## 🔧 Your Setup Tasks

### 1. Google Cloud Console Configuration

- [ ] Create/select a Google Cloud project
- [ ] Enable Google Sign-In API
- [ ] Configure OAuth consent screen
  - [ ] Add app name
  - [ ] Add support email
  - [ ] Add scopes: email, profile, openid
  - [ ] Add test users (if in testing mode)

### 2. Create OAuth Client IDs

- [ ] **Web Client ID** (Required)
  - [ ] Create OAuth 2.0 Client ID
  - [ ] Type: Web application
  - [ ] Name: "Web client (for mobile app)"
  - [ ] Add redirect URI: `https://auth.expo.io/@YOUR_EXPO_USERNAME/demo-react-native`
  - [ ] Save the Client ID

- [ ] **iOS Client ID** (For iOS support)
  - [ ] Create OAuth 2.0 Client ID
  - [ ] Type: iOS
  - [ ] Bundle ID: `com.ducxinhit.demoreactnative`
  - [ ] Save the Client ID

- [ ] **Android Client ID** (For Android support)
  - [ ] Get SHA-1 fingerprint: `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android`
  - [ ] Create OAuth 2.0 Client ID
  - [ ] Type: Android
  - [ ] Package name: `com.ducxinhit.demoreactnative`
  - [ ] Paste SHA-1 fingerprint
  - [ ] Save the Client ID

### 3. Download Google Services Files

- [ ] Download `google-services.json` (Android)
  - [ ] Place in project root
  - [ ] Verify it's in .gitignore

- [ ] Download `GoogleService-Info.plist` (iOS)
  - [ ] Place in project root
  - [ ] Verify it's in .gitignore

### 4. Update Project Configuration

- [ ] Open `services/google-auth.service.ts`
- [ ] Replace `YOUR_IOS_CLIENT_ID` with your iOS Client ID
- [ ] Replace `YOUR_WEB_CLIENT_ID` with your Web Client ID
- [ ] Save the file

**File location**: `services/google-auth.service.ts`

```typescript
GoogleSignin.configure({
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',  // ← Replace this
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',  // ← Replace this
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
```

### 5. Create Development Build

⚠️ **Important**: You must use a development build. Expo Go does NOT support Google Sign-In.

- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login to Expo: `eas login`
- [ ] Configure EAS: `eas build:configure`
- [ ] Build for iOS: `eas build --profile development --platform ios`
- [ ] Build for Android: `eas build --profile development --platform android`
- [ ] Install the development build on your device

### 6. Testing

- [ ] Start dev server: `npx expo start --dev-client`
- [ ] Open app with development build (not Expo Go)
- [ ] See login screen
- [ ] Tap "Sign in with Google"
- [ ] Complete Google sign-in flow
- [ ] See home screen after successful login
- [ ] Navigate to Profile tab
- [ ] See your user information
- [ ] Test sign out
- [ ] Confirm redirect to login screen

## 🔍 Verification Steps

### Verify Configuration Files

```bash
# Check if Google services files exist (don't commit these!)
ls google-services.json          # Should exist
ls GoogleService-Info.plist      # Should exist

# Check if they're in .gitignore
cat .gitignore | grep google-services.json     # Should show the file
cat .gitignore | grep GoogleService-Info.plist # Should show the file
```

### Verify Client IDs

```bash
# Open the service file and verify client IDs are updated
cat services/google-auth.service.ts | grep "ClientId"
```

Expected output should NOT contain "YOUR_":
```
iosClientId: '123456789-abcdef.apps.googleusercontent.com',
webClientId: '987654321-xyz.apps.googleusercontent.com',
```

## 🐛 Troubleshooting

### Android Issues

**Problem**: "Developer Error"
- [ ] Verify SHA-1 fingerprint matches
- [ ] Check package name is exactly `com.ducxinhit.demoreactnative`
- [ ] Regenerate google-services.json if needed

### iOS Issues

**Problem**: Sign in cancelled immediately
- [ ] Verify iOS Client ID is correct
- [ ] Check bundle identifier matches
- [ ] Ensure GoogleService-Info.plist is in project root

### Common Issues

**Problem**: "Web Client ID is missing"
- [ ] Ensure you're using Web Client ID (not iOS/Android) in `webClientId` field

**Problem**: Build fails
- [ ] Run `npx expo prebuild --clean`
- [ ] Delete `ios/` and `android/` folders
- [ ] Run build again

**Problem**: App crashes on login
- [ ] Check console logs for specific error
- [ ] Verify all Client IDs are correct
- [ ] Ensure Google services files are present

## 📝 Notes

- **Never commit** `google-services.json` or `GoogleService-Info.plist` to git
- Keep your OAuth client IDs secure
- Use environment variables for production builds
- Update SHA-1 fingerprint for production keystore
- Test on both iOS and Android devices

## ✨ Optional Enhancements

- [ ] Set up environment variables (see `env.template`)
- [ ] Configure app icon with your branding
- [ ] Customize login screen design
- [ ] Add backend API integration
- [ ] Implement token refresh logic
- [ ] Add social login providers (Facebook, Apple)
- [ ] Set up analytics
- [ ] Add crash reporting

## 📚 Resources

- [Detailed Setup Guide](./GOOGLE_SIGNIN_SETUP.md) - Step-by-step instructions
- [Authentication README](./README_AUTH.md) - Architecture and usage
- [Google Cloud Console](https://console.cloud.google.com/)
- [Expo Development Builds](https://docs.expo.dev/development/introduction/)

## 🎯 Quick Commands Reference

```bash
# Development
npx expo start --dev-client

# Clean and rebuild
npx expo prebuild --clean
eas build --profile development --platform ios

# Check logs
npx expo start --dev-client --log

# Debug Google Sign-In
adb logcat | grep Google  # Android
# iOS: Check Xcode console
```

---

**Status**: 
- [ ] Not Started
- [ ] In Progress
- [ ] Testing
- [ ] Complete

**Date Completed**: _______________

**Tested On**:
- [ ] iOS
- [ ] Android
- [ ] Both

**Notes**:
_____________________________________
_____________________________________
_____________________________________

