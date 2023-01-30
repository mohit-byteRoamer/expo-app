import AuthContext from "./authContext";
import React from "react";

const AuthState = (props) => {
  const [userName, setUserName] = React.useState("");
  const [authUserMessage, setAuthUserMessage] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [showTab, setShowTab] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        authUserMessage,
        setAuthUserMessage,
        otp,
        setOtp,
        userName,
        setUserName,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        showTab,
        setShowTab,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
