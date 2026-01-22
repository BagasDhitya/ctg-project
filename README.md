Siap 👍
Ini versi **Markdown (`README.md`)** yang sudah rapi, konsisten, dan siap langsung dipakai di GitHub / GitLab.

---

```md
# CTG WebSocket Simulator + React Native (Expo)

This project provides a **Node.js WebSocket–based CTG (Cardiotocography) simulator** and a **React Native (Expo) client** to receive and visualize CTG data in real time.

It is designed to:
- Simulate CTG data without a physical BLE device
- Help frontend development & testing
- Easily switch between BLE mode and WebSocket simulator mode

---

## 🧠 Architecture Overview

```

┌────────────────────────┐
│  Node.js CTG Simulator │
│  (WebSocket Server)    │
│  ws://<IP>:8080        │
└───────────┬────────────┘
│ WebSocket
▼
┌────────────────────────┐
│ React Native Expo App  │
│ CTG Monitor Screen     │
└────────────────────────┘

````

---

## 📦 Tech Stack

### Backend (Simulator)
- Node.js
- `ws` (WebSocket)
- Runs as a long-lived process

### Frontend
- React Native
- Expo
- WebSocket client
- Optional BLE integration

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd <your-project>
````

---

## 🖥️ Backend: CTG WebSocket Simulator

### Install dependencies

```bash
cd simulator
npm install
```

### Run simulator

```bash
node server.js
```

You should see:

```text
CTG WebSocket Simulator running on ws://0.0.0.0:8080
Client connected
```

---

## 📱 Frontend: React Native (Expo)

### Install dependencies

```bash
cd app
npm install
```

---

## 🔐 Environment Variables (IMPORTANT)

Expo **does NOT read `.env` automatically** like Node.js.
You must use **Expo public environment variables**.

### Create `.env` file

```env
EXPO_PUBLIC_CTG_WS_URL=ws://192.168.1.13:8080
EXPO_PUBLIC_USE_SIMULATOR=true // 🔁 false = BLE, true = WebSocket simulator
```

⚠️ **IMPORTANT**
The IP address **MUST match your laptop’s local IP address**, not `localhost`.

You can find your laptop IP using:

```bash
ifconfig
```

Look for something like:

```text
inet 192.168.1.13
```

📌 If your IP changes (WiFi / network switch), **update this value**.

---

## ▶️ Start Expo App

```bash
npx expo start
```

Run on:

* Expo Go (real device)
* Android emulator
* iOS simulator

---

## 🔁 Switching Between BLE & Simulator

In `HomeScreen.tsx`:

```ts
const USE_SIMULATOR = true; // true = WebSocket, false = BLE
```

| Mode    | Description                  |
| ------- | ---------------------------- |
| `true`  | Uses WebSocket CTG Simulator |
| `false` | Uses real BLE CTG device     |

---

## 📡 Data Flow

1. Node.js simulator generates CTG data every second
2. Data sent via WebSocket
3. React Native receives raw data
4. `parseCTG()` converts it into usable values
5. UI updates heart rate & contraction in real time

---

## 🧪 Testing Checklist

* ✅ Simulator running
* ✅ Expo app running
* ✅ Phone & laptop on **same network**
* ✅ Correct IP in `EXPO_PUBLIC_CTG_WS_URL`
* ✅ `USE_SIMULATOR = true`

If data appears on screen → 🎉 **Success!**

---

## 🚫 Deployment Notes

❌ **Vercel is NOT supported**
Reason: serverless environment does not support long-lived WebSocket connections.

### ✅ Supported Hosting Options

* VPS (DigitalOcean / EC2 / Linode)
* Railway
* Fly.io
* Render

---

## 🧩 Common Issues

### ❌ `.env` not read

✔ Use `EXPO_PUBLIC_` prefix
✔ Restart Expo after changing `.env`

---

### ❌ WebSocket not connecting

✔ Check IP address
✔ Ensure same WiFi network
✔ Ensure port `8080` is not blocked by firewall

---

## 📌 Future Improvements

* Auto-reconnect WebSocket
* Multiple CTG clients
* CTG waveform visualization
* Secure WebSocket (WSS)
* Cloud deployment guide

---

## 🩺 Disclaimer

This simulator is for **development and testing only**.
It is **NOT intended for medical diagnosis or clinical use**.
