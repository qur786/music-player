import { Home } from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar } from "react-native";

const Routes = {
  Home: "home",
} as const;

const { Navigator, Screen } = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <NavigationContainer>
        <Navigator initialRouteName={Routes.Home}>
          <Screen name={Routes.Home} component={Home} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
