import React from "react";
import AuthContext from "../../context/auth/authContext";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const ResetPassword = function (props) {
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
    otp,
    setOtp,
  } = authContext;
  const handleSignIn = () => {
    if (
      (otp.length < 6 && email.length < 6 && password.length < 6) ||
      (!otp.length || !email.length || !password.length)
    ) {
      alert(
        "Please Enter Valid credentials and character must be above 6 for every credentials"
      );
      return;
    }
    axios
      .post(`/user/resetPassword`, {
        otp,
        email,
        password,
      })
      .then((res) => {
        if (res.data.message == "Error") {
          setAuthUserMessage("Please Enter Valid OTP");
          setTimeout(() => {
            setAuthUserMessage("");
          }, 1000);
        } else {
          setAuthUserMessage(res.data.message);
          setTimeout(() => {
            setAuthUserMessage("");
            setShowTab(true);
          }, 1000);
          setUserName(res.data.user.name);
          AsyncStorage.setItem("token", res.data.authToken);
        }
      })
      .catch((e) => {
        if (e.response.data.message) {
          alert(e.response.data.message);
          props.navigation.navigate("resetPassword");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={(text) => setOtp(text)}
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
      <Text style={styles.message}>
        {authUserMessage ? authUserMessage : null}
      </Text>
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
  message: {
    color: "green",
    fontWeight: "bold",
  },
});

export default ResetPassword;
