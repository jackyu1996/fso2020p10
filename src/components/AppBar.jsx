import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
});

const AppBar = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text>Repositories</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBar;
