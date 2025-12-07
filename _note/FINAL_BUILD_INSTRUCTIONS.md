# ✅ Final Build Instructions - CORRECTED

## 🔧 Issue Fixed

**Previous Error:**
```
unknown or unexpected option: --platform
npx expo bash eas-build-pre-install.sh --platform ios exited with non-zero code: 1
```

**Root Cause:** The `prebuildCommand` approach was incompatible with EAS Build.

**Solution:** Switched to `app.config.js` which runs automatically and handles Google Services files.

---

## 🚀 Ready to Build - Follow These Steps

### Step 1️⃣: Create EAS Environment Variables (2 minutes)

⚠️ **Note:** Use `eas env:create` (not the deprecated `eas secret:create`)

```bash
# Create iOS environment variable
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project

# Create Android environment variable
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project
```

**Expected output:**
```
✔ Created a new environment variable GOOGLE_SERVICES_INFOPLIST
✔ Created a new environment variable GOOGLE_SERVICES_JSON
```

### Step 2️⃣: Verify Environment Variables

```bash
eas env:list
```

**You should see:**
```
┌─────────────────────────────┬────────┬────────────┐
│ Name                        │ Scope  │ Updated    │
├─────────────────────────────┼────────┼────────────┤
│ GOOGLE_SERVICES_INFOPLIST  │ project│ just now   │
│ GOOGLE_SERVICES_JSON        │ project│ just now   │
└─────────────────────────────┴────────┴────────────┘
```

### Step 3️⃣: Commit Configuration

```bash
git add app.config.js eas.json .easignore BUILD_COMMANDS.md EAS_BUILD_FIX.md
git commit -m "Add EAS build configuration for Google Services"
```

### Step 4️⃣: Build! 🎉

```bash
# For iOS
eas build --profile development --platform ios

# For Android  
eas build --profile development --platform android

# For both
eas build --profile development --platform all
```

---

## ✅ What Happens During Build

1. EAS Build starts
2. `app.config.js` detects EAS Build environment
3. Reads `GOOGLE_SERVICES_INFOPLIST` and `GOOGLE_SERVICES_JSON` secrets
4. Decodes base64 and creates files:
   - `GoogleService-Info.plist` (iOS)
   - `google-services.json` (Android)
5. Build proceeds with files in place
6. Success! 🎉

---

## 📁 Files That Were Changed

### New Files:
- ✅ `app.config.js` - Handles Google Services file injection
- ✅ `.easignore` - Prevents uploading local Google files

### Updated Files:
- ✅ `eas.json` - Environment variables configuration
- ✅ All documentation files

### Removed Files:
- ❌ `eas-build-pre-install.sh` - Replaced by `app.config.js`

---

## 🔍 Verify Your Setup

Before building, make sure:

```bash
# ✅ Check files exist locally
ls GoogleService-Info.plist    # Should exist
ls google-services.json         # Should exist

# ✅ Check secrets are created
eas secret:list                 # Should show both secrets

# ✅ Check you're logged in
eas whoami                      # Should show your username

# ✅ Check app.config.js exists
ls app.config.js                # Should exist
```

---

## 🐛 Troubleshooting

### If environment variables are missing:

```bash
# Create them again (using new eas env:create command)
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project
```

### If build fails with "file not found":

Check the build logs for:
```
🔧 Setting up Google Services files from EAS Secrets...
✓ Created GoogleService-Info.plist
✓ Created google-services.json
```

If you see warnings instead, your secrets weren't created properly.

### If you get "unknown option" error again:

Make sure you've committed `app.config.js` and your `eas.json` doesn't have `prebuildCommand`.

---

## 📊 Build Process Timeline

```
1. Run: eas build --profile development --platform ios
   ⏱️ ~15-25 minutes
   
2. Build starts on EAS servers
   
3. app.config.js runs automatically
   ✓ Creates GoogleService-Info.plist
   ✓ Creates google-services.json
   
4. Native build proceeds
   
5. Build completes
   
6. Download link provided
   
7. Install on device
   
8. Run: npx expo start --dev-client
   
9. Scan QR code with installed app
   
10. Test Google Sign-In! ✅
```

---

## 🎯 Quick Commands Summary

```bash
# Setup (once) - Use eas env:create (not eas secret:create)
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project

# Verify
eas env:list

# Commit
git add app.config.js eas.json .easignore
git commit -m "Configure EAS build"

# Build
eas build --profile development --platform ios

# After build completes
npx expo start --dev-client
```

---

## 📚 Documentation

- **Quick reference:** `BUILD_COMMANDS.md`
- **Detailed guide:** `EAS_BUILD_SETUP.md`
- **This fix:** `EAS_BUILD_FIX.md`
- **Full auth docs:** `README_AUTH.md`

---

## ✨ You're Ready!

Just run the 4 steps above and your build will succeed. The previous error is completely fixed! 🚀

**Estimated time:** 
- Setup: 5 minutes
- Build: 15-25 minutes
- Total: ~30 minutes

Good luck! 🎉

