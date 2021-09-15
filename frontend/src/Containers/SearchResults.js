import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar } from "react-native";

export default function SearchResults({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 10, marginLeft: 15 }}>10 result(s) found.</Text>
        <View style={styles.searchResults}>
          {route.params.photos.base64Images.map((values, idx) => (
            <View style={idx === 0 ? styles.searchResultsRow : { ...styles.searchResultsRow, borderTopWidth: 1 }} key={idx}>
              <View style={{ ...styles.searchResultsBox, borderRightWidth: 1 }}>
                <TouchableOpacity
                  style={styles.searchResultsButton}
                  onPress={() => {
                    navigation.push("ImageDetails", { metadatas: route.params.photos.metadatas[idx][0] });
                  }}
                >
                  <Image source={{ uri: values[0] }} style={styles.searchResultsImage} />
                  <Text style={styles.searchResultsText}>{route.params.photos.metadatas[idx][0].caseno}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.searchResultsBox}>
                <TouchableOpacity
                  style={styles.searchResultsButton}
                  onPress={() => {
                    navigation.push("ImageDetails", { metadatas: route.params.photos.metadatas[idx][1] });
                  }}
                >
                  <Image source={{ uri: values[1] }} style={styles.searchResultsImage} />
                  <Text style={styles.searchResultsText}>{route.params.photos.metadatas[idx][1].caseno}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "yellow",
  },
  searchResults: {
    borderWidth: 1,
    backgroundColor: "orange",
  },
  searchResultsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchResultsBox: {
    flex: 1,
    padding: 20,
  },
  searchResultsButton: {
    alignItems: "center",
  },
  searchResultsImage: {
    width: 150,
    height: 100,
  },
  searchResultsText: {
    marginTop: 10,
    color: "#808080",
    fontSize: 16,
  },
});
