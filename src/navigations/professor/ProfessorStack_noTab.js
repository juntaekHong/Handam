import { createMaterialTopTabNavigator } from "react-navigation";
import React from "react";
import ProfessorEvaluation1 from "../../containers/professor/ProfessorEvaluation1";
import ProfessorEvaluation2 from "../../containers/professor/ProfessorEvaluation2";
import ProfessorEvaluation3 from "../../containers/professor/ProfessorEvaluation3";
import ProfessorEvaluation4 from "../../containers/professor/ProfessorEvaluation4";
import ProfessorEvaluation5 from "../../containers/professor/ProfessorEvaluation5";
import ProfessorEvaluation6 from "../../containers/professor/ProfessorEvaluation6";
import ProfessorEvaluation7 from "../../containers/professor/ProfessorEvaluation7";
import { NavigationTopView } from "../../components/professor/NavigationTopView";

const ProfessorStack_noTab = createMaterialTopTabNavigator(
  {
    ProfessorEvaluation1: { screen: ProfessorEvaluation1 },
    ProfessorEvaluation2: { screen: ProfessorEvaluation2 },
    ProfessorEvaluation3: { screen: ProfessorEvaluation3 },
    ProfessorEvaluation4: { screen: ProfessorEvaluation4 },
    ProfessorEvaluation5: { screen: ProfessorEvaluation5 },
    ProfessorEvaluation6: { screen: ProfessorEvaluation6 },
    ProfessorEvaluation7: { screen: ProfessorEvaluation7 }
  },
  {
    initialRouteName: null,
    backBehavior: "order",
    tabBarPosition: "top",
    swipeEnabled: false,
    lazy: true,
    tabBarComponent: props => <NavigationTopView {...props} />
  }
);

export default ProfessorStack_noTab;
