import { useMutation } from "@apollo/react-hooks";

import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    return result;
  };

  return [signUp, result];
};

export default useSignUp;
