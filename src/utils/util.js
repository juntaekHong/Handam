/*
 * util 모음
 * widthPercentageToDp: 디바이스 크기에 따라 크기 변환
 * storeData, getData, removeData: Local Data 읽기, 쓰기
 */
import { Dimensions, PixelRatio, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../configs/config";
import Toast from "react-native-root-toast";
import moment from "moment";
import ExtraDimensions from "react-native-extra-dimensions-android";

const screenWidth = Platform.OS === "android" ? ExtraDimensions.getRealWindowWidth() : Dimensions.get("window").width;

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
  if (date === null || date === undefined || date === "") return "";

  let d = date.indexOf("+");
  if (d >= 0) date = date.substring(0, d);
  date = date.replace("T", " ");
  date = date.replace("Z", "");
  let t1 = moment(date);
  let t2 = moment();

  let seconds = moment.duration(t2.diff(t1)).asSeconds();

  if (isNaN(seconds)) {
    return "";
  }

  if (seconds < 0) return "0 초전";

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

export const timeFormat = (date, format) => {
  try {
    const result = moment(date).format(format);
    return result;
  } catch (e) {
    return "";
  }
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

export const scheduleContent = value => {
  const lecture = value.substring(0, value.indexOf(")") + 1);
  const professor = value.substring(value.indexOf(")") + 1, value.indexOf(")") + 4);
  const room = value.substring(value.indexOf(")") + 4);
  return [lecture, professor, room];
};

export const scheduleTime = time => {
  const array = time.split(" ");
  const time1 = array[0];
  let hour1 = time1.substring(0, time1.indexOf(":"));
  const minute1 = time1.substring(time1.indexOf(":") + 1);
  const time2 = array[3];
  let hour2 = time2.substring(0, time2.indexOf(":"));
  const minute2 = time2.substring(time2.indexOf(":") + 1);
  if (array[1] === "PM" && hour1 !== "12") hour1 = Number(hour1) + 12 + "";
  if (array[4] === "PM" && hour2 !== "12") hour2 = Number(hour2) + 12 + "";
  return [hour1, minute1, hour2, minute2];
};

export const dayToString = value => {
  switch (value) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
  }
};

export const dayToInt = value => {
  switch (value) {
    case "monday":
      return 0;
    case "tuesday":
      return 1;
    case "wednesday":
      return 2;
    case "thursday":
      return 3;
    case "friday":
      return 4;
    case "saturday":
    case "sunday":
      return 5;
  }
};

export const makeColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return "hsl(" + hue + ", 100%, 87.5%)";
};
