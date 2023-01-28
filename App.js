// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import Routes from "./src/navigation/routes";

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
}

export default App;
