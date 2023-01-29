import { View, Text } from "react-native";

function User(props) {
  console.log(props);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>User</Text>
    </View>
  );
}

export default User;
