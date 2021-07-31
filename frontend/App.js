import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Button, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
import { GET_TEXT, GET_IMAGE, SEND_IMAGE } from "./api";
// const GET_TEXT = () => {
//   fetch("http://localhost:5000/function1", {
//     method: "GET",
//   })
//   .then(resp => resp.json())
//   .then(data => console.log(data))
// }

// const GET_IMAGE = () => {
//   fetch("http://localhost:5000/", {
//     method: "GET",
//   })
//   .then(resp => resp.blob())
//   .then(image => {
//     var outside = URL.createObjectURL(image);
//     console.log(outside)
//   })
// }

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

// const uploadImage = async (ImageURL) => {
//   // Check if any file is selected or not
//   if (ImageURL != null) {
//     // If file selected then create FormData
//     const fileToUpload = ImageURL;
//     const data = new FormData();
//     data.append("name", "Image Upload");
//     // console.log("fileToUpload.uri: ", fileToUpload.uri);
//     const base64 = await FileSystem.readAsStringAsync(fileToUpload.uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     data.append("file_attachment", base64);
//     // Please change file upload URL
//     let res = await fetch("http://140.112.106.88:8081/function3", {
//       method: "post",
//       body: data,
//       headers: {
//         "Content-Type": "multipart/form-data; ",
//       },
//     });
//     let responseJson = await res.json();
//     if (responseJson.status == 1) {
//       alert("Upload Successful");
//     }
//   } else {
//     // If no file selected the show alert
//     alert("Please Select File first");
//   }
// };

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
          var photo = await GET_IMAGE();
          setImageURL(photo);
        }}
      ></Button>
      <Button
        title="read local file"
        onPress={() => setImageURL(require("./dog.jpg"))}
      ></Button>
      <Button
        title="read device file"
        onPress={async () => {
          var photo = await pickImage();
          if (photo) setImageURL(photo);
          // console.log(ImageURL);
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
