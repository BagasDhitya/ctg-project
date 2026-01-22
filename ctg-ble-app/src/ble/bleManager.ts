import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

export const bleManager = new BleManager();

export async function requestPermissions() {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
  }
}

export function scanDevices(onDeviceFound: (device: Device) => void) {
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log("BLE SCAN ERROR:", error);
      return;
    }

    if (device) {
      onDeviceFound(device);
    }
  });
}

export function stopScan() {
  bleManager.stopDeviceScan();
}
