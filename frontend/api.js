global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";
import * as FileSystem from "expo-file-system";

export async function GET_TEXT() {
  axios
    .get("/function1")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

export async function GET_IMAGE(CaseNo) {
  const photo = await axios
    .get("/function2", {
      params: {
        caseno: CaseNo,
      },
      responseType: "arraybuffer",
    })
    .then((res) => {
      metadata = {
        trademark_name: decodeURI(res.headers.trademark_name),
        sdate: res.headers.sdate,
        edate: res.headers.edate,
        bchinese: decodeURI(res.headers.bchinese),
        class_: res.headers.class_,
        achinese: decodeURI(res.headers.achinese),
        aenglish: res.headers.aenglish,
        address: decodeURI(res.headers.address),
      };
      // console.log("metadata:", metadata);
      return {
        base64Image: Buffer.from(res.data, "binary").toString("base64"),
        metadata: metadata,
      };
    })
    .then((x) => {
      x.uri = `data:image/jpeg;base64,${x.base64Image}`;
      return x;
    });
  return photo;
}

export async function SEND_IMAGE(ImageURL) {
  // Check if any file is selected or not
  if (ImageURL != null) {
    // If file selected then create FormData
    const data = new FormData();
    data.append("name", Date.now());
    // console.log("ImageURL.uri: ", ImageURL.uri);
    const base64 = await FileSystem.readAsStringAsync(ImageURL.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
    // Please change file upload URL

    let res = await axios.post("/function3", data, {
      headers: { "Content-Type": "multipart/form-data; " },
    });
    // console.log(res.data);
    if (res.data.status == 1) {
      alert("Upload Successful");
    }
  } else {
    // If no file selected the show alert
    alert("Please Select File first");
  }

  return;
}
