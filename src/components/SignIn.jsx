import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: theme.colors.primary,
        textAlign: "center",
        textAlignVertical: "center",
        color: "white",
        lineHeight: 40,
        borderRadius: 5,
    },
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={{ margin: 20 }}>
            <FormikTextInput
                name="username"
                placeholder="Username"
                testID="username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry={true}
                testID="password"
            />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.signInButton} testID="submit">Sign In</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const SignInContainer = ({onSubmit}) =>{
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInContainer onSubmit={onSubmit} />
};

export default SignIn;
