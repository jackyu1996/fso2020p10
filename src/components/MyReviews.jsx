import React from "react";
import { FlatList, View, Text, Alert } from "react-native";
import { useHistory } from "react-router-native";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ReviewItem } from "./SingleRepository";
import { ItemSeparator } from "./RepositoryList";
import { GET_AUTHORIZED_UESR } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";

const ReviewActions = ({ review, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  let history = useHistory();

  const deleteDialog = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => {},
        },
        {
          text: "DELETE",
          onPress: () => {
            deleteReview({ variables: { id: review.id } });
            refetch();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Text
        style={theme.primaryButton}
        onPress={() => history.push(`/repo/${review.repositoryId}`)}
      >
        View repository
      </Text>
      <Text style={theme.errorButton} onPress={deleteDialog}>
        Delete review
      </Text>
    </View>
  );
};

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_UESR, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (!data || !data.authorizedUser) return null;

  const reviewNodes = data.authorizedUser.reviews.edges.map(
    (edge) => edge.node
  );

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <ReviewActions review={item} refetch={refetch} />
        </>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
