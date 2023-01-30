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

const ForgetPassword = function (props) {
  const authContext = React.useContext(AuthContext);
  const {
    authUserMessage,
    setAuthUserMessage,
    email,
    setEmail,
  } = authContext;
  const handleForgetPassword = () => {
    axios
      .post(`/user/forgetPassword`, {
        email,
      })
      .then((res) => {
        setAuthUserMessage(res.data.message);
        setTimeout(() => {
          setAuthUserMessage("");
          props.navigation.navigate("resetPassword");
        }, 1000);
      })
      .catch((e) => {
        if (e.response.data.message) {
          alert(e.response.data.message);
          props.navigation.navigate("SignUp");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.message}>
        {authUserMessage ? authUserMessage : null}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleForgetPassword}>
        <Text style={styles.buttonText}>Send OPT</Text>
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
  message: {
    color: "green",
    fontWeight: "bold",
  },
});

export default ForgetPassword;
