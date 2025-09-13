import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { View, ActivityIndicator } from "react-native";

function RootNavigation() {
  const { user, loading } = useAuth();

  if (loading) {
    // Show splash while checking AsyncStorage
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
