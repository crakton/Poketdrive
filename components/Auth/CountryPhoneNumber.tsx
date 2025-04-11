import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { RequestOTP } from "../../lib/api/functions/register";
import ContinueButton from "../ui/ContinueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import CustomButton from "../ui/CustomButton";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RootStackParamList } from "../../types";
const PhoneNumberInput = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "Login">>();

  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const { mutateAsync, status } = useMutation({
    mutationFn: (payload: any) => RequestOTP(payload),
    onSuccess: (data) => {
      Alert.alert("Success", data?.message);
      navigation.replace("Verification");
    },
    onError: () => {
      Alert.alert("Error", "An error occurred, please try again");
    },
  });

  const handleSignUp = async () => {
    if (!email) {
      Alert.alert("All fields are required");
      return;
    }
    const payload = { email };

    // Call the mutation function to request OTP
    await mutateAsync(payload);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[tailwind`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Email
        </Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Your email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <CustomButton
        text="Verify"
        onPress={handleSignUp}
        disabled={!email}
        loading={status === "pending"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F25B3E",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PhoneNumberInput;
function mutateAsync(arg0: { email: string }) {
  throw new Error("Function not implemented.");
}
