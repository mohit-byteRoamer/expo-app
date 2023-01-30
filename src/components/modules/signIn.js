import React from "react";
import AuthContext from "../../context/auth/authContext";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Button, View, Text, Error } from "../widgets/widgets";

const SignIn = function (props) {
  const authContext = React.useContext(AuthContext);
  const {
    authUserMessage,
    setAuthUserMessage,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    setShowTab,
  } = authContext;
  const handleSignIn = function (email, password) {
    if (email.length < 6 && password.length < 6) {
      alert("Please Enter Valid credentials");
      return;
    }
    axios
      .post(`/user/signIn`, {
        email,
        password,
      })
      .then((res) => {
        setUserName(res.data.existingUser.name);
        AsyncStorage.setItem("token", res.data.authToken);
        setShowTab(true);
      })
      .catch((e) => {
        if (e.response.data.message == "userIdError") {
          setAuthUserMessage("User not found");
          setTimeout(() => {
            setAuthUserMessage("");
            setPassword("");
            props.navigation.navigate("SignUp");
          }, 1000);
          return;
        }
        if (e.response.data.message == "PasswordError") {
          alert("Please check your password");
        }
      });
  };

  const moveToForgetPage = () => {
    if (email.length < 6) {
      alert("Please Enter Valid Email");
      return;
    }
    props.navigation.navigate("ForgetPassword");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Error error={authUserMessage} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={moveToForgetPage}>
        <Text style={{ color: "red", fontWeight: "700" }}>ForgetPassword</Text>
      </TouchableOpacity>
      <Button onPress={() => handleSignIn(email, password)} text={"Sign In"} />
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

export default SignIn;
