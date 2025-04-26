import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";
import { useWalletPayment } from "../../hooks/reactQuery/useWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { openBrowserAsync } from "expo-web-browser";
import ContinueButton from "@components/ui/ContinueButton";

const PaymentSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be a positive number")
    .required("Amount is required"),
});

const AddPaymentMethod = () => {
  const { mutate, status } = useWalletPayment();
  const [userData, setUserData] = useState<any>(null);
  const [payLink, setPayLink] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // console.log(userData.id, "data");
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          console.log(parsedData, "parsedData");
          setUserData(parsedData);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (values: any) => {
    setLoading(true);
    mutate(
      {
        userId: `${userData.id}`,
        amount: values.amount,
        email: `${userData.email}`,
      },
      {
        onSuccess: async (data) => {
          setLoading(false);
          setPayLink(data?.content); // Store the link
          // console.log(data, "data");
          if (data?.content) {
            await openBrowserAsync(data.content); // Open the link in the browser
          }
        },
        onError: (error) => {
          setLoading(false);
          Alert.alert(error.message);
        },
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <HeaderWithBackButton navigation={navigation} />
        <View>
          {/* <View
            style={tw`flex-row h-[50px]  -mt-2 mb-2 mx-5 items-center justify-between`}
          >
            <View>
              <Text
                style={[tw`text-[18px] `, { fontFamily: "Poppins-SemiBold" }]}
              >
                Add Payment Method
              </Text>
            </View>
          </View> */}
          <Formik
            initialValues={{ amount: "" }}
            validationSchema={PaymentSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={tw`flex -mt-5 justify-between h-full pb-45`}>
                <View>
                  <Text
                    style={[
                      tw`mb-3 ml-6 text-[18px] `,
                      { fontFamily: "Poppins-SemiBold" },
                    ]}
                  >
                    Amount
                  </Text>
                  <TextInput
                    style={Styles.Input}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    onChangeText={handleChange("amount")}
                    onBlur={handleBlur("amount")}
                    value={values.amount}
                  />
                  {touched.amount && errors.amount && (
                    <Text style={tw`text-red-500 ml-6`}>{errors.amount}</Text>
                  )}
                </View>
                <View style={tw`px-5 pb-10`}>
                  <ContinueButton
                    text={"Fund wallet"}
                    onPress={handleSubmit}
                    disabled={false}
                    loading={status === "pending"}
                  />
                </View>
              </View>
            )}
          </Formik>
          {/* <View style={tw`-mt-1`}>
            <Text
              style={[
                tw`mb-3 ml-6 text-[18px] `,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              Amount
            </Text>
            <TextInput
              style={Styles.Input}
              placeholder="Enter Amount"
              keyboardType="numeric"
            />
          </View>
          <View style={tw`mt-5`}>
            <Text
              style={[
                tw`mb-3 ml-6 text-[18px] `,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              Card number
            </Text>
            <TextInput
              keyboardType="numeric"
              style={Styles.Input}
              placeholder="xxxx xxxx xxxx xxxx "
            />
          </View>
          <View style={tw`flex-row`}>
            <View style={tw`mt-6`}>
              <Text
                style={[
                  tw`mb-3 ml-6 text-[18px] `,
                  { fontFamily: "Poppins-SemiBold" },
                ]}
              >
                Expiration
              </Text>
              <TextInput
                keyboardType="numeric"
                style={Styles.Input}
                placeholder="xxxx xxxx xxxx xxxx "
              />
            </View>
            <View style={tw`mt-6`}>
              <Text
                style={[
                  tw`mb-3 ml-6 text-[18px] `,
                  { fontFamily: "Poppins-SemiBold" },
                ]}
              >
                Cvv
              </Text>
              <TextInput
                keyboardType="numeric"
                style={Styles.Cvv}
                placeholder="3 4 7"
              />
            </View>
          </View>
          <View style={tw`mt-5`}>
            <Text
              style={[
                tw`mb-3 ml-6 text-[18px] `,
                { fontFamily: "Poppins-SemiBold" },
              ]}
            >
              Amount
            </Text>
            <TextInput
              keyboardType="numeric"
              style={Styles.Input}
              placeholder="1000"
            />
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleSheet.create({
  Input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  Cvv: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 70,
  },
});

export default AddPaymentMethod;
// function setLoading(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
