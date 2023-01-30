import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import {
  Root,
  CreateTask,
  User,
  SignUp,
  SignIn,
  ForgetPassword,
  ResetPassword,
} from "../components/modules/screens";
import icon from "../constants/icon";
import NavigationStrings from "../constants/Navigation-Strings";
import AuthContext from "../context/auth/authContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

let Routes = function () {
  const authContext = React.useContext(AuthContext);
  const { showTab } = authContext;
  return (
    <NavigationContainer>
      {showTab ? (
        <Tab.Navigator
          initialRouteName={NavigationStrings.CreateTask}
          screenOptions={{
            tabBarActiveTintColor: "#2A5ADF",
            tabBarInactiveTintColor: "#D4D7DF",
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name={NavigationStrings.CreateTask}
            component={CreateTask}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    style={{
                      tintColor: focused ? "#2A5ADF" : "#D4D7DF",
                      width: 23,
                      height: 23,
                    }}
                    source={icon.createIcon}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name={NavigationStrings.User}
            component={User}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    style={{
                      tintColor: focused ? "#2A5ADF" : "#D4D7DF",
                      width: 23,
                      height: 23,
                    }}
                    source={icon.userIcon}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Todo" component={Root} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
