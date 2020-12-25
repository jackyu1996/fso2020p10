import { useQuery } from "@apollo/react-hooks";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    if (loading || !data || !data.repository.reviews.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      query: GET_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  return {
    reviews: data ? data.repository.reviews : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
