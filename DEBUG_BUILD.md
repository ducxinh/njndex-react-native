# 🔍 Debug Build - Check These Logs

## 🚀 Run the Build Again

```bash
eas build --profile development --platform ios
```

## 📋 What to Look For in Build Logs

### 1. Check if Hook Runs

Look for this section in the build logs (should appear early):

```
========================================
🔧 EAS Build Hook: Google Services Setup
========================================

📍 Current directory: /Users/expo/workingdir/build
📍 Process CWD: /Users/expo/workingdir/build
🔍 Checking environment variables...

📋 Found environment variables: GOOGLE_SERVICES_INFOPLIST, GOOGLE_SERVICES_JSON, ...
```

### 2. Check Environment Variable Detection

You should see:

```
🔄 Processing GOOGLE_SERVICES_INFOPLIST...
✓ GOOGLE_SERVICES_INFOPLIST found (length: XXXX characters)
  → Detected as base64 content, decoding...
  ✓ Created: /Users/expo/workingdir/build/GoogleService-Info.plist
  ✓ File size: XXX bytes
```

### 3. Check Summary

```
========================================
📋 SUMMARY
========================================
iOS (GoogleService-Info.plist):     ✅ SUCCESS
Android (google-services.json):     ✅ SUCCESS
========================================

✅ Google Services files setup complete!
```

## ❌ If Hook Doesn't Run

If you **don't see** the hook output at all, it means the hook script isn't being executed. Check:

1. **Script is committed:**
   ```bash
   git ls-files | grep eas-build-pre-install.js
   ```
   Should show: `eas-build-pre-install.js`

2. **Script is executable:**
   ```bash
   ls -la eas-build-pre-install.js
   ```
   Should show: `-rwxr-xr-x` (executable)

3. **Changes are pushed:**
   ```bash
   git status
   git push
   ```

## ❌ If Environment Variables Not Found

If you see:

```
❌ ERROR: GOOGLE_SERVICES_INFOPLIST environment variable not found!
```

Then the environment variables aren't available to the hook. Try:

1. **Verify env vars exist:**
   ```bash
   eas env:list
   ```

2. **Check they're in the right scope:**
   ```bash
   eas env:list --environment development
   ```

3. **Recreate if needed:**
   ```bash
   eas env:delete GOOGLE_SERVICES_INFOPLIST --environment development
   eas env:delete GOOGLE_SERVICES_JSON --environment development
   
   eas env:create --name GOOGLE_SERVICES_INFOPLIST --type file --value GoogleService-Info.plist --scope project --visibility plaintext --non-interactive
   
   eas env:create --name GOOGLE_SERVICES_JSON --type file --value google-services.json --scope project --visibility plaintext --non-interactive
   ```

## 🔍 Access Full Build Logs

1. When build fails, click the link: `https://expo.dev/accounts/ducxinhit/projects/demo-react-native/builds/...`

2. Look for the section: **"Install dependencies"** or **"Pre-install hook"**

3. Search for: `EAS Build Hook: Google Services Setup`

## 📊 Possible Outcomes

### ✅ Best Case: Hook Runs Successfully

```
✅ SUCCESS - Files created
→ Build should proceed and succeed
```

### ⚠️ Hook Runs But Env Vars Not Found

```
❌ ERROR: GOOGLE_SERVICES_INFOPLIST environment variable not found
→ Need to check/recreate environment variables
```

### ❌ Hook Doesn't Run At All

```
No hook output in logs
→ Script not being executed
→ Check if committed and executable
```

## 🛠️ Quick Fix Commands

```bash
# Ensure script is executable
chmod +x eas-build-pre-install.js

# Commit and push
git add eas-build-pre-install.js
git commit -m "Make build hook executable"
git push

# Verify environment variables
eas env:list --environment development

# Rebuild
eas build --profile development --platform ios
```

## 💡 Tips

1. **Watch the logs carefully** during the build
2. **Copy the build logs** if you need help debugging
3. **Check for the hook output** in the "Install dependencies" section
4. The hook runs **before** `npm install`

---

## 🚀 Next Steps

1. Run: `eas build --profile development --platform ios`
2. Watch for the hook output in logs
3. Report back what you see:
   - ✅ Hook ran and files created?
   - ⚠️ Hook ran but env vars missing?
   - ❌ Hook didn't run at all?

This will help diagnose the exact issue!

