import React from "react";
import { View, Image } from "react-native";
import { Table, Row } from "react-native-table-component";
import { images, icons, COLORS, FONTS, SIZES } from "../../constant/";

export default function ImageDetails({ route }) {
  return (
    <View>
      <View style={{ height: "40%", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
        <Image source={{ uri: route.params.uri }} style={{ resizeMode: "cover", width: "75%", height: "90%" }} />
      </View>
      <View style={{ height: "60%", backgroundColor: COLORS.white }}>
        <Table style={{ backgroundColor: COLORS.white }} borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}>
          <Row flexArr={[1, 2]} data={["caseno", route.params.metadatas.caseno]} />
          <Row flexArr={[1, 2]} data={["trademark_name", route.params.metadatas.trademark_name]} />
          <Row flexArr={[1, 2]} data={["sdate", route.params.metadatas.sdate]} />
          <Row flexArr={[1, 2]} data={["edate", route.params.metadatas.edate]} />
          <Row flexArr={[1, 2]} data={["bchinese", route.params.metadatas.bchinese]} />
          <Row flexArr={[1, 2]} data={["class", route.params.metadatas.class_]} />
          <Row flexArr={[1, 2]} data={["achinese", route.params.metadatas.achinese]} />
          <Row flexArr={[1, 2]} data={["aenglish", route.params.metadatas.aenglish]} />
          <Row flexArr={[1, 2]} data={["address", route.params.metadatas.address]} />
        </Table>
      </View>
    </View>
  );
}
