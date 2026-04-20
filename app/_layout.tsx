import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "../store/authStore";
// import { socketService } from "../services/socket";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const { token, isLoading, loadAuth } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    loadAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (!token && inTabsGroup) {
      router.replace("/pair");
    } else if (token && !inTabsGroup) {
      router.replace("/(tabs)");
    }
  }, [token, isLoading, segments]);

  //   useEffect(() => {
  //     if (token) {
  //       socketService.connect();
  //     } else {
  //       socketService.disconnect();
  //     }
  //     return () => {
  //       socketService.disconnect();
  //     };
  //   }, [token]);

  // 👇 block rendering until auth is resolved
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f0f0f",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="#6c63ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pair" />
    </Stack>
  );
}
