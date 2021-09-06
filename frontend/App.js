import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Button, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GET_TEXT, GET_IMAGE, SEND_IMAGE, GET_IMAGE2 } from "./api";

// ImagePicker: https://docs.expo.io/versions/latest/sdk/imagepicker/
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
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
    quality: 1,
  });

  // console.log(result);

  if (!result.cancelled) {
    return { uri: result.uri };
  }
  return false;
};

export default function App() {
  const [ImageURL, setImageURL] = useState(require("./cat.jpg"));
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const permission1 =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const permission2 = await ImagePicker.requestCameraPermissionsAsync();
        if (
          (permission1.status !== "granted") |
          (permission2.status !== "granted")
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Button title="receive remote text" onPress={() => GET_TEXT()}></Button>
      <Button
        title="receive remote file"
        onPress={async () => {
          var photo = await GET_IMAGE("104029750");
          // console.log(photo.metadata);
          setImageURL({ uri: photo.uri });
        }}
      ></Button>
      {/* <Button
        title="read local file"
        onPress={() => setImageURL(require("./dog.jpg"))}
      ></Button> */}
      <Button
        title="read device file"
        onPress={async () => {
          var photo = await pickImage();
          if (photo) setImageURL(photo);
        }}
      ></Button>
      <Button
        title="create device file"
        onPress={async () => {
          var photo = await cameraImage();
          if (photo) setImageURL(photo);
        }}
      ></Button>
      <Button
        title="send device file"
        onPress={async () => {
          await SEND_IMAGE(ImageURL);
        }}
      ></Button>
      <Button
        title="GET_IMAGE2"
        onPress={async () => {
          // await GET_IMAGE2();
          var photo = await GET_IMAGE2();
          // console.log({ uri: photo });
          setImageURL({ uri: photo });
        }}
      ></Button>
      <Image source={ImageURL} style={{ width: 400, height: 200 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
