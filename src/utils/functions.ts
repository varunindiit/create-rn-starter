import { showMessage, MessageType } from "react-native-flash-message";
import { FONTS } from "../theme";

export const showToast = (
  message: string,
  type: MessageType = "info",
  duration: number = 2000,
) => {
  showMessage({
    message,
    type,
    icon: type,
    floating: true,
    style: { alignItems: "center" },
    duration,
    titleStyle: { fontFamily: FONTS.medium, fontWeight: "500" },
  });
};

export const pad2 = (n: number) => n.toString().padStart(2, "0");

/** Format a price like 4400 -> "4,400" */
export const formatNumber = (n?: number) =>
  (n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
