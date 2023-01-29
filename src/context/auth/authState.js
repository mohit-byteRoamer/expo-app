import AuthContext from "./authContext";
import React from "react";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthState = (props) => {
  const host = "http://localhost:3000";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [showTab, setShowTab] = React.useState(false);

  let signIn = (title) => {
    
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        showTab,
        setShowTab,
        signIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
