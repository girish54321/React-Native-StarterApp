import { NativeModules } from "react-native";
const Flavor = NativeModules.RNConfigModule;

export function getBaseUrl() {
    return Flavor.BASE_URL
}

export function getEnvironmentVariable() {
    return Flavor.BUILD_ENV === "DEV" ? true : false
}
