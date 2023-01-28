import { View, Text } from "react-native";

function About(props) {
  console.log(props);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About</Text>
    </View>
  );
}

export default About;
