import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useBLE } from "@/src/hooks/ble/useBLE";
import { useCTGWebSocket } from "@/src/hooks/ws/useCTGWebSocket";
import { parseCTG } from "@/src/ctg/ctgParser";
import { styles } from "./home.style";

const USE_SIMULATOR = process.env.EXPO_PUBLIC_USE_SIMULATOR === "true";; // 🔁 false = BLE, true = WebSocket simulator
const WS_URL = process.env.EXPO_PUBLIC_CTG_WS_URL!;

export default function HomeScreen() {
    const {
        devices,
        connectedDevice,
        ctg: bleCtg,
        scanning,
        startScan,
        connect,
        getDeviceName,
    } = useBLE();

    const wsRaw = useCTGWebSocket(WS_URL);
    const simulatorCtg = wsRaw ? parseCTG(wsRaw) : null;
    const ctg = USE_SIMULATOR ? simulatorCtg : bleCtg;

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>CTG Monitor</Text>
                    <Text
                        style={[
                            styles.status,
                            { color: ctg ? "#16a34a" : "#dc2626" },
                        ]}
                    >
                        {USE_SIMULATOR
                            ? "Simulator Active"
                            : connectedDevice
                                ? "Connected"
                                : "Not Connected"}
                    </Text>
                </View>
                {!USE_SIMULATOR && (
                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={startScan}
                        disabled={scanning}
                    >
                        <Text style={styles.scanText}>
                            {scanning ? "Scanning..." : "Scan BLE"}
                        </Text>
                    </TouchableOpacity>
                )}
                {!USE_SIMULATOR && (
                    <FlatList
                        data={devices}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.deviceItem}
                                onPress={() => connect(item)}
                            >
                                <Text style={styles.deviceName}>
                                    {getDeviceName(item)}
                                </Text>
                                <Text style={styles.deviceId}>{item.id}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                {ctg && (
                    <View style={styles.card}>
                        <Text style={styles.hr}>{ctg.heartRate} bpm</Text>
                        <Text style={styles.uc}>
                            Contraction: {ctg.contraction}
                        </Text>

                        <Text style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
                            Source: {USE_SIMULATOR ? "WebSocket Simulator" : "BLE Device"}
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
