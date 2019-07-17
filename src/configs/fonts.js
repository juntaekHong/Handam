/**
 * 폰트 모음
 */

import { Platform } from "react-native";

export default {
  nanumBarunGothicB: Platform.select({
    ios: "NanumBarunGothicOTFBold",
    android: "NanumBarunGothicBold"
  }),
  nanumBarunGothicUL: Platform.select({
    ios: "NanumBarunGothicOTFUltraLight",
    android: "NanumBarunGothicUltraLight"
  }),
  nanumBarunGothicL: Platform.select({
    ios: "NanumBarunGothicOTFLight",
    android: "NanumBarunGothicLight"
  }),
  nanumBarunGothic: Platform.select({
    ios: "NanumBarunGothicOTF",
    android: "NanumBarunGothic"
  })
};
