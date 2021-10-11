import React from "react";
import { View } from "react-native";
import { Table, Row } from "react-native-table-component";

export default function ImageDetails({ route }) {
  return (
    <View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
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
  );
}
