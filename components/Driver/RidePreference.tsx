import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { Formik } from "formik";
import * as yup from "yup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";

interface RidePreferenceProps {
  setFormData: any;
  formData: any;
  handleNext: any;
}

const RidePreference: React.FC<RidePreferenceProps> = ({
  setFormData,
  formData,
  handleNext,
}: any) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "RidePreference">
    >();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCarDetails = useMemo(() => {
    if (!selected) return;
    return selected;
  }, [selected]);
  const [twoBackRow, setTwoBackRow] = useState(false);
  const [threeBackRow, setThreeBackRow] = useState(false);
  const windowHeight = Dimensions.get("window").height;

  const HandleBackRowSeat = (selectedOption: string) => {
    if (selectedOption === "twoBackRow") {
      setTwoBackRow(true);
      setThreeBackRow(false);
    } else if (selectedOption === "threeBackRow") {
      setTwoBackRow(false);
      setThreeBackRow(true);
    }
  };

  const [carImageUri, setCarImageUri] = useState<string | null>(
    "https://avatars.githubusercontent.com/u/68823331?v=4"
  );

  // Image URL
  const imageURL = "https://avatars.githubusercontent.com/u/68823331?v=4";
  const carSeatSvg = `
    <svg width="20" height="20" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#565656"/>
    </svg>
  `;
  const carSeatSelectedSvg = `
  <svg width="20" height="20" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#DDDD"/>
  </svg>
`;

  // Yup validation schema
  const validationSchema = yup.object().shape({
    luggage_type: yup.string().required("Luggage preference is required"),
    brs: yup
      .number()
      .typeError("Back row seating preference must be a number")
      .required("Back row seating preference is required"),
  });

  const RidePrefrence = (values: any) => {
    setFormData({
      ...formData,
      brs: Number(values.brs),
      luggage_type: selectedCarDetails,
    });
    handleNext();
  };
  return (
    <View style={[tw`bg-[#FFFFFF] `, { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Formik
          initialValues={{ luggage_type: "", brs: 0 }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            RidePrefrence({
              brs: values.brs,
              luggage_type: values.luggage_type as string,
            });
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
            <View>
              <ImageBackground
                source={require("../../assets/urideCar.png")}
                style={[styles.backgroundImage, { height: windowHeight / 4 }]}
              >
                {/* Overlay text or components */}
              </ImageBackground>

              <View style={tw`flex my-5 items-start`}>
                <Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
                  Preference
                </Text>
                <Text
                  style={[
                    tw`text-[14px]  pt-2`,
                    { fontFamily: "Poppins-Light" },
                  ]}
                >
                  This informs passengers of how much space you have for luggage
                  and extras before they book
                </Text>
              </View>

              <View style={tw`flex`}>
                <Text
                  style={[
                    tw`text-[16px] pb-2`,
                    { fontFamily: "Poppins-SemiBold" },
                  ]}
                >
                  Luggage
                </Text>
                <View style={tw`w-[100%] flex`}>
                  <FlatList
                    data={["None", "small", "medium", "large"]}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setSelected(item);
                          handleChange("luggage_type")(item); // Update Formik field
                        }}
                        style={[
                          tw`flex flex-row mx-1 items-center justify-center gap-5 rounded-lg border px-6 py-2`,
                          selectedCarDetails === item
                            ? tw`bg-[#000000]`
                            : tw`bg-[#FFFFFF]`,
                        ]}
                      >
                        <Icon
                          name="briefcase"
                          type="ionicon"
                          color={
                            selectedCarDetails === item ? "white" : "black"
                          }
                        />
                        <Text
                          style={[
                            tw`text-center`,
                            selectedCarDetails === item && tw`text-white`,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                {touched.luggage_type && errors.luggage_type && (
                  <Text style={tw`text-red-500 ml-2`}>
                    {errors.luggage_type}
                  </Text>
                )}
              </View>

              <View style={tw`flex  py-5`}>
                <Text
                  style={[tw`text-[16px] pb-2`, { fontFamily: "Poppins-Bold" }]}
                >
                  Back row Seating
                </Text>
                <View style={tw`flex flex-row items-center justify-center`}>
                  <TouchableOpacity
                    onPress={() => {
                      HandleBackRowSeat("twoBackRow");
                      handleChange("brs")("2"); // Update Formik field
                    }}
                    style={[
                      tw`flex flex-row ml-11 items-center justify-center px-6 py-2`,
                      twoBackRow ? tw`bg-[#565656]` : tw`bg-[#FFFFFF]`,
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-[14px] pt-2`,
                        { fontFamily: "Poppins-Regular" },
                        twoBackRow ? tw`text-white` : tw`text-black`,
                      ]}
                    >
                      Max (Two)
                    </Text>
                    <SvgXml
                      xml={twoBackRow ? carSeatSelectedSvg : carSeatSvg}
                    />
                    <SvgXml
                      xml={twoBackRow ? carSeatSelectedSvg : carSeatSvg}
                    />
                  </TouchableOpacity>

                  <View style={styles.verticalLine} />

                  <TouchableOpacity
                    onPress={() => {
                      HandleBackRowSeat("threeBackRow");
                      handleChange("brs")("3"); // Update Formik field
                    }}
                    style={[
                      tw`flex flex-row mr-11 items-center justify-center py-2`,
                      threeBackRow ? tw`bg-[#565656]` : tw`bg-[#FFFFFF]`,
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-[14px] pt-2`,
                        { fontFamily: "Poppins-Regular" },
                        threeBackRow ? tw`text-white` : tw`text-black`,
                      ]}
                    >
                      Max (Three)
                    </Text>
                    <SvgXml
                      xml={threeBackRow ? carSeatSelectedSvg : carSeatSvg}
                    />
                    <SvgXml
                      xml={threeBackRow ? carSeatSelectedSvg : carSeatSvg}
                    />
                    <SvgXml
                      xml={threeBackRow ? carSeatSelectedSvg : carSeatSvg}
                    />
                  </TouchableOpacity>
                </View>
                {touched.brs && errors.brs && (
                  <Text style={tw`text-red-500 ml-2`}>{errors.brs}</Text>
                )}
              </View>

              <TouchableOpacity
                style={[tw`rounded-[1rem] bg-[#333333] p-3 my-2`]}
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

export default RidePreference;

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  verticalLine: {
    width: 1.5,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 11.3,
    height: 20,
  },
});
