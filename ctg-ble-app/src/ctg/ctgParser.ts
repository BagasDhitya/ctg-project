import { CTGData } from "./ctg.types";

export function parseCTG(data: string): CTGData | null {
  try {
    const parts = data.split(";");

    const hr = Number(parts[0]?.replace("HR:", ""));
    const uc = Number(parts[1]?.replace("UC:", ""));

    if (Number.isNaN(hr) || Number.isNaN(uc)) return null;

    return {
      heartRate: hr,
      contraction: uc,
    };
  } catch {
    return null;
  }
}
