/*
 * util 모음
 * widthPercentageToDp: 디바이스 크기에 따라 크기 변환
 * storeData, getData, removeData: Local Data 읽기, 쓰기
 */
import { Dimensions, PixelRatio } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../configs/config";
import Toast from "react-native-root-toast";
import moment from "moment";

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
  } catch (e) {}
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
    else return null;
  } catch (e) {
    return null;
  }
};

export const removeData = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key, callback);
  } catch (e) {}
};

export const removeAllData = async () => {
  try {
    for (const key of config.signDataKey) {
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {}
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

export const timeSince = date => {
  if (date === null || date === undefined) return "";
  let seconds = Math.floor(
    (new Date(moment().utc(moment().format())) - new Date(date)) / 1000
  );
  if (isNaN(seconds)) {
    return "댓글 없음";
  }

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " 년전";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " 달전";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " 일전";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " 시간전";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 0.9) {
    return interval + " 분전";
  }
  return Math.floor(seconds) + " 초전";
};

export const getArrMsg = str => {
  if (str.indexOf("[") < 0) return str;
  else if (str.indexOf("[") == 0) {
    str = str.substring(str.indexOf("]") + 1, str.length);
    if (str.indexOf("[") < 0) return str;
    else return str.substring(0, str.indexOf("["));
  } else return str.substring(0, str.indexOf("["));
};

export const returnArrayItem = (item, index = 0) => {
  return item[index];
};

export const secondToMinute = time => {
  let t = time;
  let result = "";
  if (t > 60) result += `${(t / 60).toFixed(0)}분 `;
  result += `${t % 60}초`;
  return result;
};
