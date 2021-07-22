global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";

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

export async function SEND_IMAGE(img) {
  return;
}
