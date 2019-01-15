import { Dimensions, Platform } from "react-native";

export const isIphoneX = () => {
  const d = Dimensions.get("window");
  const { height, width } = d;
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
};

export const checkSource = uri => {
  return typeof uri === "string" ? { source: { uri } } : { source: uri };
};
