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

const SignIn = function (props) {
  const authContext = React.useContext(AuthContext);
  const { email, setEmail, password, setPassword, setShowTab } = authContext;
  const handleSignIn = () => {
    axios
      .post(`http://localhost:3000/user/signIn`, {
        email,
        password,
      })
      .then((res) => {
        AsyncStorage.setItem("token", res.data.authToken);
        setShowTab(true);
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
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

export default SignIn;
