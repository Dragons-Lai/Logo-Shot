import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomePage, HomePage2, SearchResults, ImageDetails } from "./src/Containers/";

const AppStack = createStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const permission1 = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const permission2 = await ImagePicker.requestCameraPermissionsAsync();
        if ((permission1.status !== "granted") | (permission2.status !== "granted")) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="HomePage2">
        <AppStack.Screen name="HomePage" component={HomePage} />
        <AppStack.Screen name="HomePage2" component={HomePage2} />
        <AppStack.Screen name="SearchResults" component={SearchResults} />
        <AppStack.Screen name="ImageDetails" component={ImageDetails} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
