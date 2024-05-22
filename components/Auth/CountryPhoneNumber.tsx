import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { RequestOTP } from "../../lib/api/functions/register";
import Loader from "../loader/Loader";

const PhoneNumberInput = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Login">>();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [email, setEmail] = useState("");

  // const handleSubmit = () => {

  const { mutateAsync, status, isSuccess, data } = useMutation({
    mutationFn: (payload: any) => RequestOTP(payload), // Assuming RegisterUser is an async function returning a Promise
  });
  //   const isValid = phoneInput.current?.isValidNumber(formattedValue);
  //   setValid(isValid as boolean);
  //   if (isValid) {
  //     console.log("Phone number is valid!");
  //   } else {
  //     console.log("Phone number is invalid!");
  //   }
  // };

  const handleSignUp = async () => {
    // Basic validation
    if (!email) {
      Alert.alert("All fields are required");
      return;
    }
    const payload = {
      email,
    };

    // If all validations passed, call the mutation
    await mutateAsync(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Success", "OTP sent successfully!");
      navigation.navigate("Verification");
    } else if (status == "error") {
      Alert.alert("Error", "An error occurred, please try again");
    }
  }, [isSuccess, status]);

  return (
    <View style={styles.container}>
      {status == "pending" && <Loader />}
      {/* <PhoneInput
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
      /> */}
      <View style={styles.inputContainer}>
        <Text style={[tailwind`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      {/* <Text
        style={[styles.verificationText, { color: valid ? "green" : "red" }]}
      >
        {valid ? "Phone number is valid" : "Phone number is invalid"}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    // alignItems: "center",
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
  input: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
});

export default PhoneNumberInput;
