# 🔐 Google Cloud Console - Redirect URIs

## ✅ Add These URIs to Google Cloud Console

### Go to: https://console.cloud.google.com/apis/credentials

1. Click on your **Web Client ID**: 
   `800437692907-cloqkfj0e7v13hcp0lkum6saeq7vvb1t.apps.googleusercontent.com`

2. Under **Authorized JavaScript origins**, add:
   ```
   http://localhost:8081
   http://localhost:19006
   http://localhost:3000
   ```

3. Under **Authorized redirect URIs**, add ALL of these:
   ```
   http://localhost:8081
   http://localhost:8081/
   http://localhost:19006
   http://localhost:19006/
   https://auth.expo.io/@ducxinhit/demo-react-native
   demoreactnative://
   ```

4. Click **SAVE**

5. **Wait 2-3 minutes** for Google to propagate the changes

---

## 🚀 After Adding URIs:

1. **Stop your web server** (Ctrl+C)
2. **Clear browser cache** or use Incognito mode
3. **Restart server:**
   ```bash
   npx expo start --web --clear
   ```
4. **Try signing in again**

---

## 🔍 Still Getting Error?

If you STILL see the error, click **"see error details"** on the Google error page.

It will show you something like:
```
redirect_uri=SOME_EXACT_URI_HERE
```

**Copy that EXACT URI** and add it to the Authorized redirect URIs list.

---

## ✅ Quick Checklist

- [ ] Added `http://localhost:8081` to JavaScript origins
- [ ] Added `http://localhost:8081` to redirect URIs
- [ ] Added `http://localhost:8081/` (with slash) to redirect URIs  
- [ ] Clicked SAVE in Google Console
- [ ] Waited 2-3 minutes
- [ ] Cleared browser cache
- [ ] Restarted expo web server

---

**Once all URIs are added and you've waited, it WILL work!** 🎉

