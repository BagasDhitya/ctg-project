import { useEffect, useRef, useState } from "react";

export function useCTGWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [ctg, setCtg] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WS connected");
    };

    ws.onmessage = (event) => {
      console.log("📥 RAW:", event.data);
      setCtg(event.data);
    };

    ws.onerror = (err) => {
      console.error("❌ WS error", err);
    };

    ws.onclose = () => {
      console.log("🔴 WS closed");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return ctg;
}
