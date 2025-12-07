import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { googleAuthWebService } from "@/services/google-auth-web.service";
import {
  GoogleAuthError,
  googleAuthService,
} from "@/services/google-auth.service";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Web authentication using expo-auth-session
  const redirectUri = makeRedirectUri({
    native: "demoreactnative://",
    scheme: "demoreactnative",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "800437692907-t2c3cjpcgfpl0e7v13hcp0lkum6saeq7vvb1t.apps.googleusercontent.com",
    webClientId:
      "800437692907-cloqkfj0e7v13hcp0lkum6saeq7vvb1t.apps.googleusercontent.com",
    redirectUri: redirectUri,
  });

  // Handle web authentication response
  useEffect(() => {
    if (response?.type === "success") {
      handleWebAuthSuccess(response.authentication?.accessToken);
    }
  }, [response]);

  const handleWebAuthSuccess = async (accessToken?: string) => {
    if (!accessToken) return;

    setIsLoading(true);
    try {
      const user = await googleAuthWebService.getUserInfo(accessToken);
      await signIn(user);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Web sign in error:", error);
      Alert.alert("Sign In Failed", "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Use different authentication methods based on platform
    if (Platform.OS === "web") {
      // Web: Use expo-auth-session
      try {
        await promptAsync();
      } catch (error) {
        console.error("Web sign in error:", error);
        Alert.alert("Sign In Failed", "Failed to initiate Google sign in");
      }
    } else {
      // iOS/Android: Use native Google Sign-In
      setIsLoading(true);
      try {
        const user = await googleAuthService.signIn();
        await signIn(user);
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Sign in error:", error);

        let errorMessage = "Failed to sign in with Google";

        if (error instanceof GoogleAuthError) {
          // Don't show error for cancelled sign in
          if (error.code === "SIGN_IN_CANCELLED") {
            setIsLoading(false);
            return;
          }
          errorMessage = error.message;
        }

        Alert.alert("Sign In Failed", errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Logo/Icon */}
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.logo}
          contentFit="contain"
        />

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to Demo App
        </Text>

        <Text style={[styles.subtitle, { color: colors.text + "99" }]}>
          Sign in to continue
        </Text>

        {/* Google Sign In Button */}
        <TouchableOpacity
          style={[
            styles.googleButton,
            isLoading && styles.googleButtonDisabled,
          ]}
          onPress={handleGoogleSignIn}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Image
                source={{ uri: "https://www.google.com/favicon.ico" }}
                style={styles.googleIcon}
                contentFit="contain"
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={[styles.termsText, { color: colors.text + "66" }]}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 48,
    textAlign: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 250,
    justifyContent: "center",
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 32,
    paddingHorizontal: 32,
    lineHeight: 18,
  },
});
