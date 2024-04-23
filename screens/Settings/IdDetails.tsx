import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import Profile from "../../components/Settings/Profile";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";

const IdDetails = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };
  return (
    <View style={tw`justify-between flex-1`}>
      <View>
        <Profile />
        <View style={tw`my-[20]`}>
          <TextInput
            style={Styles.Input}
            placeholder="Name on document"
            placeholderTextColor="#000"
          />
        </View>
        <View>
          <TextInput
            style={Styles.Input}
            placeholder="Document No"
            placeholderTextColor="#000"
          />
        </View>
        <View style={tw`mt-[25] mb-[15] px-[35] `}>
          <Text style={[tw`text-[18px]`, { fontFamily: "Poppins-Light" }]}>
            Scan Document
          </Text>
        </View>
        <View style={tw`justify-center items-center flex-row`}>
          <TouchableOpacity
            style={tw`h-[100px] w-[147px] mx-[10] bg-[#D9D9D9] rounded-[2] justify-center items-center `}
            onPress={pickImage}
          >
            <Text  style={tw`text-gray-500`}>front image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`h-[100px] mx-[10] w-[147px] bg-[#D9D9D9] rounded-[2] justify-center items-center`}
            onPress={pickImage}
          >
          
            <Text  style={tw`text-gray-500`}>back image</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={tw`justify-center items-center mt-[60] pt-[60]`}
          onPress={() => navigation.navigate("IdVerification")}
        >
          <Text
            style={[
              tw` text-[16px] ml-[-5]`,
              { fontFamily: "Poppins-SemiBold" },
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IdDetails;

const Styles = StyleSheet.create({
  Input: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    paddingLeft: 30,
    borderRadius: 10,
    marginHorizontal: 20,
    fontFamily: "Poppins-SemiBold",
  },
  Cvv: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 70,
  },
});
