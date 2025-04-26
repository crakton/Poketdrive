import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import tw from "twrnc";
import ContinueButton from "../../components/ui/ContinueButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAppDispatch } from "../../redux/store";
import { updateSendForm } from "../../redux/features/waterSendSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const validationSchema = Yup.object().shape({
  receiverName: Yup.string().required("Receiver's name is required"),
  receiverPhone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Receiver's phone is required"),
  receiverAddress: Yup.string().required("Address is required"),
  // deliveryTime: Yup.string().required("Preferred delivery time is required"),
  deliveryInstruction: Yup.string().optional(),
});

const RecieverInfo = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      // deliveryTime: "", // Corrected the key
      deliveryInstruction: "",
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        updateSendForm({
          receiversInfo: {
            receiversName: values.receiverName,
            receiversPhone: values.receiverPhone,
            receiversAddress: values.receiverAddress,
            // deliveryTime: values.deliveryTime,
            deliveryInstruction: values.deliveryInstruction,
          },
        })
      );
      navigate("QuoteScreen");
    },
  });

  const handleConfirm = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    setFieldValue("deliveryTime", formattedDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 px-5 pb-5`}>
        <ScrollView contentContainerStyle={tw`flex-grow`}>
          <View style={tw`gap-4 mt-2`}>
            <Text style={tw`text-[#191D31] text-[17px] pl-3 font-semibold`}>
              Receiver's Information
            </Text>

            {/* Name Input */}
            <View>
              <TextInput
                style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
                placeholder="Enter receiver's name"
                placeholderTextColor="#4B5563"
                onChangeText={handleChange("receiverName")}
                onBlur={handleBlur("receiverName")}
                value={values.receiverName}
              />
              {touched.receiverName && errors.receiverName && (
                <Text style={tw`text-red-500 text-sm`}>
                  {errors.receiverName}
                </Text>
              )}
            </View>

            {/* Phone Input */}
            <View>
              <TextInput
                style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
                placeholder="Enter receiver's phone"
                placeholderTextColor="#4B5563"
                keyboardType="phone-pad"
                maxLength={11}
                onChangeText={handleChange("receiverPhone")}
                onBlur={handleBlur("receiverPhone")}
                value={values.receiverPhone}
              />
              {touched.receiverPhone && errors.receiverPhone && (
                <Text style={tw`text-red-500 text-sm`}>
                  {errors.receiverPhone}
                </Text>
              )}
            </View>

            {/* Address Input */}
            <View>
              <TextInput
                style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
                placeholder="Address"
                placeholderTextColor="#4B5563"
                onChangeText={handleChange("receiverAddress")}
                onBlur={handleBlur("receiverAddress")}
                value={values.receiverAddress}
              />
              {touched.receiverAddress && errors.receiverAddress && (
                <Text style={tw`text-red-500 text-sm`}>
                  {errors.receiverAddress}
                </Text>
              )}
            </View>

            {/* Date & Time Picker */}
            {/* <TouchableOpacity
              onPress={showDatePicker}
              style={tw`border border-[#101828] rounded-[21px] p-4`}
            >
              <Text style={tw`text-[#4B5563]`}>
                {values.deliveryTime || "Select Pickup Date & Time"}
              </Text>
            </TouchableOpacity>
            {touched.deliveryTime && errors.deliveryTime && (
              <Text style={tw`text-red-500 text-sm`}>
                {errors.deliveryTime}
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            /> */}

            {/* Delivery Instruction Input */}
            <View>
              <TextInput
                style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
                placeholder="Delivery instruction (Optional)"
                placeholderTextColor="#4B5563"
                onChangeText={handleChange("deliveryInstruction")}
                onBlur={handleBlur("deliveryInstruction")}
                value={values.deliveryInstruction}
              />
            </View>
          </View>
        </ScrollView>

        {/* Button stays at the bottom */}
        <View style={tw`mt-5`}>
          <ContinueButton
            text={"Get Quote"}
            onPress={handleSubmit}
            disabled={false}
            loading={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecieverInfo;
