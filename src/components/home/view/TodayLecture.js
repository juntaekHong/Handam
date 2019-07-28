import React, { useEffect } from "react";
import styled from "styled-components";
import {
  widthPercentageToDP,
  scheduleContent,
  scheduleTime
} from "../../../utils/util";
import { ButtonStyle } from "../../common/Button";
import { Image, View } from "react-native";
import { HCenterView, CenterView } from "../../common/View";
import { NBGBText, NBGText } from "../../common/Text";
import colors from "../../../configs/colors";
import { connect } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";

const CertificateButton = styled(ButtonStyle)`
width: ${widthPercentageToDP(128)}
height: ${widthPercentageToDP(36)}
margin-bottom: ${widthPercentageToDP(97)}
background-color: #24a0fa
`;

const ScheduleView = styled.View`
  margin-top: ${widthPercentageToDP(12)};
`;

const ScheduleItem = styled.View`
  width: ${widthPercentageToDP(310)}
  height: ${widthPercentageToDP(63)}
  padding-left: ${widthPercentageToDP(20)}
  padding-right: ${widthPercentageToDP(17.6)}
  margin-bottom: ${widthPercentageToDP(10)}
  border-radius: ${widthPercentageToDP(10)}
  background-color: #f8f8f8
  flex-direction: row
  justify-content: space-between
  align-items: center
`;

const ScheduleTimeView = styled.View`
  align-items: center;
`;

const ScheduleTimeText = styled(NBGBText)`
  font-size: ${widthPercentageToDP(13)}
  color: #646464
`;

const NoScheduleView = styled.View`
  padding-top: ${widthPercentageToDP(69.5)}
  padding-bottom: ${widthPercentageToDP(69.5)}
  justify-content: center
  align-items: center
`;

const TodayLecture = ({
  hansunginfo = null,
  schedule_loading,
  goCertificate,
  day
}) => {
  useEffect(() => {}, []);
  if (hansunginfo === null) {
    return (
      <HCenterView>
        <Image
          style={{
            width: widthPercentageToDP(61),
            height: widthPercentageToDP(61),
            marginTop: widthPercentageToDP(22.5),
            marginBottom: widthPercentageToDP(16)
          }}
          source={require("HandamProject/assets/image/home/certificationimage.png")}
        />
        <NBGBText fontSize={15} color={"#646464"} marginBottom={7.5}>
          한성대학교를 인증해주세요!
        </NBGBText>
        <NBGText fontSize={13} color={"#9e9e9e"} marginBottom={21.5}>
          인증을 통해 시간표를 확인할 수 있습니다.
        </NBGText>
        <CertificateButton onPress={goCertificate}>
          <NBGBText color={colors.white}>인증하러 가기!</NBGBText>
        </CertificateButton>
      </HCenterView>
    );
  } else if (schedule_loading) {
    return (
      <HCenterView>
        <UIActivityIndicator color={"grey"} />
        <NBGText
          fontSize={12}
          style={{ textAlign: "center", marginBottom: widthPercentageToDP(97) }}
        >
          {"시간표를 불러오는 중입니다.\n잠시만 기다려주세요."}
        </NBGText>
      </HCenterView>
    );
  } else if (
    hansunginfo !== null &&
    hansunginfo.schedule.monday === undefined
  ) {
    return null;
  } else {
    return (
      <ScheduleView>
        {hansunginfo.schedule[day] === undefined ||
        hansunginfo.schedule[day].length === 0 ? (
          <NoScheduleView>
            <NBGText fontSize={13} color={"#767676"}>
              오늘은 강의가 없습니다!
            </NBGText>
          </NoScheduleView>
        ) : (
          hansunginfo.schedule[day].map(item => {
            const content = scheduleContent(item.content);
            const time = scheduleTime(item.time);
            return (
              <ScheduleItem>
                <NBGBText
                  width={158.4}
                  fontSize={15}
                  color={"#363636"}
                  numberOfLines={1}
                >
                  {content[0]}
                </NBGBText>
                <ScheduleTimeView>
                  <ScheduleTimeText numberOfLines={1} marginBottom={6.5}>
                    {content[2]}
                  </ScheduleTimeText>
                  <ScheduleTimeText numberOfLines={1}>
                    {`${time[0]}:${time[1]}`} - {`${time[2]}:${time[3]}`}
                  </ScheduleTimeText>
                </ScheduleTimeView>
              </ScheduleItem>
            );
          })
        )}
      </ScheduleView>
    );
  }
};

export default connect(({ hansung }) => ({
  hansunginfo: hansung.hansunginfo,
  schedule_loading: hansung.schedule_loading
}))(TodayLecture);
