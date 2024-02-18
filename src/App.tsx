import { Dimensions } from "react-native";
import { Home } from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Playlist } from "./screens/Playlist";
import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Routes = {
  Home: "home",
  Playlist: "playlist",
} as const;

const { Navigator, Screen } = createNativeStackNavigator();

const { height } = Dimensions.get("window");

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={Routes.Home}
        screenOptions={{
          headerShown: false,
          contentStyle: styles.main,
        }}>
        <Screen name={Routes.Home} component={Home} />
        <Screen name={Routes.Playlist} component={Playlist} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    height,
  },
});
