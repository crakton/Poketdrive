import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Formik } from "formik";
import * as yup from "yup";
import { useSchedule } from "../../hooks/reactQuery/useSchedule";
import Loader from "../loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PricingProps {
  setFormData: any;
  formData: any;
  handleNext: any;
}

const PriceSetting: React.FC<PricingProps> = ({
  setFormData,
  formData,
  handleNext,
}) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate("ManageTrips" as never);
  };

  const { data, mutate, isPending, isError, error } = useSchedule();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue != null) {
          setUserData(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, []);

  const validationSchema = yup.object().shape({
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
  });

  const Pricing = () => {
    console.log(formData, "formData");
    mutate(formData, {
      onSuccess: () => {
        Alert.alert("Success", "Ride scheduled successfully!");
        handleNavigation();
      },
      onError: (error) => {
        console.error("Error in mutate:", error); // Log mutate errors
        Alert.alert("Error", "Failed to schedule ride");
      },
    });
  };
  if (isPending || isError) {
    return <Loader />; // Show loader or error message while fetching data
  }

  return (
    <View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Formik
          initialValues={{ price: formData.price || "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setFormData({
              ...formData,
              price: Number(values.price),
              creator: userData?.email,
            });
            Pricing();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={tw`px-5`}>
              <View>
                <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                  Pricing
                </Text>
                <Text
                  style={[
                    tw`text-[16px]  pt-2`,
                    { fontFamily: "Poppins-Light" },
                  ]}
                >
                  Set a price that each seat would pay to cover your fuel and
                  other expenses{" "}
                </Text>
                <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                  Prices are in naira
                </Text>
              </View>

              <View style={tw`flex mt-5 justify-center`}>
                <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                  Enter a price in naira
                </Text>
                <View
                  style={tw`flex flex-row items-center border rounded-lg  my-5 py-2 px-2  justify-center w-[13rem]`}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter a Price"
                    keyboardType="numeric"
                    value={values.price}
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                  />
                  <TouchableOpacity>
                    <Text style={[tw``, { fontFamily: "Poppins-Bold" }]}>
                      Naira
                    </Text>
                  </TouchableOpacity>
                </View>
                {touched.price && typeof errors.price === "string" && (
                  <Text style={tw`text-red-500 ml-2`}>{errors.price}</Text>
                )}
              </View>

              <TouchableOpacity
                style={tw`rounded-[1rem] bg-[#404040] p-3 mt-[19rem] mx-5`}
                onPress={handleSubmit}
              >
                <Text
                  style={[
                    tw`text-center text-xl text-white`,
                    { fontFamily: "Poppins-Bold" },
                  ]}
                >
                  Post a Trip
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default PriceSetting;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
});
