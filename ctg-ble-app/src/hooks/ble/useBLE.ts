import { useEffect, useState } from "react";
import base64 from "react-native-base64";
import { Device } from "react-native-ble-plx";

import { CTGData } from "@/src/ctg/ctg.types";
import { parseCTG } from "@/src/ctg/ctgParser";
import {
  CTG_CHARACTERISTIC_UUID,
  CTG_SERVICE_UUID,
} from "../../ble/ble.constant";
import {
  requestPermissions,
  scanDevices,
  stopScan,
} from "../../ble/bleManager";

export function useBLE() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [ctg, setCtg] = useState<CTGData | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    requestPermissions();
    return () => stopScan();
  }, []);

  function startScan() {
    setDevices([]);
    setScanning(true);

    scanDevices((device) => {
      setDevices((prev) =>
        prev.find((d) => d.id === device.id) ? prev : [...prev, device],
      );
    });

    setTimeout(() => {
      stopScan();
      setScanning(false);
    }, 8000);
  }

  async function connect(device: Device) {
    stopScan();

    const connected = await device.connect();
    await connected.discoverAllServicesAndCharacteristics();
    setConnectedDevice(connected);

    connected.monitorCharacteristicForService(
      CTG_SERVICE_UUID,
      CTG_CHARACTERISTIC_UUID,
      (_, characteristic) => {
        if (!characteristic?.value) return;

        const decoded = base64.decode(characteristic.value);
        const parsed = parseCTG(decoded);

        if (parsed) setCtg(parsed);
      },
    );
  }

  function getDeviceName(device: Device) {
    return device.name && device.name.length > 0 ? device.name : device.id;
  }

  return {
    devices,
    connectedDevice,
    ctg,
    scanning,
    startScan,
    connect,
    getDeviceName,
  };
}
