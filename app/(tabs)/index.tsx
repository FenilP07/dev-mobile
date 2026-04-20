import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import { useActionsStore } from "../../store/actionStore";
import { useExecutionStore } from "../../store/executionStore";
import ActionButton from "../../components/ActionButton";

const NUM_COLUMNS = 3;
const GAP = 10;
const PADDING = 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const BUTTON_SIZE =
  (SCREEN_WIDTH - PADDING * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

// chunk array into rows of N
function chunkArray<T>(arr: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}

export default function DeckScreen() {
  const { actions, isLoading, fetchActions } = useActionsStore();
  const { triggering, triggerAction } = useExecutionStore();

  useEffect(() => {
    fetchActions();
  }, []);

  if (!isLoading && actions.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No actions yet.</Text>
        <Text style={styles.emptyHint}>
          Create actions in the Deck Agent desktop app.
        </Text>
      </View>
    );
  }
  console.log(
    "actions type:",
    typeof actions,
    Array.isArray(actions),
    JSON.stringify(actions).slice(0, 100),
  );
  const rows = chunkArray(actions, NUM_COLUMNS);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deck</Text>
      <ScrollView
        contentContainerStyle={styles.grid}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchActions}
            tintColor="#6c63ff"
          />
        }
      >
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((item) => (
              <View key={item.id} style={{ width: BUTTON_SIZE }}>
                <ActionButton
                  action={item}
                  isTriggering={triggering === item.id}
                  onPress={() => triggerAction(item.id)}
                />
              </View>
            ))}
            {/* fill incomplete last row */}
            {row.length < NUM_COLUMNS &&
              Array.from({ length: NUM_COLUMNS - row.length }).map((_, i) => (
                <View
                  key={`filler-${rowIndex}-${i}`}
                  style={{ width: BUTTON_SIZE }}
                />
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    paddingTop: 60,
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: PADDING,
    marginBottom: 16,
  },
  grid: {
    paddingHorizontal: PADDING,
    gap: GAP,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: GAP,
  },
  empty: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyHint: {
    color: "#555",
    fontSize: 14,
  },
});
