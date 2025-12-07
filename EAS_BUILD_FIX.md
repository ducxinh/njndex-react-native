# 🔧 EAS Build Fix - Updated Approach

## Problem Solved

The previous approach using `prebuildCommand` caused an error:
```
unknown or unexpected option: --platform
```

## ✅ New Solution: app.config.js

Instead of using a bash script, we now use **`app.config.js`** which automatically creates the Google Services files during the build process.

## 📋 Setup Steps

### Step 1: Create EAS Secrets (One-time)

```bash
# Create iOS secret
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)"

# Create Android secret
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)"
```

### Step 2: Verify Secrets

```bash
eas secret:list
```

Expected output:
```
✔ GOOGLE_SERVICES_INFOPLIST
✔ GOOGLE_SERVICES_JSON
```

### Step 3: Commit Changes

```bash
git add app.config.js eas.json .easignore
git commit -m "Add EAS build configuration for Google Services"
```

### Step 4: Build

```bash
eas build --profile development --platform ios
```

## 🔍 How It Works

1. **`app.config.js`** runs automatically during the build
2. It checks if running in EAS Build environment (`process.env.EAS_BUILD`)
3. If yes, it decodes the base64 secrets
4. Creates `GoogleService-Info.plist` and `google-services.json`
5. Build proceeds with files in place

## 📁 File Structure

```
demo-react-native/
├── app.config.js          # ← NEW: Handles Google Services files
├── app.json               # Existing config
├── eas.json               # ← UPDATED: Removed prebuildCommand
├── .easignore            # ← NEW: Prevents uploading local Google files
├── GoogleService-Info.plist  # Local only (in .gitignore)
└── google-services.json      # Local only (in .gitignore)
```

## 🎯 Benefits of This Approach

✅ **No bash script needed** - Pure JavaScript  
✅ **Works on all platforms** - Windows, Mac, Linux  
✅ **Automatic detection** - Only runs in EAS Build  
✅ **Better error handling** - Clear console messages  
✅ **Easier to debug** - Can test locally  

## 🧪 Testing Locally

You can test the config locally:

```bash
# Set environment variables
export EAS_BUILD=true
export GOOGLE_SERVICES_INFOPLIST="$(base64 -i GoogleService-Info.plist)"
export GOOGLE_SERVICES_JSON="$(base64 -i google-services.json)"

# Run expo config
npx expo config --type public
```

## 🚀 Build Commands

```bash
# Development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Preview build
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all
```

## 🐛 Troubleshooting

### If secrets are not found

```bash
# List secrets
eas secret:list

# If empty, create them
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)"
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)"
```

### If build still fails

Check the build logs for these messages:
- `✓ Created GoogleService-Info.plist` - iOS file created
- `✓ Created google-services.json` - Android file created

If you see warnings instead, the secrets were not properly created.

## 📝 What Changed

### Removed:
- ❌ `eas-build-pre-install.sh` (bash script)
- ❌ `prebuildCommand` from `eas.json`

### Added:
- ✅ `app.config.js` (handles Google Services files)
- ✅ `.easignore` (prevents uploading local files)

### Updated:
- ✅ `eas.json` (simplified, just env variables)

## 🔐 Security

✅ Google Services files never committed to git  
✅ Secrets encrypted in EAS  
✅ Files only created during build  
✅ `.easignore` prevents accidental upload  

---

**Ready to build!** Just run the 4 steps above. 🚀


