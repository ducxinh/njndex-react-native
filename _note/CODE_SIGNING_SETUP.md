# 🔐 iOS Code Signing Setup Guide

## 🎯 Quick Setup (5 minutes)

### Step 1: Open Project in Xcode

```bash
cd /Users/xinhnd/Documents/workspace/project/mobile/demo-react-native
open ios/demoreactnative.xcworkspace
```

**Important:** Open the `.xcworkspace` file, NOT the `.xcodeproj` file!

### Step 2: Configure Signing in Xcode

1. **In Xcode, select the project** (demoreactnative) in the left sidebar
2. **Select the target** "demoreactnative" under TARGETS
3. **Click on "Signing & Capabilities" tab**
4. **Check the box** "Automatically manage signing"
5. **Select your Team:**
   - If you see your Apple ID: Select it
   - If not: Click "Add Account..." and sign in with your Apple ID

### Step 3: Fix Bundle Identifier (if needed)

1. Change the Bundle Identifier to something unique:
   ```
   com.yourname.demoreactnative
   ```
   (Replace `yourname` with your name or company)

### Step 4: Connect Your iPhone

1. Connect your iPhone to your Mac with a USB cable
2. **On your iPhone:** 
   - Go to Settings → Privacy & Security → Developer Mode
   - Enable Developer Mode
   - Restart your iPhone if prompted

3. **Trust your computer:**
   - When you connect, iPhone will ask "Trust This Computer?"
   - Tap "Trust"

### Step 5: Select Your Device in Xcode

1. At the top of Xcode, click the device dropdown (next to the Run button)
2. Select your connected iPhone
3. Click the ▶️ Run button (or press Cmd + R)

---

## 🚀 Alternative: Use iOS Simulator (No Code Signing Needed!)

If you don't want to set up code signing right now, just use the Simulator:

### Option A: Run with Expo CLI

```bash
npx expo run:ios
```

Then select "iPhone 15" or any simulator when prompted.

### Option B: Run from Xcode

1. Open `ios/demoreactnative.xcworkspace` in Xcode
2. Select any iOS Simulator from the device dropdown (e.g., "iPhone 15")
3. Click ▶️ Run button

---

## 📋 Troubleshooting

### Error: "No provisioning profiles found"

**Solution:**
1. In Xcode → Preferences → Accounts
2. Click your Apple ID
3. Click "Download Manual Profiles"
4. Go back to Signing & Capabilities
5. Uncheck and re-check "Automatically manage signing"

### Error: "App ID already exists"

**Solution:** Change your bundle identifier:
1. In Xcode → Signing & Capabilities
2. Change Bundle Identifier to something unique:
   ```
   com.yourname.demoreactnative2024
   ```

### Error: "Untrusted Developer"

**On your iPhone:**
1. Go to Settings → General → VPN & Device Management
2. Find your developer profile
3. Tap "Trust"

---

## ✅ Quick Start Commands

### For Simulator (No code signing needed):
```bash
cd /Users/xinhnd/Documents/workspace/project/mobile/demo-react-native
npx expo run:ios
```

### For Physical Device (After code signing setup):
```bash
cd /Users/xinhnd/Documents/workspace/project/mobile/demo-react-native
npx expo run:ios --device
```

---

## 🎯 Recommended: Start with Simulator

For testing Google Sign-In, the **iOS Simulator works fine!** You don't need a physical device.

Just run:
```bash
npx expo run:ios
```

And select "iPhone 15" or any available simulator.

---

## 📝 Notes

- **Free Apple ID** works for development (no paid developer account needed)
- **Simulator** is easier and faster for testing
- **Physical device** is only needed for camera, GPS, or final testing
- **Google Sign-In** works in both Simulator and physical devices

---

## 🚀 Next Steps

1. **Easiest:** Use Simulator
   ```bash
   npx expo run:ios
   ```

2. **For physical device:** Follow Steps 1-5 above

3. **Already have Xcode open?** Just click the ▶️ Run button!

The app will build and Google Sign-In will be ready to test! 🎉

