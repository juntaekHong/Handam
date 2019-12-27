import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import {
  DivisionView,
  MyProfessorView,
  NonResultView,
  ProfessorListView,
  SearchView
} from "../../components/professor/View";
import {
  FilterModal,
  TrackWheelPicker,
  ProfessorWheelPicker
} from "../../components/professor/Modal";
import { ProfessorActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import { widthPercentageToDP } from "../../utils/util";
import { FilterBtn } from "../../components/professor/Button";

class Professor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      filter: false,
      trackFilter: false,
      professorFilter: false,
      // filter 검색하여 리스트 불러올 시,
      filterSearch: false,
      // 검색 중 체크
      searching: false,
      // 리스트 새로고침
      refreshing: false,
      selectTrack: "해당없음",
      selectProfessor: "해당없음",

      // 학부 리스트 임시 생성.
      major_list: [
        "해당없음",
        "크리에이티브인문학부",
        "예술학부",
        "사회과학부",
        "글로벌패션산업학부",
        "ICT디자인학부",
        "뷰티디자인&매니지먼트학과",
        "컴퓨터공학부",
        "기계전자공학부",
        "IT융합공학부",
        "스마트경영공학부",
        "융합행정학과",
        "호텔외식경영학과",
        "뷰티디자인학과",
        "비즈니스컨설팅학과",
        "ICT융합디자인학과",
        "상상력인재학부",
        "기초교양교육과정",
        "융·복합교양교육과정",
        "사고와표현교육과정",
        "교양영어교육과정",
        "창의IT·디자인교육과정",
        "교원양성교육과정"
      ],
      // 검색창 검색
      inputText: ""
    };
  }

  async componentDidMount() {
    await ProfessorActions.ProfessorPageList(
      this.props.professor_list.length / 6,
      6
    );

    await ProfessorActions.myProfessorReplyPostList();
  }

  refreshProfessorList = async () => {
    await ProfessorActions.professorListInitHandle();

    const promise1 = await ProfessorActions.ProfessorPageList(
      this.props.professor_list.length / 6,
      6
    );

    Promise.all([promise1]).then(() => {});
  };

  pageListProfessorLists = async () => {
    await this.setState({ loading: true });
    if (this.state.filterSearch === false) {
      await ProfessorActions.ProfessorPageList(
        this.props.professor_list.length / 6 + 1,
        6
      );
    } else {
      // filter된 리스트 불러오기
      // await ProfessorActions.ProfessorPageList(
      //     this.props.professor_list.length / 6 + 1,
      //     6,
      //     filter
      // );
    }
    await this.setState({ loading: false });
  };

  FilterSearch = () => {
    this.setState({ filter: true });
  };

  Search = async () => {
    await this.setState({ searching: true });
    await this.setState({ filter: false });

    let professor = this.state.selectProfessor;

    if (this.state.selectProfessor === "해당없음") {
      professor = "";
    } else {
      professor = professor.substring(0, professor.length - 4);
    }

    await ProfessorActions.professorListInitHandle();
    await ProfessorActions.professorListTotalInitHandle();

    await ProfessorActions.ProfessorPageList(
      1,
      100,
      this.state.selectTrack + "",
      professor + ""
    );
    await this.setState({ filterSearch: true });
    await this.setState({ searching: false });
  };

  trackFilterModal = async () => {
    await this.setState({ filter: false });

    let timeout = setInterval(async () => {
      await this.setState({ trackFilter: true });
      clearTimeout(timeout);
    }, 300);
  };

  professorFilterModal = async () => {
    await this.setState({ filter: false });

    let timeout = setInterval(async () => {
      await this.setState({ professorFilter: true });
      clearTimeout(timeout);
    }, 300);
  };

  // 트랙 필터 선택
  selectTrackFilter = async track => {
    if (
      this.state.selectTrack !== track &&
      this.state.selectProfessor !== "해당없음"
    ) {
      await this.setState({ selectProfessor: "해당없음" });
    }
    await this.setState({ selectTrack: track });
    await this.setState({ trackFilter: false });

    await ProfessorActions.professorFilterListInitHandle();

    await ProfessorActions.FilterProfessorList(
      1,
      100,
      this.state.selectTrack + ""
    );

    let timeout = setInterval(() => {
      this.setState({ filter: true });
      clearTimeout(timeout);
    }, 800);
  };

  // 교수 필터 선택
  selectProfessorFilter = async professor => {
    await this.setState({ selectProfessor: professor });
    await this.setState({ professorFilter: false });

    let timeout = setInterval(() => {
      this.setState({ filter: true });
      clearTimeout(timeout);
    }, 300);
  };

  _onRefresh = async () => {
    this.setState({ filterSearch: false });
    this.setState({ selectTrack: "해당없음" });
    this.setState({ selectProfessor: "해당없음" });
    this.setState({ refreshing: true });
    this.setState({ inputText: "" });
    await this.refreshProfessorList();
    await ProfessorActions.myWriteProfessorListInitHandle();
    await ProfessorActions.myProfessorReplyPostList();
    this.setState({ refreshing: false });
  };

  renderListHeader = () => {
    return (
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <SearchView
          onChangeText={inputText => {
            this.setState({ inputText: inputText });
          }}
          value={this.state.inputText}
          onSubmitEditing={async () => {
            if (this.state.inputText.trim() !== "") {
              await this.setState({ searching: true });

              await this.setState({ filterSearch: true });
              await ProfessorActions.professorListInitHandle();

              const promise1 = ProfessorActions.ProfessorPageList(
                1,
                100,
                this.state.inputText + ""
              );

              Promise.all([promise1]).then(() => {
                this.setState({ searching: false });
              });
            }
          }}
        />
        {this.state.filterSearch === true ? null : (
          <MyProfessorView
            disabled={this.state.refreshing}
            refreshing={this.state.refreshing}
            MyEvaluationCount={this.props.my_write_professor_list.length}
            onPress={() => {
              this.props.navigation.navigate("MyWriteProfessorList");
            }}
          />
        )}
        <FilterBtn
          handler={() => {
            this.FilterSearch();
          }}
        />
        <DivisionView
          filterSearch={this.state.filterSearch}
          count={this.props.professor_list.length}
          searching={this.state.searching}
        />
        {this.state.searching === true ? (
          <View>
            <UIActivityIndicator
              style={{ marginTop: widthPercentageToDP(150) }}
              color={"grey"}
              size={widthPercentageToDP(30)}
            />
          </View>
        ) : this.state.filterSearch === true &&
          this.props.professor_list.length === 0 ? (
          <NonResultView text={"검색 결과가 없습니다!"} />
        ) : null}
      </View>
    );
  };

  renderListFooter = () => {
    return this.state.loading ? (
      <View style={styles.listFooterContainer}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ) : null;
  };

  render() {
    return (
      <SafeAreaView
        styl={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <FilterModal
          visible={this.state.filter}
          selectTrack={this.state.selectTrack}
          selectProfessor={this.state.selectProfessor}
          closeHandler={async () => {
            await this.setState({ filter: false });
            await this.setState({ selectTrack: "해당없음" });
            await this.setState({ selectProfessor: "해당없음" });
          }}
          trackList={() => this.trackFilterModal()}
          professorList={() => this.professorFilterModal()}
          footerHandler={() => this.Search()}
        />
        <TrackWheelPicker
          width={316}
          height={344}
          visible={this.state.trackFilter}
          data={this.state.major_list}
          value={this.state.selectTrack}
          closeHandler={async () => {
            await this.setState({ trackFilter: false });

            let timeout = setInterval(() => {
              this.setState({ filter: true });
              clearTimeout(timeout);
            }, 500);
          }}
          footerHandler={this.selectTrackFilter}
        />
        <ProfessorWheelPicker
          width={316}
          height={344}
          visible={this.state.professorFilter}
          data={this.props.professor_filter_list}
          value={this.state.selectProfessor}
          closeHandler={async () => {
            await this.setState({ professorFilter: false });

            let timeout = setInterval(() => {
              this.setState({ filter: true });
              clearTimeout(timeout);
            }, 500);
          }}
          footerHandler={this.selectProfessorFilter}
        />

        <ProfessorListView
          detail={this.props.professor_list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          ListHeaderComponent={this.renderListHeader}
          ListFooterComponent={this.renderListFooter}
          professorDetail={this.props.navigation}
          onEndReached={() => {
            this.props.professor_list.length < this.props.professor_list_total
              ? this.pageListProfessorLists()
              : null;
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listFooterContainer: {
    height: widthPercentageToDP(122),
    width: widthPercentageToDP(375),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(state => ({
  track_list: state.common.track_list,
  professor_filter_list: state.professor.professor_filter_list,
  professor_list: state.professor.professor_list,
  professor_list_total: state.professor.professor_list_total,
  my_write_professor_list: state.professor.my_write_professor_list
}))(Professor);
