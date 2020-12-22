import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import { GET_REPO, GET_REVIEWS } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";

const styles = StyleSheet.create({
  rating: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    color: theme.colors.primary,
    marginRight: 20,
    textAlign: "center",
    paddingVertical: 8,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} />
      <Text
        style={[theme.button, { margin: 20 }]}
        onPress={() => Linking.openURL(repository.url)}
      >
        Open in Github
      </Text>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const approximateDate = (date) => format(new Date(date), "dd.MM.yyyy");

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ fontWeight: theme.fontWeights.bold }}>
          {review.user.username}
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
  });
  const { data: reviewData } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  if (!id || !repoData || !reviewData) {
    return null;
  }

  const repository = repoData.repository;
  const reviews = reviewData.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
