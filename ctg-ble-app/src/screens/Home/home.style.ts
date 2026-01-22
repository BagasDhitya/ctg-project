import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;
const s = (size: number) => Math.round(size * scale);

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? s(16)) : 0,
  },

  header: {
    marginBottom: s(16),
  },

  title: {
    fontSize: s(26),
    fontWeight: "700",
    color: "#0f172a",
  },

  status: {
    marginTop: s(4),
    fontSize: s(14),
    fontWeight: "600",
  },

  scanButton: {
    backgroundColor: "#2563eb",
    paddingVertical: s(14),
    borderRadius: s(12),
    alignItems: "center",
    marginBottom: s(16),
  },

  scanText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: s(16),
  },

  deviceItem: {
    backgroundColor: "#fff",
    padding: s(16),
    borderRadius: s(14),
    marginBottom: s(12),
  },

  deviceName: {
    fontSize: s(16),
    fontWeight: "600",
    color: "#0f172a",
  },

  deviceId: {
    marginTop: s(4),
    fontSize: s(12),
    color: "#64748b",
  },

  card: {
    backgroundColor: "#fff",
    padding: s(20),
    borderRadius: s(16),
    marginTop: s(16),
  },

  hr: {
    fontSize: s(32),
    fontWeight: "700",
    color: "#dc2626",
  },

  uc: {
    marginTop: s(8),
    fontSize: s(18),
    color: "#2563eb",
  },
});
