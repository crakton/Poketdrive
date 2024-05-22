import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const handleSubmit = () => {
    const isValid = phoneInput.current?.isValidNumber(formattedValue);
    setValid(isValid as boolean);
    if (isValid) {
      console.log("Phone number is valid!");
    } else {
      console.log("Phone number is invalid!");
    }
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="NG"
        layout="first"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <Text
        style={[styles.verificationText, { color: valid ? "green" : "red" }]}
      >
        {valid ? "Phone number is valid" : "Phone number is invalid"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  phoneContainer: {
    width: "100%",
    height: 50,
  },
  textInput: {
    paddingVertical: 0,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F25B3E",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  verificationText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PhoneNumberInput;
