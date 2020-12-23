import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading };
};

export default useRepositories;
