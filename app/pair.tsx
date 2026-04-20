import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export default function PairScreen() {
  const [serverUrl, setServerUrl] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuthStore();

  const handlePair = async () => {
    const trimmedUrl = serverUrl.trim().replace(/\/$/, "");
    const trimmedCode = pairingCode.trim();
    const trimmedName = deviceName.trim();

    if (!trimmedUrl || !trimmedCode || !trimmedName) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    // add http:// if user didn't
    const baseUrl = trimmedUrl.startsWith("http")
      ? trimmedUrl
      : `http://${trimmedUrl}`;

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/auth/pair`, {
        pairingCode: trimmedCode,
        deviceName: trimmedName,
        platform: Platform.OS,
      });

      const { token } = response.data.data;

      await setAuth(token, baseUrl);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Could not connect. Check the IP and pairing code.";
      Alert.alert("Pairing failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Deck Agent</Text>
          <Text style={styles.subtitle}>
            Connect your phone to your desktop agent
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Server Address</Text>
            <TextInput
              style={styles.input}
              placeholder="192.168.1.100:3000"
              placeholderTextColor="#555"
              value={serverUrl}
              onChangeText={setServerUrl}
              autoCapitalize="none"
              keyboardType="url"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Pairing Code</Text>
            <TextInput
              style={[styles.input, styles.codeInput]}
              placeholder="000000"
              placeholderTextColor="#555"
              value={pairingCode}
              onChangeText={setPairingCode}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Device Name</Text>
            <TextInput
              style={styles.input}
              placeholder="My iPhone"
              placeholderTextColor="#555"
              value={deviceName}
              onChangeText={setDeviceName}
              autoCapitalize="words"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handlePair}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Connect</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          Open Deck Agent on your desktop and generate a pairing code first.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    gap: 32,
  },
  header: {
    gap: 8,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#888",
    fontSize: 15,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 16,
  },
  codeInput: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6c63ff",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: "#444",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});
