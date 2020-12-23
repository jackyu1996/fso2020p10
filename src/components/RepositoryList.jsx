import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.cardBackground,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const OrderBySelect = ({ items, setOrder }) => {
  return (
    <RNPickerSelect
      placeholder={{}}
      onValueChange={(value) => setOrder(value)}
      items={items} />
  );
};

export const RepositoryListContainer = ({ repositories, setOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const items = [
    { label: "Latest repositories", value: "latest" },
    { label: "Highest rated repositories", value: "voteDesc" },
    { label: "Lowest rated repositories", value: "voteAsc" },
  ];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={() => (
        <OrderBySelect items={items} setOrder={setOrder} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");

  let orderBy, orderDirection;
  switch (order) {
    case "latest":
      orderBy = "CREATED_AT";
      orderDirection = "DESC";
      break;
    case "voteDesc":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "voteAsc":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
  }

  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer repositories={repositories} setOrder={setOrder} />
  );
};

export default RepositoryList;
