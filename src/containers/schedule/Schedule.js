import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { BaseView, Title, Scroll } from "../../components/common/View";
import { TableHeader } from "../../components/schedule/view/TableHeader";
import { TableBody } from "../../components/schedule/view/TableBody";
import {
  ScheduleView,
  Absolute
} from "../../components/schedule/view/ScheduleView";
import { ScheduleLoading } from "../../components/schedule/view/SchduleLoading";
import { ScheduleContent } from "../../components/schedule/view/ScheduleContent";
import { widthPercentageToDP, dayToInt } from "../../utils/util";
import { ScheduleFloatButton } from "../../components/schedule/button/ScheduleFloatButton";
import { HansungInfoActions } from "../../store/actionCreator";
import { ScheduleModal } from "../../components/schedule/modal/ScheduleModal";
import navigators from "../../utils/navigators";
import { getData } from "../../utils/util";

const Schedule = ({ hansunginfo, schedule_loading, schedule_color }) => {
  const [time, setTime] = useState(new Array(15).fill(0));
  const [modal, setModal] = useState(false);
  const [isHansungInfoPw, setIsHansungInfoPw] =useState(true);

  const scheduleCall = useCallback(async () => {
    const hansungInfoPw = await getData('hansungInfoPw')
    if(hansungInfoPw===null){
      setIsHansungInfoPw(false)
    } else {
      closeModal();
      await HansungInfoActions.scheduleCallAction(true);
    }
  }, []);

  const visibleModal = useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <BaseView>
      <Title title={"시간표"} rightInVisible={true} />
      <ScheduleModal
        visible={modal}
        closeHandler={closeModal}
        children={isHansungInfoPw?"시간표를 불러오는데\n최대 수 분 정도 소요될 수 있습니다.":`인증서에 문제가 있습니다.\n인증서를 삭제 후 재등록해주세요.`}
        footerHandler={isHansungInfoPw? scheduleCall:()=>[closeModal(), navigators.navigate('MyInfo')]}
      />
      <BaseView>
        <TableHeader />
        <Scroll>
          {time.map((item, index) => {
            return (
              <TableBody
                key={index}
                index={index + 1}
                content={`${(index === 0 ? "0" : "") + (index + 9)}:00`}
              />
            );
          })}
          <Absolute>
            <ScheduleView>
              {hansunginfo !== null
                ? hansunginfo.schedule.monday !== undefined
                  ? Object.keys(hansunginfo.schedule).map((item, index) => {
                      return hansunginfo.schedule[item].map((schedule, i) => {
                        return (
                          <ScheduleContent
                            key={i}
                            color={schedule_color}
                            left={dayToInt(item)}
                            content={schedule.content}
                            time={schedule.time}
                          />
                        );
                      });
                    })
                  : null
                : null}
            </ScheduleView>
          </Absolute>
        </Scroll>
        <ScheduleFloatButton onPress={visibleModal} />
        {schedule_loading ? (
          <Absolute>
            <ScheduleLoading />
          </Absolute>
        ) : null}
      </BaseView>
    </BaseView>
  );
};

export default connect(({ hansung }) => ({
  hansunginfo: hansung.hansunginfo,
  schedule_loading: hansung.schedule_loading,
  schedule_color: hansung.schedule_color
}))(Schedule);
