import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { FontAwesome5, Feather, Fontisto } from "@expo/vector-icons";
import ContinueButton from "../../components/ui/ContinueButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const SummaryScreen = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const paymentMethods = [
    { id: "visa", label: "Visa/Mastercard/JCB" },
    { id: "bank", label: "Bank Transfer" },
    { id: "paystack", label: "Paystack" },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white `}>
      <ScrollView contentContainerStyle={tw`flex-grow px-5`}>
        {/* Header */}
        <Text style={tw`text-[17px] font-bold text-[#191D31] mt-3`}>
          Summary
        </Text>

        <Text style={tw`text-gray-700 mt-4 `}>Estimated Delivery Time</Text>

        <View style={tw`mt-4 p-4 border border-[#000000] rounded-lg`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View style={tw`flex-row items-start `}>
              <FontAwesome5
                name="map-marker-alt"
                size={16}
                color="black"
                style={tw`mt-2`}
              />
              <View style={tw`ml-3`}>
                <Text style={tw`text-black font-semibold`}>Collect from</Text>
                <Text style={tw`text-gray-500 text-[12px]`}>
                  Sender address
                </Text>
                <Text style={tw`text-gray-700 text-[12px]`}>
                  Kilometer 6, 278H, Street 201R, Kroalkor Village,
                </Text>
                <Text style={tw`text-gray-700 text-[12px] mt-1`}>
                  Unnamed Road, Phnom Penh
                </Text>
              </View>
            </View>
            <Feather name="edit-2" size={18} color="black" style={tw`mt-4`} />
          </View>

          <View style={tw`flex-row justify-between items-start mt-4`}>
            <View style={tw`flex-row items-start `}>
              <FontAwesome5
                name="map-marker-alt"
                size={16}
                color="black"
                style={tw`mt-2`}
              />
              <View style={tw`ml-3`}>
                <Text style={tw`text-black font-semibold`}>Delivery to</Text>
                <Text style={tw`text-gray-500 text-[12px]`}>
                  Receiver address
                </Text>
                <Text style={tw`text-gray-700 text-[12px]`}>
                  2nd Floor 01, 25 Mao Tse Toung Blvd (245),
                </Text>
                <Text style={tw`text-gray-700 text-[12px] mt-1`}>
                  Phnom Penh 12302, Cambodia
                </Text>
              </View>
            </View>
            <Feather name="edit-2" size={18} color="black" style={tw`mt-4`} />
          </View>
        </View>

        <View style={tw`mt-4 flex-row items-center `}>
          <TouchableOpacity
            style={tw`bg-[#44442D] px-4 py-3 rounded-full flex-row items-center`}
          >
            <FontAwesome5 name="clock" size={14} color="white" />
            <Text style={tw`text-white ml-2 text-[12px] font-semibold`}>
              Take around 20 min
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mt-6 p-4 border border-gray-300 rounded-lg`}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={tw`flex-row justify-between items-center p-3`}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={tw`flex-row items-center`}>
                <View
                  style={tw`bg-[#44442D] w-6 h-6 flex items-center justify-center rounded-full`}
                >
                  <Fontisto name="credit-card" size={10} color="white" />
                </View>

                <Text style={tw`text-black ml-3 font-semibold`}>
                  {method.label}
                </Text>
              </View>

              <View
                style={tw`w-5 h-5 rounded-full mt-2  flex items-center justify-center ${
                  selectedPayment === method.id ? " bg-gray-300" : "bg-gray-400"
                } mr-3`}
              >
                <View
                  style={tw`w-3 h-3 rounded-full border ${
                    selectedPayment === method.id
                      ? "border-black bg-black"
                      : "border-gray-400"
                  }`}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={tw`px-5 `}>
        <ContinueButton
          text={"Proceed"}
          onPress={() => navigate("PaymentScreen")}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SummaryScreen;
