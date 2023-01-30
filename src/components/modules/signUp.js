import React from "react";
import AuthContext from "../../context/auth/authContext";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, StyleSheet } from "react-native";
import { Button, View } from "../widgets/widgets";

const SignUp = function (props) {
  const authContext = React.useContext(AuthContext);
  const {
    name,
    setName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    setShowTab,
  } = authContext;
  const handleSignUp = function (name, email, password) {
    if (
      (name.length < 6 && email.length < 6 && password.password < 6) ||
      (!name.length && !email.length)
    ) {
      alert(
        "Please Enter Valid credentials and character must be above 6 for every credentials"
      );
      return;
    }
    axios
      .post(`/user/signUp`, {
        name,
        email,
        password,
      })
      .then((res) => {
        AsyncStorage.setItem("token", res.data.authToken);
        setUserName(res.data.user.name);
        setShowTab(true);
      })
      .catch((e) => {
        if (e.response.data.message) {
          alert(e.response.data.message);
          setTimeout(() => {
            props.navigation.navigate("SignIn");
          }, 1000);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        onPress={() => handleSignUp(name, email, password)}
        text={"Sign Up"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
});

export default SignUp;
