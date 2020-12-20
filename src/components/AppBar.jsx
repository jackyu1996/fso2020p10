import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';

import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
    barText: {
        color: "white",
        textAlignVertical: "center",
        fontSize: 20,
        lineHeight: 50,
        margin: 10,
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.barText}>Repositories</Text>
                </Link>
                <Link to="/signin">
                    <Text style={styles.barText}>Sign in</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;
