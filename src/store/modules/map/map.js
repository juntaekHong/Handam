import { createAction, handleActions } from "redux-actions";
import { getData, storeData, widthPercentageToDP as wp } from "../../../utils/util";
import { produce } from "immer";

const initState = {
  mapList: [
    {
      name: "낙산관",
      title: "낙산관",
      subTitle: "Naksan hall (Gym)",
      index: 1,
      top: 382.2,
      left: 266.4,
      width: 65.2,
      height: 93.9,
      btnStyle: {
        top: 40,
        left: 25.6
      },
      nameStyle: {
        top: 61.8,
        left: 19.6
      },
      mainInfo: ["무용학과 실습실", "체육시설"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "4F",
          info: [["체육관관람석", "체력단련실"]]
        },
        {
          floor: "3F",
          info: [["체육관", "체육관기자재실"]]
        },
        {
          floor: "2F",
          info: [["대강당"]]
        },
        {
          floor: "1F",
          info: [["무용학과 실습실"]]
        },
        {
          floor: "B1",
          info: [["기계실"]]
        }
      ]
    },
    {
      name: "인성관",
      title: "인성관",
      subTitle: "Humanities hall",
      index: 2,
      top: 387.5,
      left: 358.6,
      width: 81.5,
      height: 39.4,
      btnStyle: {
        top: 1.8,
        left: 34.9
      },
      nameStyle: {
        top: 4.5,
        left: 5.4
      },
      mainInfo: ["동아리방"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "5F",
          info: [
            ["극예술연구회", "경제학연구회", "로사리오", "한불회"],
            ["플래쉬", "UBF", "IVF", "CAM", "JOY", "CCC"],
            ["동아리연합회"]
          ]
        },
        {
          floor: "4F",
          info: [
            ["영화다솜", "한성타이포그래피연구회", "유스호스텔"],
            ["매나니로", "별조각", "VISION", "이무기", "H-LEP"],
            ["타임", "PIG", "셈들"]
          ]
        },
        {
          floor: "3F",
          info: [
            ["TRIAX-4000", "해랑사리우", "UP", "한음", "한얼"],
            ["DC & M", "바팔로", "피닉스", "테니스부", "한검회"],
            ["터틀스"]
          ]
        },
        {
          floor: "2F",
          info: [
            ["HBRG", "SGS", "BUG", "목표는상장", "Team ODD"],
            ["탈패", "해외봉사단H.A.V.E", "등불", "한성오케스트라"],
            ["낙산극회", "NOD"]
          ]
        }
      ]
    },
    {
      name: "창의관",
      title: "창의관",
      subTitle: "Creativity hall",
      index: 3,
      top: 417.4,
      left: 354.6,
      width: 89.1,
      height: 50.3,
      btnStyle: {
        top: 13.7,
        left: 38.6
      },
      nameStyle: {
        top: 31.6,
        left: 33.4
      },
      mainInfo: ["디자인대학", "학생&교직원식당", "매점"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "6F",
          info: [["인테리어 디자인과 사무실", "컴퓨터실", "샘플실"], ["정보자료실"]]
        },
        {
          floor: "5F",
          info: [
            ["융복합디자인부(시각영상전공)사무실"],
            ["실기실(A,B,C,D)", "그룹실기실(A,B)", "컴퓨터실기실"],
            ["공작실", "스튜디오"]
          ]
        },
        {
          floor: "4F",
          info: [
            ["융복합디자인학부(애니제품전공)사무실"],
            ["애니메이션 스튜디오(A,B,C,D,E)"],
            ["제품 스튜디오(A,B,C)", "제품실습공작실"]
          ]
        },
        {
          floor: "3F",
          info: [
            ["글로벌패션산업학부 사무실", "의복구성실", "CAD실"],
            ["패션정보실", "패션마케팅실", "패션소재실", "염색실"]
          ]
        },
        {
          floor: "2F",
          info: [
            ["창작디자인실", "디자인개발실", "패션드로잉실"],
            ["예술대학 학생회실", "동아리연합회", "학생복지위원회"],
            ["총학생회 사무실1,2", "졸업준비위원회", "HBS방송국"]
          ]
        },
        {
          floor: "1F",
          info: [
            ["학생지원팀 & 장학복지팀", "소강당", "상담실", "경비실"],
            ["건강(관리실/휴게실)", "스터디룸", "총대위원회"]
          ]
        },
        {
          floor: "1F",
          info: [["교직원식당", "학생식당", "매점", "이발소"]]
        }
      ]
    },
    {
      name: "미래관",
      title: "미래관",
      subTitle: "Future hall",
      index: 4,
      top: 507.3,
      left: 348.6,
      width: 120,
      height: 75.1,
      btnStyle: {
        top: 17.2,
        left: 53.4
      },
      nameStyle: {
        top: 35.7,
        left: 48.4
      },
      mainInfo: ["학술정보관", "출력센터", "카페", "열람실"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "6F",
          info: [["Design & 정보센터", "멀티미디어 정보실"], ["그룹스터디실", "하늘정원"]]
        },
        {
          floor: "5F",
          info: [["인문 자연과학자료실", "그룹스터디실"], ["상상커먼스"]]
        },
        {
          floor: "4F",
          info: [["사회과학자료실", "그룹스터디실"], ["제 2 열람실"]]
        },
        {
          floor: "3F",
          info: [["어문학자료실", "그룹스터디실"], ["제 1 열람실"]]
        },
        {
          floor: "2F",
          info: [["Information Desk", "학술정보팀", "학술정보관장실"], ["전자계산소장실", "정보화팀", "안내실"]]
        },
        {
          floor: "1F",
          info: [["보존서고 & 학위논문실", "디지털 스튜디오"], ["대학사료실", "농경생활사 전시관", "사이버강좌 운영실"]]
        },
        {
          floor: "B1",
          info: [
            ["DLC / ELC", "카페테리아", "통합기자재실", "강의실"],
            ["교육혁신지원팀", "학생상담센터", "자유실습실"]
          ]
        },
        {
          floor: "B2",
          info: [["주차장", "중앙관제실", "특고압수전실", "기계실"], ["전기실"]]
        }
      ]
    },
    {
      name: "상상관",
      title: "상상관",
      subTitle: "Imagination hall",
      index: 5,
      top: 514.3,
      left: 469,
      width: 60.3,
      height: 92.8,
      btnStyle: {
        top: 39.4,
        left: 23.2
      },
      nameStyle: {
        top: 20.7,
        left: 18
      },
      mainInfo: ["행정사무실", "강의실", "팥고당", "휴게실"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "12F",
          info: [["컨피런스 홀", "밀가옥"]]
        },
        {
          floor: "11F",
          info: [["연구실", "세미나실", "강의실", "박사원우회실"], ["석사원우회실"]]
        },
        {
          floor: "10F",
          info: [["대학원장실", "교학부장실", "대학원교학팀", "강의실"], ["대학원동문회실", "컴퓨터실습실"]]
        },
        {
          floor: "9F",
          info: [["이사장실", "법인사무국", "총장실", "비서실", "대회의실"], ["소회의실", "미팅룸", "네트워크실"]]
        },
        {
          floor: "8F",
          info: [
            ["교무처장실", "기획처장실", "학생처장실", "총무처장실"],
            ["입학홍보처장실", "교수지원팀", "경영기획팀"],
            ["전략평가팀", "총무인사팀", "중회의실", "미팅룸"]
          ]
        },
        {
          floor: "7F",
          info: [["강의실", "교강사휴게실", "학생휴게실"]]
        },
        {
          floor: "6F",
          info: [["강의실"]]
        },
        {
          floor: "5F",
          info: [["강의실"]]
        },
        {
          floor: "4F",
          info: [["IPP사업단(단장실,행정사무실,컴퓨터세미나실"], ["컴퓨터실습실,세미나실,깅의실)"]]
        },
        {
          floor: "3F",
          info: [["컴퓨터실습실", "강의실", "통합기자재실", "네트워크실"]]
        },
        {
          floor: "2F",
          info: [["강의실", "여학생휴게실", "팥고당"]]
        },
        {
          floor: "1F",
          info: [["한성아키비움", "건강관리실"]]
        },
        {
          floor: "B1",
          info: [
            ["창업지원단(단장실,사무실)", "취업창업R&D센터"],
            ["진로상담실", "취업지원팀", "언어교육센터(강사실,"],
            ["사무실,조교실)", "관람석", "주차장"]
          ]
        },
        {
          floor: "B2",
          info: [["취업창업상담실", "세미나실", "SK청년비상", "세미나실"], ["체육공간", "G.X룸", "주차장"]]
        }
      ]
    },
    {
      name: "우촌관",
      title: "우촌관",
      subTitle: "Woochon hall",
      index: 6,
      top: 622,
      left: 350.2,
      width: 167.7,
      height: 36.5,
      btnStyle: {
        top: 11.2,
        left: 76.1
      },
      nameStyle: {
        top: 13,
        left: 98.8
      },
      mainInfo: ["학과행정실", "학생회실", "학사지원팀"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "7F",
          info: [["연구실", "상담실", "직원휴게실"]]
        },
        {
          floor: "6F",
          info: [
            ["산학협력단(단장실/부단장실)", "기자실", "홍보대사실"],
            ["대외홈보팀", "교육과 로봇 연구소", "교육정책연구소"],
            ["산학협력단 사업추진팀", "산학연컨소시엄센터"],
            ["인테리어디자인전공", "대학원실습실"],
            ["지식서비스 & 컨설팅연계전공 사무실"],
            ["한국연구재단 공동연구지원실"],
            ["특성화연계전공 사무실"]
          ]
        },
        {
          floor: "5F",
          info: [
            ["부동산경영/뷰티디자인", "영어과 행정실"],
            ["부동산학과 행정실", "행정과 행정실", "무역과 행정실"],
            ["국어국문전공 사무실", "역사문화학과 행정실"],
            ["경영학과 행정실", "교양과 행정실", "교직과 행정실"],
            ["지식정보학과 행정실", "지식경제학과 행정실"],
            ["노조사무실", "교양영어 행정실", "국방기술연구센터"],
            ["CRM 연계전공 행정실", "인터렉티브 연계전공 실습실"],
            ["뉴미디어광고 프로모션학과 사무실"]
          ]
        },
        {
          floor: "4F",
          info: [
            ["예술대학원 학과실", "교수실", "분장예술실습실", "회의실"],
            ["뷰티에스테틱실습실", "헤어디자인실습실"],
            ["락커실/휴게실", "뷰티색채학/웨딩플레너실습실"]
          ]
        },
        {
          floor: "3F",
          info: [
            ["학사지원팀", "국제교류협력팀", "외국인유학생지원센터"],
            ["입학팀", "재무회계팀", "교강사실", "연구실", "상담실"],
            ["TLC II 학습연량개발팀", "예비군실"]
          ]
        },
        {
          floor: "2F",
          info: [
            ["학생회실(행정학과/부동산학과/사회과학대"],
            ["무역학과/의류패션전공/인테리어전공/지식정보"],
            ["영어영문학부/영사문화학부/국어국문전공/인문대"],
            ["지식정보학부 실습실", "인문학과,사회과학연구소"],
            ["고시반 열람실"]
          ]
        },
        {
          floor: "1F",
          info: [
            ["자유열람실", "SK청년 비상사업단", "우체국", "구내서점"],
            ["안내 및 주차관리실", "통신실", "학부동문회실"],
            ["학생회실(경영학부/무용학과/애니제품/시각영상"]
          ]
        }
      ]
    },
    {
      name: "진리관",
      title: "진리관",
      subTitle: "Veritas hall",
      index: 7,
      top: 616.1,
      left: 544.4,
      width: 142.8,
      height: 45,
      btnStyle: {
        top: 17.2,
        left: 64.4
      },
      nameStyle: {
        top: 19.9,
        left: 31.6
      },
      mainInfo: ["학생장학팀", "총학생회"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "4F",
          info: [[""]]
        },
        {
          floor: "3F",
          info: [["패션디자인기획학 대학원실", "강의실", "컴퓨터실습실"]]
        },
        {
          floor: "2F",
          info: [
            ["애니제품/시각영상디자인대학원", "강의실", "총학생회"],
            ["감사위원회", "총대의원회", "학생복지위원회"],
            ["졸업준비위원회", "HBS방송국", "컴퓨터실습실"],
            ["미용실습실", "인문/사회과학연구원"]
          ]
        },
        {
          floor: "1F",
          info: [
            ["시설지원팀", "학생장학팀", "사고와표현 행정실"],
            ["복사실", "모형실습실", "홍보자료실", "입학홍보실"],
            ["서울특별시 의회 민원행정서비스 지원단"],
            ["장애학생지원센터", "평생교육원(패션실습실,"],
            ["실내디자인 실습실, PC실습실)"]
          ]
        }
      ]
    },
    {
      name: "",
      title: "흡연실",
      subTitle: "Smoking area",
      index: 8,
      top: 699,
      left: 573.2,
      width: 16.1,
      height: 35.3,
      btnStyle: {
        top: 10.3,
        left: 1.4
      },
      nameStyle: {
        top: 0,
        left: 0
      },
      mainInfo: ["흡연실"],
      enabled: false,
      // detail 높은층부터
      detailEnable: false,
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    },
    {
      name: "학송관",
      title: "학송관",
      subTitle: "Haksong hall",
      index: 9,
      top: 671.2,
      left: 598.9,
      width: 39.9,
      height: 91.5,
      btnStyle: {
        top: 29.8,
        left: 13
      },
      nameStyle: {
        top: 48.8,
        left: 8.1
      },
      mainInfo: ["대학원교학실", "대학원장실", "한디원"],
      enabled: false,
      // detail 높은층부터
      detailEnable: false,
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    },
    {
      name: "탐구관",
      title: "탐구관",
      subTitle: "Exploration hall",
      index: 10,
      top: 740.8,
      left: 657.5,
      width: 79,
      height: 26.9,
      btnStyle: {
        top: 6.4,
        left: 32.3
      },
      nameStyle: {
        top: 8.2,
        left: 4.5
      },
      mainInfo: ["교양강의실", "컴퓨터실"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "5F",
          info: [["강의실 1 ~ 7"]]
        },
        {
          floor: "4F",
          info: [["교강사휴게실", "강의실 1 ~ 7"]]
        },
        {
          floor: "3F",
          info: [["강의실 1 ~ 7"]]
        },
        {
          floor: "2F",
          info: [["실습실 1 ~ 3", "실습상담실", "조교실"], ["기자재실", "컴퓨터실습실"]]
        },
        {
          floor: "1F",
          info: [["강의실 1 ~ 6", "안내실"]]
        },
        {
          floor: "B1",
          info: [["강의실 1 ~ 3", "일반열람실", "휴게실", "매점"]]
        },
        {
          floor: "B2",
          info: [["기계실", "조정실", "전기실", "저수조", "다용도실"]]
        }
      ]
    },
    {
      name: "학군단",
      title: "학군단",
      subTitle: "ROTC",
      index: 11,
      top: 654.2,
      left: 697,
      width: 64.6,
      height: 73.9,
      btnStyle: {
        top: 30,
        left: 24.8
      },
      nameStyle: {
        top: 47.8,
        left: 20
      },
      mainInfo: ["학군단"],
      enabled: false,
      // detail 높은층부터
      detailEnable: false,
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    },
    {
      name: "연구관",
      title: "연구관",
      subTitle: "Research hall",
      index: 12,
      top: 455.4,
      left: 512.1,
      width: 124,
      height: 45.2,
      btnStyle: {
        top: 15.6,
        left: 55
      },
      nameStyle: {
        top: 31.6,
        left: 49.9
      },
      mainInfo: ["교수연구실", "상상큐브", "카페"],
      enabled: false,
      // detail 높은층부터
      detailEnable: false,
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    },
    {
      name: "지선관",
      title: "지선관",
      subTitle: "Virtue hall",
      index: 13,
      top: 395.4,
      left: 531.8,
      width: 101.6,
      height: 47.2,
      btnStyle: {
        top: 9.6,
        left: 42.3
      },
      nameStyle: {
        top: 13.6,
        left: 9.2
      },
      mainInfo: ["회화과", "서양화", "동양화"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "4F",
          info: [
            ["2학년 동양화 실기실", "회화과 교수연구실"],
            ["대학원 진채 실기실", "2학년 서양화 실기실"],
            ["한지 조형 실습실", "회화과 학생회실"]
          ]
        },
        {
          floor: "3F",
          info: [
            ["3학년 동양화 실기실", "회화과 교수연구실"],
            ["대학원 동양화 실기실", "1학년 동양화 실기실"],
            ["3학년 서양화 실기실", "회화과 학생회실"]
          ]
        },
        {
          floor: "2F",
          info: [
            ["4학년 동양화 실기실", "사진실", "사진 스튜디오"],
            ["회화과 교수연구실", "대학원 서양화 실기실"],
            ["4학년 서양화 실기실", "기자재실"]
          ]
        },
        {
          floor: "1F",
          info: [
            ["대학원 서양화 실기실", "1학년 서양화 실기실"],
            ["판화실", "단과대학 통합교학센터"],
            ["기초교양교육과정 체육 실습실"]
          ]
        }
      ]
    },
    {
      name: "공학관A",
      title: "공학관A",
      subTitle: "Engineering Bldg.A",
      index: 14,
      top: 353.4,
      left: 504.1,
      width: 121.3,
      height: 33,
      btnStyle: {
        top: 9.5,
        left: 50.9
      },
      nameStyle: {
        top: 11.6,
        left: 69.9
      },
      mainInfo: ["공과대학", "학과사무실", "강의실"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "HF",
          info: [["옥상정원"]]
        },
        {
          floor: "5F",
          info: [["정보통신공학과 및 정보시스템공학과 실습실"], ["산업경영공학과 연구실"]]
        },
        {
          floor: "4F",
          info: [["일반강의실", "기계시스템공학과 실습실"], ["멀티미디어공학과 실습실"]]
        },
        {
          floor: "3F",
          info: [["멀티미디어공학과 및 컴퓨터공학과 실습실"], ["정보통신공학과 실습실"]]
        },
        {
          floor: "2F",
          info: [["멀티미디어학과 실습실", "물리실험실"], ["공학교육개발센터"]]
        },
        {
          floor: "1F",
          info: [["컴퓨터공학과 실험실", "휴게실", "매점"], ["대학사료실", "농경생활사 전시관", "사이버강좌 운영실"]]
        }
      ]
    },
    {
      name: "상상빌리지",
      title: "상상빌리지",
      subTitle: "Imagination villege",
      index: 15,
      top: 244.9,
      left: 535.3,
      width: 46.7,
      height: 99,
      btnStyle: {
        top: 48.3,
        left: 15.6
      },
      nameStyle: {
        top: 68.1,
        left: 5.7
      },
      mainInfo: ["상상빌리지 기숙사"],
      enabled: false,
      // detail 높은층부터
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    },
    {
      name: "공학관B",
      title: "공학관B",
      subTitle: "Engineering Bldg.B",
      index: 16,
      top: 268.4,
      left: 598.7,
      width: 32.4,
      height: 67.7,
      btnStyle: {
        top: 30.5,
        left: 8.3
      },
      nameStyle: {
        top: 48.6,
        left: 2.3
      },
      mainInfo: ["공과대학", "학과사무실", "강의실"],
      enabled: false,
      // detail 높은층부터
      detailEnable: true,
      detail: [
        {
          floor: "HF",
          info: [["옥상정원"]]
        },
        {
          floor: "6F",
          info: [["산업경영공학과 및 기계시스템공학과 실습실"]]
        },
        {
          floor: "5F",
          info: [["기계시스템공학과 / 제어 인체공학 실험실"]]
        },
        {
          floor: "4F",
          info: [["산업경영공학과 실습실"]]
        },
        {
          floor: "3F",
          info: [["생산경영연구실 / 공장설계연구실 / 대학원"]]
        },
        {
          floor: "2F",
          info: [["정보통신공학과 실습실"]]
        },
        {
          floor: "1F",
          info: [["컴퓨터공학과 및 멀티미디어공학과 실습실"]]
        },
        {
          floor: "B1",
          info: [["학회실"]]
        }
      ]
    },
    {
      name: "",
      title: "정류장",
      subTitle: "Bus stop",
      index: 17,
      top: 483.5,
      left: 313,
      width: 14,
      height: 14,
      btnStyle: {
        top: 0,
        left: 0
      },
      nameStyle: {
        top: 0,
        left: 0
      },
      mainInfo: ["2번 마을버스 정류장"],
      enabled: false,
      // detail 높은층부터
      detailEnable: false,
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    },
    {
      name: "",
      title: "학교버스 정류장",
      subTitle: "School Bus stop",
      index: 18,
      top: 544.5,
      left: 303,
      width: 14,
      height: 14,
      btnStyle: {
        top: 0,
        left: 0
      },
      nameStyle: {
        top: 0,
        left: 0
      },
      mainInfo: ["학교버스정류장"],
      enabled: false,
      // detail 높은층부터
      detailEnable: false,
      detail: [
        {
          floor: "",
          info: [[""]]
        }
      ]
    }
  ]
};

const INIT_STATE = "map/INIT_STATE";
const ITEM_ENABLE = "map/ITEM_ENABLE";
const ITEM_DISABLE = "map/ITEM_DISABLE";
const ITEM_SEARCH = "map/ITEM_SEARCH";

export const initItem = createAction(INIT_STATE);
export const enableItem = createAction(ITEM_ENABLE);
export const disableItem = createAction(ITEM_DISABLE);
export const searchItem = createAction(ITEM_SEARCH);

export default handleActions(
  {
    [INIT_STATE]: (undefined, {}) => {},
    [ITEM_ENABLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.mapList.map(item => {
          if (payload === item.index) item.enabled = true;
          else item.enabled = false;
        });
      }),
    [ITEM_DISABLE]: (state, { payload }) =>
      produce(state, draft => {
        draft.mapList.map(item => {
          if (payload === item.index) item.enabled = false;
        });
      }),
    [ITEM_SEARCH]: (state, { payload }) =>
      produce(state, draft => {
        draft.mapList.map(item => {
          payload.map(index => {
            if (item.index === index) item.enabled = true;
          });
        });
      })
  },
  initState
);
