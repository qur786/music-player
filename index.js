/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./src/App";
import TrackPlayer from "react-native-track-player";
import { trackPlayerPlaybackService } from "./track-player-service";

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => trackPlayerPlaybackService());
