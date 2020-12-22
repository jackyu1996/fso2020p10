import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: theme.colors.cardBackground,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories})=>{
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            keyExtractor={(item) => item.fullName}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={RepositoryItem}
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    return <RepositoryListContainer
        repositories={repositories} />;
};

export default RepositoryList;
