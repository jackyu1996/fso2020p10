import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

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

const SearchKeyword = ({ setKeyword }) => {
  const [input, setInput] = useState("");
  const [keyword] = useDebounce(input, 500);

  useEffect(() => {
    setKeyword(keyword);
  }, [keyword]);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={(value) => setInput(value)}
      value={input} />
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const items = [
      { label: "Latest repositories", value: "latest" },
      { label: "Highest rated repositories", value: "voteDesc" },
      { label: "Lowest rated repositories", value: "voteAsc" },
    ];

    return (
      <>
        <SearchKeyword setKeyword={this.props.setKeyword} />
        <OrderBySelect items={items} setOrder={this.props.setOrder} />
      </>
    );
  };

  render() {
    this.repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={this.repositoryNodes}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [keyword, setKeyword] = useState("");

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

  const { repositories } = useRepositories(orderBy, orderDirection, keyword);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrder={setOrder}
      setKeyword={setKeyword}
    />
  );
};

export default RepositoryList;
