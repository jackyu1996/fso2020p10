import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import { GET_REPO } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import useReviews from "../hooks/useReviews";

export const styles = StyleSheet.create({
  rating: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    color: theme.colors.primary,
    margin: 10,
    textAlign: "center",
    paddingVertical: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ margin: theme.margins.standard }}>
      <RepositoryItem item={repository} />
      <Text
        style={theme.primaryButton}
        onPress={() => Linking.openURL(repository.url)}
      >
        Open in Github
      </Text>
    </View>
  );
};

export const ReviewItem = ({ review }) => {
  const approximateDate = (date) => format(new Date(date), "dd.MM.yyyy");

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ fontWeight: theme.fontWeights.bold }}>
          {(review.user && review.user.username) ||
            (review.repository && review.repository.fullName)}
        </Text>
        <Text style={{ color: theme.colors.textSecondary }}>
          {approximateDate(review.createdAt)}
        </Text>
        <Text style={{}}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { data: repoData } = useQuery(GET_REPO, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const { reviews, fetchMore } = useReviews({ id, first: 5 });

  if (!id || !repoData || !reviews) return null;

  const reviewsNodes = reviews.edges.map((edge) => edge.node);

  const onEndReach = () => fetchMore();

  return (
    <FlatList
      data={reviewsNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repoData.repository} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default SingleRepository;
