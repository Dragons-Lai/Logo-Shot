global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";
import * as FileSystem from "expo-file-system";

export async function GET_TEXT() {
  axios
    .get("/function1")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

export async function GET_IMAGE() {
  const base64Image = await axios
    .get("/function2", { responseType: "arraybuffer" })
    .then((response) => {
      return Buffer.from(response.data, "binary").toString("base64");
    });
  var photo = { uri: `data:image/jpeg;base64,${base64Image}` };
  return photo;
}

export async function SEND_IMAGE(ImageURL) {
  // Check if any file is selected or not
  if (ImageURL != null) {
    // If file selected then create FormData
    const fileToUpload = ImageURL;
    const data = new FormData();
    data.append("name", "Image Upload");
    // console.log("fileToUpload.uri: ", fileToUpload.uri);
    const base64 = await FileSystem.readAsStringAsync(fileToUpload.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
    // Please change file upload URL

    let res = await axios.post("/function3", data, {
      headers: { "Content-Type": "multipart/form-data; " },
    });
    // console.log(res.data);
    // let responseJson = await res.json();
    if (res.data.status == 1) {
      alert("Upload Successful");
    }
  } else {
    // If no file selected the show alert
    alert("Please Select File first");
  }

  return;
}
