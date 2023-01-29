import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Root = (props) => {
  const handleSignUp = () => {
    return props.navigation.navigate("SignUp");
  };

  const handleSignIn = () => {
    return props.navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Root;
