import * as React from "react";
import { Button, View, Text } from "react-native";

function Home(props) {
  React.useEffect(() => {
    console.log(props);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello, world!</Text>
      <Button
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 3,
          borderStyle: "dashed",
          borderLeftColor: "red",
        }}
        title="Go to About"
        onPress={() =>
          props.navigation.navigate("About", {
            routesName: "Home",
          })
        }
      />
    </View>
  );
}

export default Home;
