import { WebSocketServer } from "ws";
import { generateCTG } from "./ctg/generator.js";

const PORT = 8080;
const INTERVAL_MS = 1000;

const wss = new WebSocketServer({ port: PORT });

console.log(`🩺 CTG WebSocket Simulator running on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
    console.log("📡 Client connected");

    const interval = setInterval(() => {
        const payload = generateCTG();
        console.log("➡️ Send:", payload);
        ws.send(payload);
    }, INTERVAL_MS);

    ws.on("close", () => {
        console.log("❌ Client disconnected");
        clearInterval(interval);
    });

    ws.on("error", (err) => {
        console.error("WS error:", err);
        clearInterval(interval);
    });
});
