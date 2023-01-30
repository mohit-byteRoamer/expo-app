import * as React from "react";
import { TextInput } from "react-native";
import { Text, View } from "../widgets";
let FormInput = function (props) {
  return (
    <>
      <View>
        <Text fontSize="h4" fontWeight="extraBold" color={"textSecondaryColor"}>
          {props.label}
        </Text>
        <TextInput
          {...props}
          style={props.style || styles.textInput}
          selectionColor={"black"}
        ></TextInput>
        {props.error ? (
          <Text
            style={styles.error}
            fontSize="caption"
            fontWeight="extraBold"
            color={"error"}
          >
            {props.error}
          </Text>
        ) : null}
      </View>
    </>
  );
};

export default FormInput;
