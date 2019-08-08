import React, { useCallback, useEffect, useState, Fragment } from "react";
import DeviceInfo from "react-native-device-info";
import api from "../../utils/api";
import { Platform, Linking } from "react-native";
import { CenterView } from "../../components/common/View";
import { NBGText } from "../../components/common/Text";
import navigators from "../../utils/navigators";
import { LoadingUpdate } from "../../components/update/View";
import { UpdateModal } from "../../components/update/Modal";
import config from "../../configs/config";

const LibraryUpdate = props => {
  const [err, setErr] = useState(false);
  const [update, setUpdate] = useState(false);

  const getVersion = useCallback(async () => {
    const result = await api.get(`/version`);
    if (Platform.OS === "android") return result.result.android;
    else return result.result.ios;
  }, []);

  const compareVersion = useCallback(async () => {
    try {
      let device_version = DeviceInfo.getVersion();
      let version = await getVersion();
      if (device_version.localeCompare(version) < 0) {
        setUpdate(true);
      } else {
        navigators.navigate("update");
      }
    } catch (e) {
      setErr(true);
    }
  }, []);

  const updateLink = useCallback(async () => {
    let url;
    if (Platform.OS === "android")
      url = `market://details?id=${config.androidStore.packageName}`;
    else
      url = `itms-apps://itunes.apple.com/us/app/id${config.iosStore.appID}?mt=8`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      setErr(true);
    }
  }, []);
  useEffect(() => {
    if (!err) compareVersion();
  }, [err]);
  return (
    <CenterView>
      <UpdateModal visible={update} footerHandler={updateLink} close={false} />
      {err ? (
        <NBGText style={{ textAlign: "center" }}>
          {"오류가 발생했습니다.\n앱을 다시 실행 해주세요."}
        </NBGText>
      ) : (
        <LoadingUpdate>
          <NBGText style={{ textAlign: "center" }}>
            {"필수 라이브러리 업데이트를 확인합니다."}
          </NBGText>
        </LoadingUpdate>
      )}
    </CenterView>
  );
};

export default LibraryUpdate;
