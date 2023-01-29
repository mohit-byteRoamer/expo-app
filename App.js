// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import AuthState from "./src/context/auth/authState";
import Routes from "./src/navigation/routes";

function App() {
  return (
    <AuthState>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </AuthState>
  );
}

export default App;
