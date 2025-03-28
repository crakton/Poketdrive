import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import CheckBox from "react-native-check-box";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import ContinueButton from "../../components/ui/ContinueButton";

const PaymentScreen = () => {
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 px-5`}>
        <HeaderWithBackButton title="Payment" />

        {/* Card Number */}
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 text-[13px] text-black`}
          placeholder="Card Number"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />

        {/* Expiry Date & CVV */}
        <View style={tw`flex-row justify-between mt-4`}>
          {/* Expiry Date Input */}
          <TextInput
            style={tw`border w-[47%] border-[#F25B3E] rounded-lg p-3  text-[13px] text-black`}
            placeholder="MM/YY"
            placeholderTextColor="gray"
            keyboardType="numeric"
            maxLength={5}
            value={expiry}
            onChangeText={setExpiry}
          />

          {/* CVV Input */}
          <TextInput
            style={tw`border w-[47%] border-gray-300 rounded-lg p-3  text-[13px] text-black ml-4`}
            placeholder="CVV/CVC"
            placeholderTextColor="gray"
            keyboardType="numeric"
            maxLength={3}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>

        {/* Save Card Checkbox */}
        <View style={tw`flex-row items-center mt-4`}>
          <CheckBox
            isChecked={saveCard}
            onClick={() => setSaveCard(!saveCard)}
            checkedCheckBoxColor="#F25B3E"
            uncheckedCheckBoxColor="gray"
          />
          <Text style={tw`text-black ml-3 text-[14px]`}>Save card</Text>
        </View>

        <View style={tw`flex-grow`} />
      </View>

      <View style={tw`px-5 pb-5`}>
        <ContinueButton
          text={"Pay"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;
