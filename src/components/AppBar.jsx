import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";

import theme from "../theme";
import { GET_AUTHORIZED_UESR } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStoragetContext";

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
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_UESR);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.barText}>Repositories</Text>
        </Link>
        {data && data.authorizedUser ? (
          <>
            <Link to="/review">
              <Text style={styles.barText}>Create a review</Text>
            </Link>
            <Link to="/">
              <Text style={styles.barText} onPress={() => signOut()}>
                Sign out
              </Text>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Text style={styles.barText}>Sign in</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.barText}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
