import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    inputBox: {
        lineHeight: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        padding: 3,
    },
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [style, styles.inputBox, error && {borderColor: theme.colors.error}];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
