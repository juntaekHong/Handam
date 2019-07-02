/**
 * 폰트 모음
 */

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
  }),
  nanumBarunGothicB: Platform.select({
    ios: "NanumBarunGothicBold",
    android: "NanumBarunGothicBold"
  }),
  nanumBarunGothicUL: Platform.select({
    ios: "NanumBarunGothicUltraLight",
    android: "NanumBarunGothicUltraLight"
  }),
  nanumBarunGothicL: Platform.select({
    ios: "NanumBarunGothicLight",
    android: "NanumBarunGothicLight"
  }),
  nanumBarunGothic: Platform.select({
    ios: "NanumBarunGothic",
    android: "NanumBarunGothic"
  })
};
