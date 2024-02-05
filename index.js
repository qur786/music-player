/**
 * @format
 */

import { AppRegistry } from "react-native";
import TrackPlayer from "react-native-track-player";
import { name as appName } from "./app.json";
import App from "./src/App";
import { trackPlayerPlaybackService } from "./track-player-service";

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => trackPlayerPlaybackService);
