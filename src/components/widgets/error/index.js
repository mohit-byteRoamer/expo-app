import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../widgets";

let Error = function (props) {
  return (
    <View>
      <Text style={styles.Error}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Error: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Error;
