import React from "react";
import { View, Image, StyleSheet } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    margin: 15,
    borderRadius: 5,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: "white",
    alignSelf: "flex-start",
    padding: 5,
  },
  horizontalFlexContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  justifyAround: {
    justifyContent: "space-evenly",
  },
  centerAlign: {
    alignItems: "center",
  },
});

const approximateNum = (num) => {
  return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.verticalFlexContainer}>
      <View style={styles.horizontalFlexContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={{ flex: 1 }}>
          <Text testID="fullName" fontWeight="bold">{item.fullName}</Text>
          <Text testID="description">{item.description}</Text>
          <Text testID="language" style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
      <View style={[styles.horizontalFlexContainer, styles.justifyAround]}>
        <View style={[styles.centerAlign]}>
          <Text testID="stargazersCount" fontWeight="bold">{approximateNum(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={[styles.centerAlign]}>
          <Text testID="forksCount" fontWeight="bold">{approximateNum(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={[styles.centerAlign]}>
          <Text testID="reviewCount" fontWeight="bold">{approximateNum(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={[styles.centerAlign]}>
          <Text testID="ratingAverage" fontWeight="bold">{approximateNum(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
