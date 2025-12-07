# EAS Build Setup for Google Sign-In

## Problem

When running `eas build`, you get this error:

```
"GoogleService-Info.plist" is missing, make sure that the file exists.
```

**Why?** EAS Build only uploads files tracked by git, but `GoogleService-Info.plist` and `google-services.json` are in `.gitignore` for security.

## ✅ Solution: Use EAS Secrets

We use **EAS Secrets** to securely provide these files during the build process.

## 📋 Step-by-Step Setup

### Step 1: Verify Files Exist Locally

Make sure these files are in your project root:

```bash
ls GoogleService-Info.plist   # For iOS
ls google-services.json        # For Android
```

If missing, download them from Google Cloud Console (see `GOOGLE_SIGNIN_SETUP.md`).

### Step 2: Create EAS Secrets

Run these commands from your project directory:

```bash
# Create iOS secret
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)"

# Create Android secret
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)"
```

**Expected output:**
```
✔ Created a new secret GOOGLE_SERVICES_INFOPLIST on project @your-username/demo-react-native.
```

### Step 3: Verify Secrets Were Created

```bash
eas secret:list
```

You should see:
```
┌─────────────────────────────┬────────────┐
│ Name                        │ Updated at │
├─────────────────────────────┼────────────┤
│ GOOGLE_SERVICES_INFOPLIST  │ ...        │
│ GOOGLE_SERVICES_JSON        │ ...        │
└─────────────────────────────┴────────────┘
```

### Step 4: Build Configuration (Already Done)

The following files have been configured:

1. **`eas.json`** - References the secrets
2. **`eas-build-pre-install.sh`** - Script to inject files during build

These are already set up and committed to your repo.

### Step 5: Run the Build

Now you can build:

```bash
# For iOS
eas build --profile development --platform ios

# For Android
eas build --profile development --platform android

# For both
eas build --profile development --platform all
```

## 🔍 How It Works

```
1. EAS Build starts
   ↓
2. Runs eas-build-pre-install.sh
   ↓
3. Script reads EAS Secrets
   ↓
4. Decodes base64 files
   ↓
5. Creates GoogleService-Info.plist & google-services.json
   ↓
6. Build proceeds with files in place
```

## 🔐 Security Benefits

✅ **No sensitive files in git** - Credentials stay private  
✅ **Encrypted secrets** - EAS encrypts all secrets  
✅ **Team access control** - Only authorized team members can access  
✅ **Audit trail** - Track who accessed what  

## 🛠️ Configuration Files

### `eas.json`

```json
{
  "build": {
    "development": {
      "env": {
        "GOOGLE_SERVICES_INFOPLIST": "@GOOGLE_SERVICES_INFOPLIST",
        "GOOGLE_SERVICES_JSON": "@GOOGLE_SERVICES_JSON"
      },
      "prebuildCommand": "bash eas-build-pre-install.sh"
    }
  }
}
```

### `eas-build-pre-install.sh`

This script runs before the build and creates the Google Services files from the secrets.

## 🐛 Troubleshooting

### Secret Not Found

**Problem:**
```
⚠️  Warning: GOOGLE_SERVICES_INFOPLIST secret not found
```

**Solution:**
```bash
# Check if secret exists
eas secret:list

# If missing, create it
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)"
```

### Build Still Fails

**Problem:** Build fails with "GoogleService-Info.plist missing"

**Solution 1 - Verify script is executable:**
```bash
chmod +x eas-build-pre-install.sh
git add eas-build-pre-install.sh
git commit -m "Make build script executable"
```

**Solution 2 - Check prebuildCommand:**
```bash
# Verify eas.json has prebuildCommand
cat eas.json | grep prebuildCommand
```

**Solution 3 - Test locally:**
```bash
# Simulate the build process
export GOOGLE_SERVICES_INFOPLIST="$(base64 -i GoogleService-Info.plist)"
export GOOGLE_SERVICES_JSON="$(base64 -i google-services.json)"
bash eas-build-pre-install.sh
```

### File Encoding Issues

If you get encoding errors:

```bash
# Use -w 0 to prevent line wrapping on Linux
base64 -w 0 -i GoogleService-Info.plist

# On macOS, base64 doesn't have -w flag, so it's fine as-is
base64 -i GoogleService-Info.plist
```

## 📝 Updating Secrets

If you need to update the files (e.g., new Google credentials):

```bash
# Delete old secret
eas secret:delete --name GOOGLE_SERVICES_INFOPLIST

# Create new secret with updated file
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)"
```

## 🚀 Complete Build Commands

### Development Build

```bash
# iOS only
eas build --profile development --platform ios

# Android only
eas build --profile development --platform android

# Both platforms
eas build --profile development --platform all
```

### Preview Build

```bash
eas build --profile preview --platform all
```

### Production Build

```bash
eas build --profile production --platform all
```

## ✅ Verification Checklist

Before building, verify:

- [ ] `GoogleService-Info.plist` exists locally
- [ ] `google-services.json` exists locally
- [ ] EAS secrets created (run `eas secret:list`)
- [ ] `eas-build-pre-install.sh` is executable
- [ ] `eas.json` has `prebuildCommand` configured
- [ ] Script is committed to git
- [ ] You're logged into EAS (`eas whoami`)

## 💡 Best Practices

1. **Never commit Google Services files** - Always keep them in `.gitignore`
2. **Use different credentials for dev/prod** - Create separate Google projects
3. **Rotate secrets regularly** - Update credentials periodically
4. **Limit team access** - Only give access to those who need it
5. **Test builds** - Run a development build before production

## 📚 Additional Resources

- [EAS Secrets Documentation](https://docs.expo.dev/build-reference/variables/)
- [EAS Build Configuration](https://docs.expo.dev/build/eas-json/)
- [Google Services Setup](./GOOGLE_SIGNIN_SETUP.md)

---

## Quick Commands Reference

```bash
# Create secrets
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)"
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)"

# List secrets
eas secret:list

# Delete secret
eas secret:delete --name GOOGLE_SERVICES_INFOPLIST

# Build
eas build --profile development --platform ios
```

---

**Status**: Configuration complete! Run the commands in Step 2 to set up your secrets, then build. 🚀

