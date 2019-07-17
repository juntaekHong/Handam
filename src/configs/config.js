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
    dev: "6e80b31a-035d-4e06-a1d4-f5a6dc2dc03e",
    prod: "387bb36c-0500-4ede-8a9a-64492267cfae"
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
  signDataKey: ["token", "userId", "BusFavorite"],
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkluZGV4IjozNTUsInRva2VuSWQiOiJ0bHN3bnN4b0BuYXZlci5jb20iLCJ0b2tlbk5pY2tuYW1lIjoiMHVmOWRmZHNhZmQiLCJ0b2tlbk1ham9yIjoi7ZiE64yA66y07JqpIOyghOqztSIsInRva2VuTWlub3IiOm51bGwsInRva2VuRG91YmxlTWFqb3IiOm51bGwsInRva2VuQ29ubmVjdGVkTWFqb3IiOm51bGwsInRva2VuSW5WYWxpZGF0aW9uIjoxLCJ0b2tlbkF2YXRhciI6bnVsbCwidG9rZW5TdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE1NjIxNTcwMTJ9.0ZP-p-7rv5HpLS6Ny73HcZ9x8wuqO3awu07FwrOuyrM",
  userId: "tlswnsxo@naver.com"
};

export default config;
