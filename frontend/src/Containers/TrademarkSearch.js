import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { images, icons, COLORS, FONTS, SIZES } from "../../constant/";
import { Searchbar } from "react-native-paper";
import { ThemeProvider, CheckBox, Button, BottomSheet, ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SEND_IMAGE, GET_IMAGE2, Searching } from "../api";

const theme = {
  CheckBox: {
    checkedColor: "black",
    uncheckedColor: "black",
    containerStyle: { width: "45%" },
    size: 25,
    textStyle: {},
    titleProps: {},
  },
};

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });

  // console.log(result);

  if (!result.cancelled) {
    return { uri: result.uri };
  }
  return false;
};

const cameraImage = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });

  // console.log(result);

  if (!result.cancelled) {
    return { uri: result.uri };
  }
  return false;
};

export default function TrademarkSearch({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);

  const [ImageURL, setImageURL] = useState(images.cat);

  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "Take a photo",
      onPress: async () => {
        var photo = await cameraImage();
        if (photo) setImageURL(photo);
        setIsVisible(false);
      },
    },
    {
      title: "Select a photo",
      onPress: async () => {
        var photo = await pickImage();
        if (photo) setImageURL(photo);
        setIsVisible(false);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <View style={{ height: "25%", backgroundColor: "white" }}>
          {/* Text & Searchbar */}
          <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding / 6 }}>Trademark Text(s)</Text>
          <Searchbar placeholder="Search" onChangeText={(query) => setSearchQuery(query)} value={searchQuery} placeholder="Enter any text in your trademark" />
          {/* CheckBox */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <CheckBox checked={checked1} checkedTitle="人名" onIconPress={() => setChecked1(!checked1)} onPress={() => setChecked1(!checked1)} title="人名" />
            <CheckBox checked={checked2} checkedTitle="公司" onIconPress={() => setChecked2(!checked2)} onPress={() => setChecked2(!checked2)} title="公司" />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <CheckBox checked={checked3} checkedTitle="商標" onIconPress={() => setChecked3(!checked3)} onPress={() => setChecked3(!checked3)} title="商標" />
            <CheckBox checked={checked4} checkedTitle="商品" onIconPress={() => setChecked4(!checked4)} onPress={() => setChecked4(!checked4)} title="商品" />
          </View>
        </View>
        <View style={{ height: "15%", backgroundColor: COLORS.white }}>
          {/* Text & Button */}
          <Text style={{ ...FONTS.h3 }}>Search by Image</Text>
          <Text style={{ ...FONTS.h4 }}>jpg, jpeg, png, tiff & bmp</Text>
          <Button
            buttonStyle={{ width: 150 }}
            containerStyle={{ margin: 5 }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={() => setIsVisible(true)}
            title="Upload Image"
            titleProps={{}}
            titleStyle={{ marginHorizontal: 5 }}
          />
        </View>
        <View style={{ height: "35%", backgroundColor: COLORS.white }}>
          {/* Image */}
          <Image source={ImageURL} style={{ resizeMode: "contain", width: "100%", height: "100%" }} />
        </View>
        <View style={{ height: "15%", backgroundColor: COLORS.white }}></View>
        <View style={{ height: "10%", backgroundColor: COLORS.blue }}>
          <View style={{ flex: 1 }}>
            {/* Button */}
            <Button
              buttonStyle={{ width: "100%" }}
              style={{ alignItems: "center", justifyContent: "center" }}
              disabled={(images.cat !== ImageURL) | (searchQuery !== "") ? false : true}
              onPress={async () => {
                // await SEND_IMAGE(ImageURL);
                // var photos = await GET_IMAGE2();
                var photos = await Searching(ImageURL, searchQuery);
                navigation.push("SearchResults", { photos: photos });
              }}
              title="送出"
            ></Button>
          </View>
        </View>
        <BottomSheet isVisible={isVisible} containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}>
          {list.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
