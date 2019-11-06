import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { HCenterView, Title, BaseView } from "../../components/common/View";
import { ReadingActions, CommonActions } from "../../store/actionCreator";
import { Animated, View, Button } from "react-native";
import {
  ReadingCountView,
  ReadingTabContainer,
  ReadingTab,
  ReadingRefresh,
  ReadingTimeView,
  SeatMapContainer
} from "../../components/reading/View";
import { widthPercentageToDP as wp } from "../../utils/util";
import { NBGBText } from "../../components/common/Text";
import colors from "../../configs/colors";
import moment from "moment";
import "moment/locale/ko";
import { Room1 } from "../../components/reading/view/Room1";
import { Room2 } from "../../components/reading/view/Room2";
import { Room4 } from "../../components/reading/view/Room4";

const duration = 700;
const timeNow = () => {
  return moment().format("YYYY-MM-DD A h:mm:ss");
};
const ReadingRoom = props => {
  const totalCounter = useRef(new Animated.Value(0));
  const useCounter = useRef(new Animated.Value(0));
  const restCounter = useRef(new Animated.Value(0));

  const [room, setRoom] = useState(1);
  const [roomName, setRoomName] = useState({
    1: "제1 열람실",
    2: "제2 열람실",
    4: "우촌관열람실"
  });
  const [total, setTotal] = useState(0);
  const [use, setUse] = useState(0);
  const [rest, setRest] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [time, setTime] = useState(timeNow());
  const [seats, setSeats] = useState([]);

  getRoom = useCallback(async () => {
    await CommonActions.handleLoading(true);
    const result = await ReadingActions.getLibraryCount(room);
    await CommonActions.handleLoading(false);
    setTime(timeNow());
    setSeats(result.seats);
    let count = 0;
    totalCounter.current = new Animated.Value(0);
    useCounter.current = new Animated.Value(0);
    restCounter.current = new Animated.Value(0);
    Animated.parallel([
      Animated.timing(totalCounter.current, {
        toValue: result.total,
        duration
      }),
      Animated.timing(useCounter.current, {
        toValue: result.use,
        duration
      }),
      Animated.timing(restCounter.current, {
        toValue: result.rest,
        duration
      })
    ]).start();

    totalCounter.current.addListener(progress => setTotal(parseInt(progress.value)));
    useCounter.current.addListener(progress => setUse(parseInt(progress.value)));
    restCounter.current.addListener(progress => setRest(parseInt(progress.value)));
  }, [room]);

  onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getRoom();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getRoom();
  }, [room]);

  return (
    <HCenterView>
      <Title title={"열람실 조회"} rightInVisible={true} />
      <ReadingTabContainer>
        <ReadingTab title={"제1 열람실"} selected={room === 1} onPress={() => setRoom(1)} />
        <ReadingTab title={"제2 열람실"} selected={room === 2} onPress={() => setRoom(2)} />
        <ReadingTab title={"우촌관열람실"} selected={room === 4} onPress={() => setRoom(4)} />
      </ReadingTabContainer>
      <BaseView style={{ width: "100%", paddingHorizontal: wp(26), paddingTop: wp(12) }}>
        <ReadingRefresh title={roomName[room]} onPress={() => getRoom()} />
        <ReadingCountView total={total} use={use} rest={rest} />
        <NBGBText color={colors.active} fontSize={14}>
          실시간 좌석 정보
        </NBGBText>
        <ReadingTimeView time={time} />
        <SeatMapContainer>
          {room === 1 ? <Room1 data={seats} /> : room === 2 ? <Room2 data={seats} /> : <Room4 data={seats} />}
        </SeatMapContainer>
      </BaseView>
    </HCenterView>
  );
};

export default connect()(ReadingRoom);
