import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./src/Containers/HomePage";
import SearchResults from "./src/Containers/SearchResults";
import ImageDetails from "./src/Containers/ImageDetails";

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
      <AppStack.Navigator initialRouteName="HomePage">
        <AppStack.Screen name="HomePage" component={Homepage} />
        <AppStack.Screen name="SearchResults" component={SearchResults} />
        <AppStack.Screen name="ImageDetails" component={ImageDetails} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
