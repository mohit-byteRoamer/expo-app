import React from "react";
import AuthContext from "../../context/auth/authContext";
import axios from "../../../axios";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text, View } from "../widgets/widgets";

const ForgetPassword = function (props) {
  const authContext = React.useContext(AuthContext);
  const { authUserMessage, setAuthUserMessage, email, setEmail } = authContext;
  const handleForgetPassword = () => {
    if (email.length < 6) {
      alert("Please Enter Valid Email");
      return;
    }
    axios
      .post(`/user/forgetPassword`, {
        email,
      })
      .then((res) => {
        setAuthUserMessage(res.data.message);
        setTimeout(() => {
          setAuthUserMessage("");
          props.navigation.navigate("ResetPassword");
        }, 1000);
      })
      .catch((e) => {
        if (e.response.data.message) {
          setAuthUserMessage(res.data.message);
          setTimeout(() => {
            setAuthUserMessage("");
            props.navigation.navigate("SignIn");
          }, 1000);
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
      <Button onPress={handleForgetPassword} text={"Send OTP"} />
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
