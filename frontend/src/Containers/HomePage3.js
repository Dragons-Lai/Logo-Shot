import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS, FONTS, SIZES } from "../../constant/";
import { useFonts } from "expo-font";
import { GET_IMAGE3 } from "../api";

export default function HomePage3({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ height: "17%", backgroundColor: COLORS.white }}></View>
      <View style={{ height: "8%", backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: COLORS.secondary, ...FONTS.largeTitle }}>LOGO SHOT</Text>
      </View>
      <View style={{ height: "40%", backgroundColor: COLORS.white }}></View>
      <View style={{ flexDirection: "row", height: "25%", backgroundColor: COLORS.white }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white, borderRadius: 100, marginHorizontal: SIZES.base * 2 }}
          disabled={isLoading}
          onPress={async () => {
            setIsLoading(true);
            navigation.push("TrademarkSearch");
            setIsLoading(false);
          }}
        >
          <Text style={{ ...FONTS.h4 }}>找商標</Text>
          <Image source={icons.camera} resizeMode="contain" style={{ width: "60%", height: "60%" }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white, borderRadius: 100, marginHorizontal: SIZES.base * 2 }}
          disabled={isLoading}
          onPress={async () => {
            setIsLoading(true);
            let startTime = new Date();
            var base64Images = await GET_IMAGE3();
            let endTime = new Date();
            console.log((endTime - startTime) / 1000 + " seconds");
            navigation.push("InspirationSearch", { base64Images: base64Images });
            setIsLoading(false);
          }}
        >
          <Text style={{ ...FONTS.h4 }}>找靈感</Text>
          <Image source={icons.idea} resizeMode="contain" style={{ width: "60%", height: "60%" }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: "10%", backgroundColor: COLORS.white }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
