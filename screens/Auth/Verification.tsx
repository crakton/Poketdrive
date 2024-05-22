import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import CountryPhoneNumber from "../../components/Auth/CountryPhoneNumber";
import { useNavigation } from "@react-navigation/native";
import CodeVerification from "../../components/Auth/CodeVerification";

const Verification = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-outline" type="ionicon" color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={tw`flex px-3`}>
          <Text style={[tw`text-2xl`, { fontFamily: "Poppins-Black" }]}>
            Verification Title
          </Text>
          <Text style={[tw`text-lg py-5`, { fontFamily: "Poppins-Regular" }]}>
            {/* Enter the code we've sent to your phone number +234 70 345 67899 */}
            Enter the code we've sent to your email address
          </Text>
        </View>
        <CodeVerification />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({});
