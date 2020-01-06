import navigators from "../utils/navigators";
import values from "./values";

/**
 * 설정파일
 */

const init = {
  type: "prod",
  server: {
    dev: "https://obpo33ldql.execute-api.ap-northeast-2.amazonaws.com/dev",
    prod: "https://u6g8ovcai1.execute-api.ap-northeast-2.amazonaws.com/prod"
  },
  mailServer: {
    dev: "https://obpo33ldql.execute-api.ap-northeast-2.amazonaws.com/dev",
    prod: "https://u6g8ovcai1.execute-api.ap-northeast-2.amazonaws.com/prod"
  },
  shuttleWebView: {
    dev: "http://dev.shuttle.handam.s3-website.ap-northeast-2.amazonaws.com",
    prod: "http://shuttle.handam.s3-website.ap-northeast-2.amazonaws.com"
  },
  pushKey: {
    dev: "4f682cdd-46b2-470f-976c-e61a359fc147",
    prod: "73a21036-6f4c-47d8-8ecb-d86aa26de4aa"
  },
  readingServer: {
    dev: "https://obpo33ldql.execute-api.ap-northeast-2.amazonaws.com/dev",
    prod: "https://obpo33ldql.execute-api.ap-northeast-2.amazonaws.com/dev"
  }
};

const config = {
  server: init.server[init.type],
  mailServer: init.mailServer[init.type],
  shuttleWebView: init.shuttleWebView[init.type],
  readingServer: init.readingServer[init.type],
  pushKey: init.pushKey[init.type],
  bus_url: "http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll",
  bus_key: "KBxpAljaCeVDNgnaQtyrBO8wPG5PDE1q1WWh%2B7K9N0tuiP9RPOISKOpZt2WvzJLFO6CaZrLCf4sGzPz87lF1SA%3D%3D",
  jongro: "100900010",
  seongbuk: "107900003",
  androidVersion: "2.1.0",
  iosVersion: "2.1.0",
  iosStore: {
    appID: 1437741744,
    appName: "한담"
  },
  androidStore: {
    packageName: "com.handamproject"
  },
  signDataKey: [
    "token",
    "userId",
    "BusFavorite",
    "pass_locking",
    "bio_locking",
    "lock_pass",
    "schedule_color",
    values.storeName.HOME_MENU
  ],
  homeMenu: [
    {
      sort: 1,
      title: values.homeMenuTitle.SCHEDULE,
      image: require("HandamProject/assets/image/home/schedule.png")
    },
    {
      sort: 2,
      title: values.homeMenuTitle.NOTICE,
      image: require("HandamProject/assets/image/home/notice.png")
    },
    {
      sort: 3,
      title: values.homeMenuTitle.BUS,
      image: require("HandamProject/assets/image/home/bus.png")
    },
    {
      sort: 4,
      title: values.homeMenuTitle.CIS,
      image: require("HandamProject/assets/image/home/cis.png")
    },
    {
      sort: 5,
      title: values.homeMenuTitle.READING,
      image: require("HandamProject/assets/image/home/reading.png")
    },
    {
      sort: 6,
      title: values.homeMenuTitle.CALCULATE,
      image: require("HandamProject/assets/image/home/calculation.png")
    },
    {
      sort: 7,
      title: values.homeMenuTitle.RESTAURANT,
      image: require("HandamProject/assets/image/home/restaurant.png")
    }
  ]
};

export default config;
