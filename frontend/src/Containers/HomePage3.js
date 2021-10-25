import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons, COLORS, FONTS, SIZES } from "../../constant/";
import { useFonts } from "expo-font";

export default function HomePage3({ navigation }) {
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
      <View style={{ height: "7%", backgroundColor: COLORS.white }}></View>
      <View style={{ height: "10%", backgroundColor: COLORS.white }}></View>
      <View style={{ height: "8%", backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: COLORS.secondary, ...FONTS.largeTitle }}>LOGO SHOT</Text>
      </View>
      <View style={{ height: "10%", backgroundColor: COLORS.white }}></View>
      <View style={{ height: "10%", backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: COLORS.secondary, ...FONTS.h1 }}>商標檢索</Text>
      </View>
      <View style={{ height: "20%", backgroundColor: COLORS.white }}></View>
      <View style={{ flexDirection: "row", height: "25%", backgroundColor: COLORS.white }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white, borderRadius: 100, marginHorizontal: SIZES.base * 2 }}
          onPress={async () => {
            navigation.push("TrademarkSearch");
          }}
        >
          <Text>找商標</Text>
          <Image source={icons.camera} resizeMode="contain" style={{ width: "60%", height: "60%" }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white, borderRadius: 100, marginHorizontal: SIZES.base * 2 }}
          onPress={() => {
            navigation.push("InspirationSearch");
          }}
        >
          <Text>找靈感</Text>
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
