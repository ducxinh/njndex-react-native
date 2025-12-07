# ✅ Correct EAS Commands (Updated for 2024)

## 🔄 Important Update

`eas secret:create` is **deprecated**. Use `eas env:create` instead.

## 🚀 Correct Commands to Run

### Step 1: Create Environment Variables for iOS

```bash
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
```

### Step 2: Create Environment Variables for Android

```bash
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project
```

### Step 3: Verify

```bash
eas env:list
```

You should see:
```
┌─────────────────────────────┬────────┬────────────┐
│ Name                        │ Scope  │ Updated    │
├─────────────────────────────┼────────┼────────────┤
│ GOOGLE_SERVICES_INFOPLIST  │ project│ just now   │
│ GOOGLE_SERVICES_JSON        │ project│ just now   │
└─────────────────────────────┴────────┴────────────┘
```

## 📝 Full Build Process

```bash
# 1. Create environment variables
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project

# 2. Verify
eas env:list

# 3. Commit configuration
git add app.config.js eas.json .easignore
git commit -m "Configure EAS build for Google Services"

# 4. Build
eas build --profile development --platform ios
```

## 🔍 Difference Between Old and New Commands

| Old (Deprecated) | New (Current) |
|-----------------|---------------|
| `eas secret:create` | `eas env:create` |
| `eas secret:list` | `eas env:list` |
| `eas secret:delete` | `eas env:delete` |

## ⚠️ If You Already Created Secrets

If you created any secrets with the old command, delete them:

```bash
# List existing secrets (old)
eas secret:list

# Delete old secrets if any exist
eas secret:delete GOOGLE_SERVICES_INFOPLIST
eas secret:delete GOOGLE_SERVICES_JSON

# Then create with new command
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project
```

## 🐛 Troubleshooting

### Error: "File does not exist"

This happens when base64 output is treated as a filename. Make sure you're using the command exactly as shown above with `$()` to capture the base64 output.

**Wrong:**
```bash
# ❌ Don't do this - it treats the base64 string as a filename
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "PD94bWw..."
```

**Correct:**
```bash
# ✅ Do this - it encodes the file and passes the content
eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project
```

### Verify Files Exist First

```bash
# Make sure these files exist in your project root
ls -la GoogleService-Info.plist
ls -la google-services.json
```

## 💡 Platform-Specific Notes

### macOS/Linux:
```bash
base64 -i GoogleService-Info.plist
```

### Windows (Git Bash):
```bash
base64 -w 0 GoogleService-Info.plist
```

### Windows (PowerShell):
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("GoogleService-Info.plist"))
```

## ✅ Complete Checklist

- [ ] Files exist: `GoogleService-Info.plist` and `google-services.json`
- [ ] Run: `eas env:create GOOGLE_SERVICES_INFOPLIST --type file --value "$(base64 -i GoogleService-Info.plist)" --scope project`
- [ ] Run: `eas env:create GOOGLE_SERVICES_JSON --type file --value "$(base64 -i google-services.json)" --scope project`
- [ ] Verify: `eas env:list` shows both variables
- [ ] Commit: `git add app.config.js eas.json .easignore && git commit -m "Configure EAS build"`
- [ ] Build: `eas build --profile development --platform ios`

---

**Ready to go!** Use the commands above. 🚀


