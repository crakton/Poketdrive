import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";

interface BackRowSeatingProps {
  formData: any;
  setFormData: (data: any) => void;
  handleNext: () => void;
}

const BackRowSeating: React.FC<BackRowSeatingProps> = ({
  formData,
  setFormData,
  handleNext,
}: any) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "BackRowSeating">
    >();

  const [persons, setPersons] = React.useState(2);
  const [numberOfSeats, setNumberOfSeats] = React.useState<string | null>(null);

  const decreasePersons = () => {
    if (persons > 1) {
      setPersons(persons - 1);
    }
  };

  const increasePersons = () => {
    if (persons < 5) {
      setPersons(persons + 1);
    }
  };

  return (
    <View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Formik
          initialValues={{
            remaining_capacity: numberOfSeats,
            other: "", // Add any other initial values here
          }}
          validationSchema={yup.object().shape({
            remaining_capacity: yup
              .string()
              .nullable()
              .required("Remaining capacity is required"),
          })}
          onSubmit={(values) => {
            setFormData({
              ...formData,
              total_capacity: Number(`${persons}`),
              remaining_capacity: Number(`${values.remaining_capacity}`),
              other: values.other,
            });
            handleNext();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={tw`px-5`}>
              <View>
                <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                  Back row seating
                </Text>
                <Text
                  style={[
                    tw`text-[16px]  pt-2`,
                    { fontFamily: "Poppins-Light" },
                  ]}
                >
                  Pledge to a maximum of 2 people in the back for better reviews
                </Text>
              </View>
              <View style={tw`flex flex-row items-center justify-center`}>
                <View
                  style={tw`flex flex-row items-center rounded-lg  my-5 py-2 bg-[#F25B3E] justify-center w-[13rem]  gap-5 px-5`}
                >
                  <TouchableOpacity onPress={decreasePersons}>
                    <Icon
                      name="remove-outline"
                      type="ionicon"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      tw`text-[16px] text-white`,
                      { fontFamily: "Poppins-Bold" },
                    ]}
                  >
                    {persons} Persons
                  </Text>
                  <TouchableOpacity onPress={increasePersons}>
                    <Icon
                      name="add-outline"
                      type="ionicon"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
                  Others
                </Text>
                <View
                  style={tw`flex flex-row items-center mt-2 justify-start gap-5`}
                >
                  <TouchableOpacity
                    onPress={() => setFieldValue("other", "Bikes")}
                  >
                    <Text
                      style={[
                        tw`text-[16px] border rounded-lg px-2`,
                        values.other === "Bikes" && tw`bg-[#D9D9D9]`,
                        { fontFamily: "Poppins-Light" },
                      ]}
                    >
                      Bikes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFieldValue("other", "Pets")}
                  >
                    <Text
                      style={[
                        tw`text-[16px] border rounded-lg px-2`,
                        values.other === "Pets" && tw`bg-[#D9D9D9]`,
                        { fontFamily: "Poppins-Light" },
                      ]}
                    >
                      Pets
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFieldValue("other", "Skates")}
                  >
                    <Text
                      style={[
                        tw`text-[16px] border rounded-lg px-2`,
                        values.other === "Skates" && tw`bg-[#D9D9D9]`,
                        { fontFamily: "Poppins-Light" },
                      ]}
                    >
                      Skates
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={tw`flex flex-row items-center mt-10 justify-start gap-2`}
              >
                {["1", "2", "3", "4", "5", "6", "7"].map((number) => (
                  <TouchableOpacity
                    key={number}
                    style={[
                      tw`border rounded-xl px-2`,
                      numberOfSeats === number && tw`bg-[#D9D9D9]`,
                    ]}
                    onPress={() => {
                      setNumberOfSeats(number);
                      setFieldValue("remaining_capacity", number);
                    }}
                  >
                    <Text
                      style={[
                        tw`text-[16px] rounded-xl `,
                        { fontFamily: "Poppins-Regular" },
                      ]}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {touched.remaining_capacity && errors.remaining_capacity && (
                <Text style={tw`text-red-500 ml-2`}>
                  {errors.remaining_capacity}
                </Text>
              )}
              <TouchableOpacity
                style={[tw`rounded-[1rem] bg-[#333333] p-3 mt-[19rem] mx-5`]}
                onPress={handleSubmit}
              >
                <Text
                  style={[
                    tw`text-center text-xl text-white`,
                    { fontFamily: "Poppins-Bold" },
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default BackRowSeating;
