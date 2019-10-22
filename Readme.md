## 한담 App

#

### 설치 및 실행

- git

```sh
$ git clone https://Guyclops@bitbucket.org/Guyclops/handamclient.git
```

- npm install

```
$ npm install
```

- react-native linking

```
$ react-native link
```

- app run

```
$ react-native run-android
$ react-native run-ios
```

#

### 모듈 수정 및 주의 사항

- rn-imagecapinsets

  - RCTImageLoaderTask.java의 doInBackground 수정

  ```
   @Override
    protected Bitmap doInBackground(String... params) {
        try{
            if (mUri.startsWith("http")) {
                return loadBitmapByExternalURL(mUri);
            }
        return loadBitmapByLocalResource(mUri);
        }catch(Exception e){
            e.printStackTrace();
            return loadBitmapByLocalResource(mUri);
        }
    }
  ```

  - Code-Push 사용시 해당 이미지를 못찾는 문제 발생. native에 이미지를 넣어서 고정경로 사용

- IOS 13 대응(react-native 0.59.1 사용시)

  - onesignal 모듈 사용 시 최신버전으로 사용할 것(v3.4.2 이상)
  - StatusBar 설정 시 react xcodeproject내 RCTStatusBarManager.m 수정

  ```
  #pragma clang diagnostic push
  #pragma clang diagnostic ignored "-Wunguarded-availability"

  RCT_ENUM_CONVERTER(UIStatusBarStyle, (@{
  @"default": @(UIStatusBarStyleDefault),
  @"light-content": @(UIStatusBarStyleLightContent),
  @"dark-content": (@available(iOS 13.0, *)) ? @(UIStatusBarStyleDarkContent) : @(UIStatusBarStyleDefault),
  }), UIStatusBarStyleDefault, integerValue);
  #pragma clang diagnostic pop
  ```
