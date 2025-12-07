# 🚀 Quick Build Commands

## First Time Setup (One-time only)

### 1. Create EAS Environment Variables

⚠️ **Important:** Use `eas env:create` (the new command), NOT `eas secret:create` (deprecated)

Run these commands **once**:

```bash
# iOS environment variable
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project

# Android environment variable
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project
```

### 2. Verify Environment Variables

```bash
eas env:list
```

Expected output:
```
✔ GOOGLE_SERVICES_INFOPLIST
✔ GOOGLE_SERVICES_JSON
```

### 3. Commit Build Configuration

```bash
git add app.config.js eas.json .easignore
git commit -m "Add EAS build configuration for Google Sign-In"
git push
```

## Building Your App

### Development Build

```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android

# Both
eas build --profile development --platform all
```

### After Build Completes

1. Download the build from the link provided
2. Install on your device
3. Run: `npx expo start --dev-client`
4. Scan QR code with installed app

## Testing Locally

### Web (No build needed)

```bash
npx expo start --web
```

### iOS/Android (Requires build)

```bash
npx expo start --dev-client
```

## Status Check

```bash
# Check if logged in
eas whoami

# List secrets
eas secret:list

# View builds
eas build:list
```

## Troubleshooting

### If build fails with "GoogleService-Info.plist missing"

```bash
# 1. Verify files exist
ls GoogleService-Info.plist
ls google-services.json

# 2. Verify environment variables exist
eas env:list

# 3. If variables missing, create them
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project

# 4. Rebuild
eas build --profile development --platform ios
```

---

## 📋 Complete Flow

```bash
# One-time setup (use eas env:create, NOT eas secret:create)
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project
git add app.config.js eas.json .easignore
git commit -m "Add EAS build config"

# Build
eas build --profile development --platform ios

# Run
npx expo start --dev-client
```

**That's it!** 🎉

---

**Note**: If you got an error with `--platform` option, see `EAS_BUILD_FIX.md` for the updated solution.

See `EAS_BUILD_SETUP.md` for detailed documentation.

