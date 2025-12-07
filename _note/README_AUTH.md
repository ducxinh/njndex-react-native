# Authentication Implementation

This project implements Google Sign-In authentication following React Native and Expo best practices.

## 📁 Project Structure

```
demo-react-native/
├── app/
│   ├── _layout.tsx              # Root layout with auth protection
│   ├── login.tsx                # Login screen
│   └── (tabs)/
│       ├── _layout.tsx          # Tab navigation
│       ├── index.tsx            # Home screen
│       ├── explore.tsx          # Explore screen
│       └── profile.tsx          # Profile screen (user info & logout)
├── contexts/
│   └── auth-context.tsx         # Authentication context & provider
├── services/
│   └── google-auth.service.ts   # Google Sign-In service (singleton)
├── types/
│   └── auth.types.ts            # TypeScript type definitions
├── .env.example                 # Environment variables template
└── GOOGLE_SIGNIN_SETUP.md       # Detailed setup instructions
```

## 🏗️ Architecture

### 1. **Authentication Context** (`contexts/auth-context.tsx`)
- Centralized authentication state management
- Persistent user session using AsyncStorage
- Provides auth hooks: `useAuth()`
- Methods: `signIn()`, `signOut()`

### 2. **Google Auth Service** (`services/google-auth.service.ts`)
- Singleton pattern for Google Sign-In management
- Handles Google OAuth flow
- Error handling with custom error types
- Methods:
  - `signIn()` - Initiate Google Sign-In
  - `signOut()` - Sign out from Google
  - `revokeAccess()` - Revoke all permissions
  - `isSignedIn()` - Check sign-in status
  - `getCurrentUser()` - Get current user info

### 3. **Protected Routes** (`app/_layout.tsx`)
- Automatic navigation based on auth state
- Redirects unauthenticated users to login
- Redirects authenticated users to main app

### 4. **UI Components**
- **Login Screen**: Clean, modern UI with Google Sign-In button
- **Profile Screen**: User information display and logout functionality
- **Home/Explore**: Protected content only accessible when authenticated

## 🔒 Security Features

✅ **Secure Token Storage**: User data stored in AsyncStorage  
✅ **Session Persistence**: Users remain logged in across app restarts  
✅ **Protected Routes**: Automatic redirect for unauthorized access  
✅ **Error Handling**: Comprehensive error handling with user-friendly messages  
✅ **Gitignore Configuration**: Sensitive files excluded from version control  
✅ **Environment Variables**: Client IDs stored in environment variables  
✅ **Token Refresh**: Offline access for token refresh  

## 🚀 Quick Start

### 1. Install Dependencies

Dependencies are already installed:
- `@react-native-google-signin/google-signin`
- `expo-auth-session`
- `expo-crypto`
- `@react-native-async-storage/async-storage`

### 2. Configure Google Cloud Console

Follow the detailed guide in [`GOOGLE_SIGNIN_SETUP.md`](./GOOGLE_SIGNIN_SETUP.md)

**Quick checklist:**
- [ ] Create Google Cloud project
- [ ] Configure OAuth consent screen
- [ ] Create Web Client ID
- [ ] Create iOS Client ID
- [ ] Create Android Client ID (with SHA-1)
- [ ] Download `google-services.json` (Android)
- [ ] Download `GoogleService-Info.plist` (iOS)

### 3. Update Configuration

Edit `services/google-auth.service.ts`:

```typescript
GoogleSignin.configure({
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
```

### 4. Create Development Build

⚠️ **Important**: Google Sign-In requires a development build (not Expo Go)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for your platform
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

### 5. Run the App

```bash
# Start development server
npx expo start --dev-client

# Scan QR code with your development build
```

## 📱 User Flow

1. **App Launch** → Check authentication state
2. **Not Authenticated** → Show Login Screen
3. **Tap "Sign in with Google"** → Google OAuth flow
4. **Successfully Signed In** → Navigate to Home (Tabs)
5. **Navigate to Profile** → View user info
6. **Tap "Sign Out"** → Confirm and logout → Back to Login

## 🛠️ Usage Examples

### Using Auth in Components

```typescript
import { useAuth } from '@/contexts/auth-context';

function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Text>Please login</Text>;
  }

  return (
    <View>
      <Text>Welcome, {user?.name}!</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}
```

### Manual Sign Out

```typescript
import { googleAuthService } from '@/services/google-auth.service';

async function handleLogout() {
  try {
    await googleAuthService.signOut();
    await signOut(); // Clear local state
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
```

## 🔄 State Management

The auth state is managed through React Context and persisted in AsyncStorage:

```typescript
interface AuthContextType {
  user: User | null;           // Current user or null
  isLoading: boolean;          // Loading state during initialization
  isAuthenticated: boolean;    // Quick auth check
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
}
```

## 🎨 Customization

### Modify Login Screen Appearance

Edit `app/login.tsx` to customize:
- Logo/branding
- Button styles
- Colors and theme
- Additional sign-in options

### Add More OAuth Providers

The architecture supports adding more providers:

1. Create a new service (e.g., `facebook-auth.service.ts`)
2. Add sign-in method in `auth-context.tsx`
3. Add button in `login.tsx`

### Backend Integration

To integrate with your backend:

1. Send `idToken` from user object to your backend
2. Verify the token server-side
3. Create/update user in your database
4. Return your own JWT/session token

Example:

```typescript
async function authenticateWithBackend(idToken: string) {
  const response = await fetch('https://your-api.com/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  
  const { token } = await response.json();
  // Store your backend token
  await AsyncStorage.setItem('@auth_token', token);
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Developer Error" on Android**
   - Check SHA-1 fingerprint matches Google Console
   - Verify package name is correct

2. **Sign In Cancelled immediately**
   - iOS: Check iOS Client ID configuration
   - Web Client ID must be configured

3. **"Play Services not available"**
   - Android: Update Google Play Services on device
   - iOS: This error can be ignored

4. **Build fails**
   - Run `npx expo prebuild --clean`
   - Delete `ios/` and `android/` folders
   - Run build again

### Debug Mode

Enable detailed logging:

```typescript
// In google-auth.service.ts
private configure() {
  GoogleSignin.configure({
    // ... existing config
    // Add this for debugging
    hostedDomain: '',
    // Enable logging (if available)
  });
  
  // Log configuration
  console.log('Google Sign-In configured');
}
```

## 📚 Best Practices Implemented

✅ **Singleton Pattern** - Single instance of auth service  
✅ **Context API** - Centralized state management  
✅ **TypeScript** - Full type safety  
✅ **Error Handling** - Comprehensive error handling with custom errors  
✅ **Loading States** - Proper loading indicators  
✅ **Navigation Guards** - Protected routes with auto-redirect  
✅ **Session Persistence** - Users stay logged in  
✅ **Clean Architecture** - Separation of concerns  
✅ **User Feedback** - Alerts for errors and confirmations  
✅ **Secure Storage** - Sensitive data properly stored  

## 📖 Additional Resources

- [Google Sign-In Setup Guide](./GOOGLE_SIGNIN_SETUP.md)
- [React Native Google Sign-In Docs](https://react-native-google-signin.github.io/docs/)
- [Expo Development Builds](https://docs.expo.dev/development/introduction/)
- [Expo Router Authentication](https://docs.expo.dev/router/reference/authentication/)

## 🤝 Contributing

When adding new auth features:

1. Follow the existing patterns
2. Add proper TypeScript types
3. Handle errors gracefully
4. Update documentation
5. Test on both platforms

## 📄 License

This authentication implementation follows the project's license.

---

**Need Help?** Check `GOOGLE_SIGNIN_SETUP.md` for detailed setup instructions.

