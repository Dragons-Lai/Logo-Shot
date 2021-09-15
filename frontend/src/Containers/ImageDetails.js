import React from "react";
import { View, Text } from "react-native";

export default function ImageDetails({ route }) {
  return (
    <View>
      <Text>{route.params.metadatas.caseno}</Text>
      <Text>{route.params.metadatas.trademark_name}</Text>
      <Text>{route.params.metadatas.sdate}</Text>
      <Text>{route.params.metadatas.edate}</Text>
      <Text>{route.params.metadatas.bchinese}</Text>
      <Text>{route.params.metadatas.class_}</Text>
      <Text>{route.params.metadatas.achinese}</Text>
      <Text>{route.params.metadatas.aenglish}</Text>
      <Text>{route.params.metadatas.address}</Text>
    </View>
  );
}
