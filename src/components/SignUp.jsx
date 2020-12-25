import React from "react";
import { View } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username must be more than 1 letter long")
    .max(30, "Username cannot be more than 30 letters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be more than 5 letters long")
    .max(50, "Password cannot be more than 50 letters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords doesn't match")
    .required("Confirm Password is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ margin: theme.margins.standard }}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="username"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        testID="password"
      />
      <FormikTextInput
        name="confirmPassword"
        placeholder="Confirm Password"
        secureTextEntry={true}
        testID="password"
      />
      <Text style={theme.primaryButton} onPress={onSubmit} testID="submit">
        Sign Up
      </Text>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
