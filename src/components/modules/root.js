import React from "react";
import { StyleSheet } from "react-native";
import { Button, View } from "../widgets/widgets";
const Root = (props) => {
  const handleSignUp = () => {
    return props.navigation.navigate("SignUp");
  };

  const handleSignIn = () => {
    return props.navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleSignUp} text={"Sign Up"} />
      <Button onPress={handleSignIn} text={"Sign In"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Root;
