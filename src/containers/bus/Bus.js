import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Title, BaseView } from "../../components/common/View";
import { TimeTable } from "../../components/bus/view/TimeTable";
import { BusActions, CommonActions } from "../../store/actionCreator";
import moment from "moment";
import { ShuttleWebView } from "../../components/bus/view/ShuttleWebView";
import { BusList } from "../../components/bus/view/BusList";
import { BusTab } from "../../components/bus/view/BusTab";
import { BusFloatButton } from "../../components/bus/button/BusFloatButton";
import { getData, storeData } from "../../utils/util";

const Bus = ({ navigation, jongro_text, seongbuk_text, seongbuk_list, jongro_list }) => {
  const [index, setIndex] = useState(1);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState({});

  const navigateTimeTable = useCallback(() => {
    navigation.navigate("bustime");
  }, []);
  const goBack = useCallback(() => {
    navigation.navigate("home");
  }, []);

  const onIndexChange = useCallback(
    value => {
      setIndex(value);
      switch (value) {
        case 0:
          setTime(moment().format("hh:mm"));
          break;
        case 1:
          setTime(seongbuk_text);
          break;
        case 2:
          setTime(jongro_text);
          break;
      }
    },
    [seongbuk_text, jongro_text]
  );

  const getBusList = useCallback(async type => {
    await BusActions.getBusList(type);
  }, []);

  const initCall = async () => {
    setTime(moment().format("hh:mm"));
    CommonActions.handleLoading(true);
    let value = await getData("BusFavorite");
    if (value !== null) setFavorite(JSON.parse(value));
    await getBusList("jongro");
    await getBusList("seongbuk");
    CommonActions.handleLoading(false);
  };

  const floatAction = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    CommonActions.handleLoading(true);
    switch (index) {
      case 1:
        await getBusList("seongbuk");
        setTime(seongbuk_text);
        break;
      case 2:
        await getBusList("jongro");
        setTime(jongro_text);
        break;
    }
    CommonActions.handleLoading(false);
    setLoading(false);
  }, [loading, time, index, seongbuk_text, jongro_text]);

  const handleFavorite = useCallback(
    async id => {
      let data = favorite;
      let value = true;
      if (data[id] !== undefined && data[id] === true) value = false;
      let tmp = {
        ...data,
        [`${id}`]: value
      };
      setFavorite(tmp);
      storeData("BusFavorite", JSON.stringify(tmp));
    },
    [favorite]
  );

  useEffect(() => {
    initCall();
  }, []);

  return (
    <BaseView>
      <Title title={"마을버스"} rightInVisible={true} leftHandler={goBack} />
      <BusTab onPress={onIndexChange} index={index} />
      <TimeTable time={time} onPress={navigateTimeTable} />
      {index == 0 ? (
        <ShuttleWebView />
      ) : index == 1 ? (
        <BusList list={seongbuk_list} favorite={favorite} handleFavorite={handleFavorite} />
      ) : (
        <BusList list={jongro_list} favorite={favorite} handleFavorite={handleFavorite} />
      )}
      {index !== 0 ? <BusFloatButton onPress={floatAction} /> : null}
    </BaseView>
  );
};

export default connect(({ bus }) => ({
  jongro_text: bus.jongro_text,
  jongro_list: bus.jongro_list,
  seongbuk_text: bus.seongbuk_text,
  seongbuk_list: bus.seongbuk_list
}))(Bus);
