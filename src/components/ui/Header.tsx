import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎯</Text>
        </View>
        <View>
          <Text style={styles.title}>Asteroid Radar</Text>
          <Text style={styles.subtitle}>Próximos 7 dias</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0a0e27",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e2e8f0",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 2,
  },
});
