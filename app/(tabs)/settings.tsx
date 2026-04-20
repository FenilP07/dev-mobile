import { View, Text } from "react-native";
export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>Settings</Text>
    </View>
  );
}
