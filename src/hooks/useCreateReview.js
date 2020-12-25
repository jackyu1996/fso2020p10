import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import AuthStorageContext from "../contexts/AuthStoragetContext";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const authStorage = useContext(AuthStorageContext);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    if (await authStorage.getAccessToken()) {
      const result = await mutate({
        variables: { repositoryName, ownerName, rating, text },
      });

      return result;
    }
  };

  return [createReview, result];
};

export default useCreateReview;
