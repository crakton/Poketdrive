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
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Formik } from "formik";
import * as yup from "yup";
import { useSchedule } from "../../hooks/reactQuery/useSchedule";
import Loader from "../loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContinueButton from "@components/ui/ContinueButton";

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
  const { mutate, isPending, status } = useSchedule();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retrying, setRetrying] = useState(false);

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

  useEffect(() => {
    if (retrying) {
      Pricing();
    }
  }, [retrying]);

  const validationSchema = yup.object().shape({
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
  });
  console.log("FormData being sent:", formData);
  const Pricing = () => {
    setLoading(true);
    console.log("FormData being sent:", formData);
    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          console.log("Success Response:", data);
          setLoading(false); // Stop loading on success
          Alert.alert("Success", "Ride scheduled successfully!");
          navigation.reset({
            index: 0,
            routes: [{ name: "ManageTrips" as never }],
          });
        } else {
          console.log("First attempt failed, retrying...");
          setLoading(false);
          setRetryCount((prev) => prev + 1);
          if (retryCount < 1) {
            setRetrying(true); // Trigger retry
          } else {
            Alert.alert("Error", "Failed to schedule ride after retry");
          }
        }
      },
      onError: (error) => {
        console.log("Error Response:", error);
        setLoading(false);
        setRetryCount((prev) => prev + 1);
        if (retryCount < 1) {
          setRetrying(true); // Trigger retry
        } else {
          Alert.alert("Error", "Failed to schedule ride after retry");
        }
      },
    });
  };

  return (
    <View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        {loading || isPending ? (
          <Loader /> // Show loader while mutation is pending
        ) : (
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
              <View style={tw``}>
                <View>
                  <Text
                    style={[
                      tw`text-[16px]`,
                      { fontFamily: "Poppins-SemiBold" },
                    ]}
                  >
                    Pricing
                  </Text>
                  <Text
                    style={[
                      tw`text-[14px]  pt-2`,
                      { fontFamily: "Poppins-Light" },
                    ]}
                  >
                    Set a price that each seat would pay to cover your fuel and
                    other expenses{" "}
                  </Text>
                  <Text
                    style={[
                      tw`text-[14px]`,
                      { fontFamily: "Poppins-SemiBold" },
                    ]}
                  >
                    Prices are in naira
                  </Text>
                </View>

                <View style={tw`flex mt-5 justify-center`}>
                  <View>
                    <Text
                      style={[
                        tw`text-[14px]`,
                        { fontFamily: "Poppins-SemiBold" },
                      ]}
                    >
                      Enter a price in naira
                    </Text>
                    <View
                      style={tw`flex flex-row items-center border rounded-lg  my-5  px-2  justify-center w-[13rem]`}
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
                {/* <View style={tw`rounded-[1rem]  mt-[19rem]`}>
                  <ContinueButton
                    text={"Post a Trip"}
                    onPress={handleSubmit}
                    disabled={false}
                    loading={status === "pending"}
                  />
                </View> */}
              </View>
            )}
          </Formik>
        )}
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
