/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { YellowBox } from "react-native";
import Root from "./src/Root";

YellowBox.ignoreWarnings(["Warning: ViewPagerAndroid"]);
AppRegistry.registerComponent(appName, () => Root);
