// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, About } from "../screen/screens";
import NavigationStrings from "../constants/Navigation-Strings";
const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={NavigationStrings.Home} component={Home} />
        <Stack.Screen name={NavigationStrings.About} component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
