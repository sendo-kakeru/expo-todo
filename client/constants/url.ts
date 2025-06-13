import { Platform } from "react-native";

export const API_BASE_URL = Platform.select({
  ios: "http://localhost:8787",
  android: "http://10.0.2.2:8787",
  default: "http://localhost:8787",
});
