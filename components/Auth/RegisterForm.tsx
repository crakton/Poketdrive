import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CheckBox, Image } from "@rneui/base";
import tw from "twrnc";
import SocialLinks from "./SocialLinks";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "../../lib/api/functions/register";
import ContinueButton from "../ui/ContinueButton";
import * as WebBroswer from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { fetch } from "../../lib/api";
import { ResponseType } from "expo-auth-session";
// import * as SecureStore from 'expo-secure-store'

WebBroswer.maybeCompleteAuthSession();

const RegisterForm = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "CreateAccount">
    >();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const toggleCheckbox = () => setChecked(!checked);

  const { mutateAsync, status } = useMutation({
    mutationFn: (payload: any) => RegisterUser(payload),
    onSuccess: () => {
      Alert.alert("Success", "Registration successful");
      navigation.replace("Login");
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:
        "463687535027-cdhalaasercs9i92aslf424ekdujge8b.apps.googleusercontent.com", // android client id

      redirectUri: "com.omenvc.urride:/oauthredirect",
      responseType: ResponseType.IdToken,
      scopes: ["profile", "email"],
    },
    {
      scheme: "ur-ride",
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      // For ID token flow, access the id_token
      const { id_token } = response.params;
      console.log("ID token:", id_token);
    }
  }, [response]);

  const handleSignWithGoogle = useCallback(async () => {
    try {
      const google_res = await promptAsync();
      if (google_res.type !== "success") return;

      const res = await fetch({
        method: "POST",
        data: { idToken: google_res.params.id_token }, // Use id_token, not authentication.idToken
        url: "/auth/google-signin",
      });
      if (res) {
        // Handle navigate to home
      }
    } catch (err) {
      console.log("error faced: ", err);
    }
  }, [promptAsync]);

  const handleSignUp = async () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
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

    const payload = {
      firstName,
      lastName,
      email,
      password,
    };

    // If all validations passed, call the mutation
    await mutateAsync(payload);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          First Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Your full name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
          Last Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Your full name"
          value={lastName}
          onChangeText={setLastName}
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
      <ContinueButton
        text="Create Account"
        onPress={handleSignUp}
        loading={status === "pending"}
        disabled={false}
      />

      <View style={tw`flex flex-row items-center justify-center`}>
        <Text style={[tw`text-center`, { fontFamily: "Poppins-Regular" }]}>
          Already have an account?{" "}
          <Text
            style={[tw`text-[#F25B3E]`, { fontFamily: "Poppins-Bold" }]}
            onPress={() => navigation.replace("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
      <View style={tw`flex flex-row items-center py-2 px-10 justify-center`}>
        <View style={tw`flex-1 h-px bg-[#F25B3E] `} />
        <Text
          style={[tw`mx-2 text-gray-500`, { fontFamily: "Poppins-Regular" }]}
        >
          or register with
        </Text>
        <View style={tw`flex-1 h-px bg-[#F25B3E]`} />
      </View>
      <TouchableOpacity
        onPress={handleSignWithGoogle}
        style={tw`flex flex-row items-center justify-center gap-3 py-2 px-10 rounded-md shadow-md`}
      >
        <Image
          style={tw`w-8 h-8`}
          source={require("../../assets/google.png")}
        />
      </TouchableOpacity>

      {/* <SocialLinks /> */}
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
