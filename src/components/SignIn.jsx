import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .required("Username is required"),
    password: yup
    .string()
    .required("Password is required"),

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

const SignInForm = ({onSubmit}) => {
    return (
        <View style={{margin: 20}}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.signInButton}>Sign In</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = (values)=>console.log(values);

    return (
        <Formik
            initialValues={{ username:"", password:"" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema} >
            {({handleSubmit})=><SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;