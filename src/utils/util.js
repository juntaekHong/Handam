import { Dimensions, PixelRatio } from "react-native";

const screenWidth = Dimensions.get("window").width;

const getWidthPercent = dp => {
  let percent = (dp / 375) * 100;
  return percent;
};

export const widthPercentageToDP = dp => {
  // Convert string input to decimal number
  const widthPercent = getWidthPercent(dp);
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
