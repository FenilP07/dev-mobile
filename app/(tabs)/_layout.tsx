import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#1a1a1a" },
        tabBarActiveTintColor: "#6c63ff",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Deck" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="processes" options={{ title: "Processes" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
