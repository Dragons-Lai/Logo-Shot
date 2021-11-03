global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";
import * as FileSystem from "expo-file-system";
import { images, icons, COLORS, FONTS, SIZES } from "../constant/";

// export async function GET_TEXT() {
//   axios
//     .get("/function1")
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
// }

// export async function GET_IMAGE(CaseNo) {
//   const photo = await axios
//     .get("/function2", {
//       params: {
//         caseno: CaseNo,
//       },
//       responseType: "arraybuffer",
//     })
//     .then((res) => {
//       metadata = {
//         trademark_name: decodeURI(res.headers.trademark_name),
//         sdate: res.headers.sdate,
//         edate: res.headers.edate,
//         bchinese: decodeURI(res.headers.bchinese),
//         class_: res.headers.class_,
//         achinese: decodeURI(res.headers.achinese),
//         aenglish: res.headers.aenglish,
//         address: decodeURI(res.headers.address),
//       };
//       // console.log("metadata:", metadata);
//       return {
//         base64Image: Buffer.from(res.data, "binary").toString("base64"),
//         metadata: metadata,
//       };
//     })
//     .then((x) => {
//       x.uri = `data:image/jpeg;base64,${x.base64Image}`;
//       return x;
//     });
//   return photo;
// }

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

export async function GET_IMAGE2() {
  return await axios
    .get("/function4", {
      responseType: "json",
    })
    .then((res) => {
      // console.log(res.data.images[0]);
      // console.log(res.data.images[1]);
      // console.log(res.data.metadatas[0]);
      // console.log(res.data.metadatas[1]);
      const metadatas = res.data.metadatas;
      const base64Images = res.data.base64Images.map((base64Image) => `data:image/jpeg;base64,${base64Image}`);
      let photos = {
        metadatas: [],
        base64Images: [],
      };
      var steps = metadatas.length / 2;
      for (var i = 0; i < steps; i++) {
        photos.metadatas.push([metadatas[2 * i], metadatas[2 * i + 1]]);
        photos.base64Images.push([base64Images[2 * i], base64Images[2 * i + 1]]);
      }
      // console.log(photos.metadatas);
      return photos;
    });
}

export async function Searching(ImageURL, searchQuery) {
  const data = new FormData();
  data.append("name", Date.now());

  if (ImageURL !== images.cat) {
    const base64 = await FileSystem.readAsStringAsync(ImageURL.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
  } else {
    data.append("file_attachment", null);
  }
  data.append("searchQuery", searchQuery);

  return await axios
    .post("/function5", data, {
      headers: { "Content-Type": "multipart/form-data; " },
      responseType: "json",
    })
    .then((res) => {
      const metadatas = res.data.metadatas;
      const base64Images = res.data.base64Images.map((base64Image) => `data:image/jpeg;base64,${base64Image}`);
      let photos = {
        metadatas: [],
        base64Images: [],
      };
      var steps = metadatas.length / 2;
      for (var i = 0; i < steps; i++) {
        photos.metadatas.push([metadatas[2 * i], metadatas[2 * i + 1]]);
        photos.base64Images.push([base64Images[2 * i], base64Images[2 * i + 1]]);
      }
      // console.log(photos.metadatas);
      return photos;
    });
}

export async function GET_IMAGE3() {
  return await axios
    .get("/function6", {
      responseType: "json",
    })
    .then((res) => {
      const base64Images = res.data.base64Images.map((base64Image) => `data:image/jpeg;base64,${base64Image}`);
      return base64Images;
    });
}
