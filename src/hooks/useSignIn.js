import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/client";

import AuthStorageContext from "../contexts/AuthStoragetContext";

import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(result.data.authorize.accessToken);
    apolloClient.resetStore();
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
