/**
 * 설정파일
 */

const init = {
  type: "dev",
  server: {
    dev: "https://obpo33ldql.execute-api.ap-northeast-2.amazonaws.com/dev",
    prod: "https://www.handam.kr"
  },
  mailServer: {
    dev: "https://hee4gbx1d9.execute-api.us-west-2.amazonaws.com/dev",
    prod: "https://www.handam.kr"
  },
  shuttleWebView: {
    dev: "http://dev.handam.tk.s3-website.ap-northeast-2.amazonaws.com",
    prod: "http://shuttle.handam.tk.s3-website.ap-northeast-2.amazonaws.com"
  },
  pushKey: {
    dev: "4f682cdd-46b2-470f-976c-e61a359fc147",
    prod: "73a21036-6f4c-47d8-8ecb-d86aa26de4aa"
  }
};

const config = {
  server: init.server[init.type],
  mailServer: init.mailServer[init.type],
  shuttleWebView: init.shuttleWebView[init.type],
  pushKey: init.pushKey[init.type],
  bus_url: "http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll",
  bus_key:
    "KBxpAljaCeVDNgnaQtyrBO8wPG5PDE1q1WWh%2B7K9N0tuiP9RPOISKOpZt2WvzJLFO6CaZrLCf4sGzPz87lF1SA%3D%3D",
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
    "schedule_color"
  ]
};

export default config;
