import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { Formik } from "formik";
import * as Yup from "yup";
import ContinueButton from "../../components/ui/ContinueButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { inputFields } from "../../utils/constant";
import { useAppDispatch } from "../../redux/store";
import { updateSendForm } from "../../redux/features/waterSendSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Validation Schema
const validationSchema = Yup.object().shape({
  senderName: Yup.string().required("Sender name is required"),
  senderPhone: Yup.string().required("Sender phone is required"),
  senderEmail: Yup.string()
    .email("Invalid email address")
    .required("Sender email is required"),
  pickupAddress: Yup.string().required("Pickup address is required"),
  pickupTime: Yup.string().required("Pickup time is required"),
  description: Yup.string().required("Description is required"),
  netWeight: Yup.string().required("Net weight is required"),
  dimension: Yup.string().required("Dimension is required"),
  packageType: Yup.string().required("Package type is required"),
});

// Date and Time Format Helpers
const formatDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

function SendScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [setFieldPickupTime, setSetFieldPickupTime] = useState<
    ((field: string, value: any) => void) | null
  >(null);

  const showDatePicker = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    setSetFieldPickupTime(() => setFieldValue);
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date: Date) => {
    const formatted = formatDateTime(date);
    if (setFieldPickupTime) {
      setFieldPickupTime("pickupTime", formatted);
    }
    setDatePickerVisibility(false);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
        <Formik
          initialValues={{
            senderName: "",
            senderPhone: "",
            senderEmail: "",
            pickupAddress: "",
            pickupTime: "",
            description: "",
            netWeight: "",
            dimension: "",
            packageType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(
              updateSendForm({
                senderInfo: {
                  sender_name: values.senderName,
                  sender_phone: values.senderPhone,
                  pickupAddress: values.pickupAddress,
                  pickupTime: values.pickupTime,
                  description: values.description,
                },
                parcelInfo: {
                  weight: parseFloat(values.netWeight) || 0,
                  dimensions: values.dimension,
                  category: values.packageType,
                },
              })
            );

            navigation.navigate("RecieverInfo");
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={tw`flex gap-4 mt-2`}>
              {/* Sender Info */}
              <Text style={tw`text-[#191D31] text-[17px] pl-3 font-semibold`}>
                Sender's Information
              </Text>

              {inputFields.map(
                ({ name, placeholder, keyboardType, maxLength }) =>
                  name !== "pickupTime" && (
                    <View key={name}>
                      <TextInput
                        style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4`}
                        placeholder={placeholder}
                        placeholderTextColor="#4B5563"
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        onChangeText={handleChange(name)}
                        onBlur={handleBlur(name)}
                        value={values[name] as string}
                      />
                      {touched[name] && errors[name] && (
                        <Text style={tw`text-red-500 text-sm`}>
                          {errors[name]}
                        </Text>
                      )}
                    </View>
                  )
              )}

              {/* Pickup Time */}
              <View>
                <TouchableOpacity
                  onPress={() => showDatePicker(setFieldValue)}
                  style={tw`border border-[#101828] rounded-[21px] p-4`}
                >
                  <Text style={tw`text-[#4B5563]`}>
                    {values.pickupTime || "Select Pickup Date & Time"}
                  </Text>
                </TouchableOpacity>
                {touched.pickupTime && errors.pickupTime && (
                  <Text style={tw`text-red-500 text-sm`}>
                    {errors.pickupTime}
                  </Text>
                )}
              </View>

              {/* Description */}
              <TextInput
                style={tw`text-[#101828] border border-[#101828] rounded-[21px] p-4 pb-20`}
                placeholder="Description"
                placeholderTextColor="#4B5563"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
              {touched.description && errors.description && (
                <Text style={tw`text-red-500 text-sm`}>
                  {errors.description}
                </Text>
              )}

              {/* Parcel Info */}
              <Text style={tw`text-[#101828] text-[12px] pl-3 font-semibold`}>
                Parcel Information
              </Text>
              <View
                style={tw`flex-row items-center border border-[#101828] rounded-[21px] p-4`}
              >
                <TextInput
                  style={tw`flex-1 text-[#101828]`}
                  placeholder="Net Weight"
                  placeholderTextColor="#4B5563"
                  keyboardType="numeric"
                  onChangeText={handleChange("netWeight")}
                  onBlur={handleBlur("netWeight")}
                  value={values.netWeight}
                />
                <Text style={tw`text-[#101828] ml-2`}>kg</Text>
              </View>
              {touched.netWeight && errors.netWeight && (
                <Text style={tw`text-red-500 text-sm`}>{errors.netWeight}</Text>
              )}

              {/* Dimensions */}
              <Text style={tw`text-[#101828] text-[12px] pl-3 font-semibold`}>
                Dimensions
              </Text>
              <View style={tw`flex flex-row justify-start gap-5 mt-2`}>
                {["L", "B", "H"].map((dimension) => (
                  <TouchableOpacity
                    key={dimension}
                    onPress={() => setFieldValue("dimension", dimension)}
                    style={tw`border border-[#000000] rounded-[21px] p-4 w-[54px] items-center justify-center ${
                      values.dimension === dimension ? "bg-gray-300" : ""
                    }`}
                  >
                    <Text
                      style={tw`${
                        values.dimension === dimension
                          ? "text-black"
                          : "text-[#101828]"
                      }`}
                    >
                      {dimension}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.dimension && (
                <Text style={tw`text-red-500 text-sm`}>{errors.dimension}</Text>
              )}

              {/* Package Type */}
              <Text style={tw`text-[#101828] text-[12px] pl-3 font-semibold`}>
                Package Type
              </Text>
              <View style={tw`flex-wrap flex-row justify-start gap-2 mt-5`}>
                {[
                  "Book",
                  "Goods",
                  "Cosmetics",
                  "Electronic",
                  "Medicine",
                  "Others",
                ].map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setFieldValue("packageType", type)}
                    style={tw`border border-[#000000] rounded-[21px] p-4 items-center justify-center ${
                      values.packageType === type ? "bg-gray-300" : ""
                    }`}
                  >
                    <Text
                      style={tw`${
                        values.packageType === type
                          ? "text-black"
                          : "text-[#101828]"
                      }`}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.packageType && (
                <Text style={tw`text-red-500 text-sm`}>
                  {errors.packageType}
                </Text>
              )}

              {/* Continue Button */}
              <ContinueButton
                text="Next"
                onPress={handleSubmit}
                disabled={Object.keys(errors).length > 0}
                loading={false}
              />
            </View>
          )}
        </Formik>

        {/* DateTime Picker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SendScreen;
