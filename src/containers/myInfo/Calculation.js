import React, {useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, BackHandler } from 'react-native';
import { connect } from "react-redux";
import navigators from '../../utils/navigators';
import { widthPercentageToDP } from '../../utils/util.js';
import { Title } from '../../components/common/View.js';
import { LineView, GradeLineView, CaltopView, CalbottomView, CalresultView, Radio_Selected, Radio_Out_Un} from "../../components/myInfo/View";
import { NameTI, ScoreTI } from "../../components/myInfo/TextInput";
import { ModalText, GradeText } from "../../components/myInfo/Text";
import { MenuTriggerBtn } from "../../components/myInfo/Button";
import { CustomModal } from "../../components/common/Modal";

const data = {
  grade:["A+","A","B+","B","C+","C","D+","D","F","P/N"],
  score:[4.5,4.0,3.5,3.0,2.5,2.0,1.5,1.0,0.0,null]
}

const Calculation = props => {
  const [classData, setClassData] = useState([{name:"",score:"",grade:"선택"}]); //시간표데이터
  const [scoreSet, setScoreSet] = useState([]); //성적데이터 저장
  const [scoreHidden, setScoreHidden] = useState(false); // 성적 계산시 결과보여주는거
  const [noticeModal, setNModal] = useState(false); // 알림 모달
  const [selectorModal, setSModal] = useState({ bool: false, index: 0}); //성적 선택 모달
  const SubjectArray=[];

  //백핸들러 설정/해제
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigateBack();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  //홈화면에서 접근하는지 성적페이지에서 접근하는지 구분
  const navigateBack = () => {
    if(props.navigation.state.params.from=="grade"){
      navigators.navigate("Grade");
    } else navigators.navigate("home");
  }

  //초기화 버튼 리스너
  const resetSchedule = () => {
    setScoreHidden(false);
    setClassData([{name:"",score:"",grade:"선택"}]);
  }

  //시간표 불러오기 버튼 리스너
  const listsSchedule = async () => {
    setScoreHidden(false);
    const schedule = props.hansunginfo.schedule;

    for(let i in schedule) {
      for(let j in schedule[i]){
        const subjectName = schedule[i][j].content.substring(0,schedule[i][j].content.indexOf('(',0));
        if(SubjectArray.indexOf(subjectName) == -1){
          SubjectArray.push(subjectName);
        }
      }
    }

    if(SubjectArray.length>0){ //시간표 항목이 있으면 
      const object = [];
      SubjectArray.map( item=>object.push({name:item, score:"", grade:"선택"}) );
      setClassData([]);
      setClassData(object);
    } else { //시간표 항목이 없으면 
      setNModal(true);
    } 
  }

  //계산하기 버튼 리스너
  const calculationGrade = async () => {
    let totalScore=0.0; // 평점 총계
    let addScore=0.0; // 취득 학점
 
    classData.map(item=>{
      if(item.grade!==null||item.grade!==""){
        totalScore += item.score*item.grade;
        addScore+=item.score*1;
      }
    })
    
    const averScore = (totalScore/addScore).toFixed(2);

    setScoreSet({totalScore: totalScore, addScore: addScore, averScore: averScore})
  } 

  //과목이름 학점 성적 적는 곳
  const BoxComponent = props => {
    const [name, setName] = useState(props.name);
    const [score, setScore] = useState(props.score);
    return ( 
      <View style={{flexDirection: 'row', marginTop: widthPercentageToDP(7)}}>
        <NameTI
          underlineColorAndroid="transparent"
          value={name}
          onChangeText={text=>{
            let temp = classData;
            temp[props.index].name=text;
            setClassData(temp);
            setName(text);
          }}
          placeholder={"과목 이름"}
          placeholderTextColor={"#dbdbdb"}
          maxLength={20}
          numberOfLines={1}
        />
        <ScoreTI
          underlineColorAndroid="transparent"
          value={score}
          onChangeText={text=> {
            let temp = classData;
            temp[props.index].score=text;
            setClassData(temp);
            setScore(text);
          }}
          placeholder={"0"}
          placeholderTextColor={"#dbdbdb"}
          maxLength={1}
          numberOfLines={1}
        />
        <MenuTriggerBtn 
          handler={()=>{
            setSModal({bool:true, index:props.index});
          }}
          text={data.score.indexOf(classData[props.index].grade)!=-1? data.grade[data.score.indexOf(classData[props.index].grade)]:"선택"}
        />
      </View>
    )
  }

  const renderBoxComponents = () => {
    return classData.map((item, index)=>{
      return <BoxComponent index={index} name={item.name} score={item.score} grade={item.grade}/>
    })
  }
  
  const renderCalresult = () => {
    return scoreHidden?
    <CalresultView addScore={scoreSet.addScore} averScore={scoreSet.averScore}/>:null
  }

  //성적 선택 모달 내용
  const GradeList = () => {
    const index = data.score.indexOf(classData[selectorModal.index].grade)!=-1? data.score.indexOf(classData[selectorModal.index].grade):null;
    const [selected, setSelected] = useState(index);
    return (
      <View style={{ 
        width: widthPercentageToDP(319), 
        paddingHorizontal: widthPercentageToDP(28),
        marginBottom: widthPercentageToDP(20)
      }}>
        {data.grade.map((item,index)=> {
          return(
            <View>
              <TouchableOpacity style={{flexDirection:"row", alignItems: "center"}}
                onPress={()=>{
                  setSelected(index);
                  let temp = classData;
                  temp[selectorModal.index].grade = data.score[index];
                  setClassData(temp);
                  setSModal({bool:false, index:0});
                }}
              >
                <GradeText>{item}</GradeText>
                {selected==index? <Radio_Selected/>:<Radio_Out_Un/>} 
              </TouchableOpacity>
              {data.grade.length!==index+1?
                <GradeLineView/>:null
              }
            </View>
          )
        })}
      </View>
    )
  }

  return(
    <SafeAreaView style={{flex:1}}>
      <CustomModal
        children={
          <ModalText kind={props.hansunginfo.status!==undefined? 0:1}/>
        }
        visible={noticeModal}
        footerHandler={ async () => {
          await setNModal(false);
        }}
        closeHandler={()=>setNModal(false)}
      />

      <CustomModal
        width={319}
        height={541}
        children={<GradeList/>}
        visible={selectorModal.bool}
        renderFooter={()=> {return <View/>}}
        closeHandler={()=>setSModal({bool: false, index: 0})}
      />

      <Title title="현 학기 성적계산" leftHandler={()=>navigators.navigate("Grade")} rightInVisible={true}/>
      <LineView/>
      <ScrollView style={{backgroundColor:"#f8f8f8", width: widthPercentageToDP(375)}}>
        <CaltopView reset={()=> resetSchedule()} lists={()=>listsSchedule()}/>
        <LineView/>
        <CalbottomView 
          renderCalresult={renderCalresult}
          renderBoxComponents={renderBoxComponents}
          add={()=>{
            if(classData.length<10) setClassData([...classData, {name:"",score:"", grade:"선택"}]);
          }}
          calculate={()=>{
            calculationGrade();
            setScoreHidden(true);
        }}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default connect((state)=>({
  hansunginfo: state.hansung.hansunginfo
}))(Calculation);