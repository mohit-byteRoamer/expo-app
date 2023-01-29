import * as React from "react";
import { View, Text } from "react-native";
import AuthState from "./src/context/auth/authState";
import TodoState from "./src/context/todo/todoState";
import Routes from "./src/navigation/routes";

function App() {
  return (
    <AuthState>
      <TodoState>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </TodoState>
    </AuthState>
  );
}

export default App;
