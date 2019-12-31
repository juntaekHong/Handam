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

const Schedule = ({ hansunginfo, schedule_loading, schedule_color }) => {
  const [time, setTime] = useState(new Array(15).fill(0));
  const [modal, setModal] = useState(false);

  const scheduleCall = useCallback(async () => {
    closeModal();
    await HansungInfoActions.scheduleCallAction(true);
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
        footerHandler={scheduleCall}
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
