import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { Action } from "../store/actionStore";

interface Props {
  action: Action;
  isTriggering: boolean;
  onPress: () => void;
}

export default function ActionButton({ action, isTriggering, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: action.color || "#1e1e2e" },
        !action.enabled && styles.disabled,
        isTriggering && styles.triggering,
      ]}
      onPress={onPress}
      disabled={!action.enabled || isTriggering}
      activeOpacity={0.7}
    >
      {isTriggering ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.inner}>
          {action.icon ? <Text style={styles.icon}>{action.icon}</Text> : null}
          <Text style={styles.label} numberOfLines={2}>
            {action.name}
          </Text>
          <Text style={styles.type}>{action.type}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  disabled: {
    opacity: 0.4,
  },
  triggering: {
    borderColor: "#6c63ff",
    borderWidth: 2,
  },
  inner: {
    alignItems: "center",
    gap: 6,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  type: {
    color: "#888",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
