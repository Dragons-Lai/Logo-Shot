import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageStore } from "react-native";
import { Chip, ThemeProvider, Button } from "react-native-elements";
import { images, icons, COLORS, FONTS, SIZES } from "../../constant/";

export default function InspirationSearch() {
  const imageList = [images.random1, images.random2, images.random4, images.random5, images.random6, images.random7, images.random8, images.random9];
  const [checked1, setChecked1] = React.useState("outline");
  const [checked2, setChecked2] = React.useState("outline");
  const [checked3, setChecked3] = React.useState("outline");

  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count + 1) % imageList.length);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <View style={{ height: "20%", alignItems: "center", justifyContent: "flex-end", backgroundColor: COLORS.white }}>
        <Text style={{ ...FONTS.largeTitle }}>你適合哪個商標</Text>
      </View>
      <View style={{ height: "10%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: COLORS.white, padding: SIZES.padding / 2 }}>
        <Chip buttonStyle={{ width: 100 }} title="All" type={checked1} onPress={() => setChecked1(checked1 === "outline" ? "solid" : "outline")} />
        <Chip buttonStyle={{ width: 100 }} title="Geometries" type={checked2} onPress={() => setChecked2(checked2 === "outline" ? "solid" : "outline")} />
        <Chip buttonStyle={{ width: 100 }} title="Animals" type={checked3} onPress={() => setChecked3(checked3 === "outline" ? "solid" : "outline")} />
      </View>
      <View style={{ height: "35%", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
        <Image source={target === -1 ? imageList[count] : imageList[target]} style={{ resizeMode: "contain", width: "70%", height: "70%", borderColor: "black", borderWidth: 1 }}></Image>
        <Text>The {target === -1 ? count : target}th image</Text>
      </View>
      <View style={{ height: "5%", backgroundColor: COLORS.white }}>
        <Button
          buttonStyle={{ width: "30%" }}
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={async () => {
            if (target === -1) {
              setTarget(count);
            } else {
              setTarget(-1);
            }
          }}
          title={target === -1 ? "STOP" : "RESUME"}
        ></Button>
      </View>
      <View style={{ height: "25%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: COLORS.white }}>
        <Image source={images.lefthand} style={{ resizeMode: "contain", width: "70%", height: "70%" }}></Image>
        <Image source={images.righthand} style={{ resizeMode: "contain", width: "70%", height: "70%" }}></Image>
      </View>
      <View style={{ height: "5%", backgroundColor: COLORS.white }}>
        {/* <Button buttonStyle={{ width: "100%" }} style={{ alignItems: "center", justifyContent: "center" }} onPress={() => {}} title="DOWNLOAD"></Button> */}
      </View>
    </ThemeProvider>
  );
}
