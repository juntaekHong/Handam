import { Platform } from "react-native";

export default {
  nanumSquareB: Platform.select({
    ios: "NanumSquareB",
    android: "NanumSquareBold"
  }),
  nanumSquareEB: Platform.select({
    ios: "NanumSquareEB",
    android: "NanumSquareExtraBold"
  }),
  nanumSquareL: Platform.select({
    ios: "NanumSquareL",
    android: "NanumSquareLight"
  }),
  nanumSquareR: Platform.select({
    ios: "NanumSquareR",
    android: "NanumSquareRegular"
  })
};
