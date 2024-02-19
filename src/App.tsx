import { Home } from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Playlist } from "./screens/Playlist";
import type { PressableProps } from "react-native";
import React from "react";
import type { RootStackParamList } from "./routes";
import { Routes } from "./routes";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions, Pressable, Text } from "react-native";
import { MusicProvider, useMusicFiles } from "./components/MusicProvider";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const { height } = Dimensions.get("window");

function HeaderRefreshButton(): JSX.Element {
  const { requestRefetch } = useMusicFiles();

  const handleRefreshPress: PressableProps["onPress"] = () => {
    requestRefetch().catch(console.log);
  };
  return (
    <Pressable onPress={handleRefreshPress}>
      <Text>Reload</Text>
      {/* TODO: use icon */}
    </Pressable>
  );
}

export default function App(): JSX.Element {
  return (
    <MusicProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName={Routes.Playlist}
          screenOptions={{
            contentStyle: styles.main,
            headerSearchBarOptions: {},
            headerTitleAlign: "center",
          }}>
          <Screen name={Routes.Home} component={Home} />
          <Screen
            name={Routes.Playlist}
            component={Playlist}
            options={{
              headerRight: HeaderRefreshButton,
            }}
          />
        </Navigator>
      </NavigationContainer>
    </MusicProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    height,
  },
});
