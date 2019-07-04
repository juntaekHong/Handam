/*
 * util 모음
 * widthPercentageToDp: 디바이스 크기에 따라 크기 변환
 * storeData, getData, removeData: Local Data 읽기, 쓰기
 */
import { Dimensions, PixelRatio } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../configs/config";
import Toast from "react-native-root-toast";

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

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
    else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeData = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key, callback);
  } catch (e) {
    console.log(e);
  }
};

export const removeAllData = async () => {
  try {
    for (const key of config.signDataKey) {
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    console.log(e);
  }
};

export const showMessage = (message, options) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...options
  });
};
