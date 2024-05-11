import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { CheckBox } from "@rneui/base"; // Import CheckBox component
import tw from "twrnc";
import SocialLinks from "./SocialLinks";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const RegisterForm = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "CreatAccount">
    >();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [disEnableLogin, setDisEnableLogin] = useState(true);

  const handleSignUp = () => {
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
  
    if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters long");
      return;
    }
  
    // If all validations passed
    setDisEnableLogin(false); // Set disable button to false
    // Handle sign-up logic here if validation passes
    console.log("Signing up...");
  };
  

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Full Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Email address
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="8 characters minimum"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Confirm Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="8 characters minimum"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <View style={tw`flex flex-row items-center  justify-start`}>
        <CheckBox
          checked={checked}
          onPress={toggleCheckbox}
          // Use ThemeProvider to make change for all checkbox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="#F25B3E"
        />
        <Text style={{ fontFamily: "Poppins-Regular" }}>
          Send me email to get promo, offer and more
        </Text>
      </View>
      <TouchableOpacity
        // disabled={disEnableLogin}
        style={tw`rounded-[1rem] bg-[#F25B3E] p-3 my-2`}
        onPress={handleSignUp}
      >
        <Text
          style={[
            tw`text-center text-2xl text-white`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <View style={tw`flex flex-row items-center py-2 px-10 justify-center`}>
        <View style={tw`flex-1 h-px bg-[#F25B3E] `} />
        <Text
          style={[tw`mx-2 text-gray-500`, { fontFamily: "Poppins-Regular" }]}
        >
          or register with
        </Text>
        <View style={tw`flex-1 h-px bg-[#F25B3E]`} />
      </View>
      <SocialLinks />
      <View style={tw`flex flex-row items-center mt-5 justify-center`}>
        <Text style={[tw`text-center`, { fontFamily: "Poppins-Regular" }]}>
          by creating an account, you agree to our's{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            Privacy Policy
          </Text>{" "}
          and{" "}
          <Text style={{ textDecorationLine: "underline" }}>Terms of Use</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  helperText: {
    fontSize: 12,
    color: "#666",
  },
});

export default RegisterForm;
