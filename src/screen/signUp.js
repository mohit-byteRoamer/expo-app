import React from "react";
import AuthContext from "../context/auth/authContext";
import axios from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

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
          props.navigation.navigate("SignIn");
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignUp(name, email, password)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
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

export default SignUp;
