import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import ContinueButton from "../../components/ui/ContinueButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch } from "../../redux/store";
import { updateSendForm } from "../../redux/features/waterSendSlice";
import { useSelector } from "react-redux";
import { useGetRate, useGetCouponRate } from "../../hooks/reactQuery/useWater";

const validationSchema = Yup.object().shape({
  coupon: Yup.string().optional(),
});

const QuoteScreen = () => {
  const [selectedOption, setSelectedOption] = useState("express");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const waterSendData = useSelector((state: RootState) => state.sendForm);
  const weight = waterSendData?.parcelInfo?.weight || 0;

  const { data: rateData, isLoading } = useGetRate(weight);
  const { data: couponRateData, isLoading: isCouponLoading } = useGetCouponRate(
    weight,
    appliedCoupon
  );
  console.log(weight, "weight");
  console.log(rateData, "rateData");

  const expressCost =
    couponRateData?.content?.data?.expressCost ||
    rateData?.content?.data?.expressCost ||
    0;
  const standardCost =
    couponRateData?.content?.data?.standardCost ||
    rateData?.content?.data?.standardCost ||
    0;

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    setAppliedCoupon(couponCode);
    setTimeout(() => setIsApplyingCoupon(false), 1500);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-5`}>
      <ScrollView contentContainerStyle={tw`flex-grow px-5`}>
        <Text style={tw`text-xl font-bold text-[#191D31] mt-3`}>Quote</Text>

        <Formik
          initialValues={{ coupon: "" }}
          validationSchema={validationSchema}
          onSubmit={() => {
            dispatch(
              updateSendForm({
                cost: {
                  type: selectedOption,
                  amount:
                    selectedOption === "express" ? expressCost : standardCost,
                },
              })
            );
            navigate("SummaryScreen");
          }}
        >
          {({ handleSubmit }) => (
            <>
              <View
                style={tw`mt-4 flex-row border border-[#000000] rounded-lg`}
              >
                <TextInput
                  style={tw`flex-1 p-4 text-gray-700`}
                  placeholder="Coupon"
                  placeholderTextColor="#9CA3AF"
                  value={couponCode}
                  onChangeText={setCouponCode}
                />
                <TouchableOpacity
                  style={tw`px-5 py-3 rounded-r-lg bg-gray-200`}
                  onPress={handleApplyCoupon}
                  disabled={isApplyingCoupon}
                >
                  <Text style={tw`text-[#000000] font-normal`}>
                    {isApplyingCoupon ? "Applying..." : "Apply"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={tw`text-[#101828] mt-6 text-[12px] font-normal`}>
                Shipment Date
              </Text>
              <Text style={tw`text-[#101828] text-[12px] font-normal`}>
                03 / 11 / 2025
              </Text>

              <Text style={tw`text-gray-700 mt-12 font-normal text-[14px]`}>
                Estimated Delivery Time
              </Text>

              {["express", "standard"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedOption(option)}
                  style={tw`mt-4 p-5 border rounded-lg ${
                    selectedOption === option
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <View style={tw`flex-row items-start`}>
                    <View
                      style={tw`w-5 h-5 rounded-full mt-2 flex items-center justify-center ${
                        selectedOption === option
                          ? "bg-gray-300"
                          : "bg-gray-400"
                      } mr-3`}
                    >
                      <View
                        style={tw`w-3 h-3 rounded-full border ${
                          selectedOption === option
                            ? "border-black bg-black"
                            : "border-gray-400"
                        }`}
                      />
                    </View>
                    <View>
                      <Text style={tw`text-black text-[12px] font-normal`}>
                        {option === "express"
                          ? "Express Cost"
                          : "Standard Cost"}
                      </Text>
                      <Text
                        style={tw`text-[#101828] text-[12px] font-semibold mt-1`}
                      >
                        Mon, 17, March
                      </Text>
                      <Text style={tw`text-[#101828] text-[12px] mt-1`}>
                        Latest by 5th of April
                      </Text>
                      <Text style={tw`text-black font-bold text-xl mt-2`}>
                        {isLoading || isCouponLoading
                          ? "Loading..."
                          : `NGN ${
                              option === "express" ? expressCost : standardCost
                            }`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              <View style={tw`mt-6`}>
                <ContinueButton
                  text={"Proceed"}
                  onPress={() => handleSubmit()}
                  disabled={false}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuoteScreen;
