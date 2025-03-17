import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { Icon, Text } from "@rneui/base";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSearchRide } from "../../hooks/reactQuery/useTrips";
import Loader from "../loader/Loader";
import ContinueButton from "../ui/ContinueButton";

// Validation schema
const TripFormSchema = Yup.object().shape({
  fromwhere: Yup.string().required("From where is required"),
  towhere: Yup.string().required("To where is required"),
  // departureTime: Yup.string().required("Departure time is required"),
});

const TripForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, "TripForm">>();

  const { data, mutate } = useSearchRide();
  const [loading, setLoading] = useState(false);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const handleConfirm = (date: Date, setFieldValue: any) => {
  //   setSelectedDate(date);
  //   setFieldValue("departureTime", date.toLocaleString());
  //   setDatePickerVisibility(false);
  // };

  const handleSubmit = (values: any) => {
    setLoading(true);
    mutate(
      {
        origin: values.fromwhere,
        destination: values.towhere,
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          navigation.navigate("RideSelection", { data });
        },
        onError: (error) => {
          setLoading(false);
          Alert.alert("Error", "Failed to search ride");
        },
      }
    );
  };

  return (
    <Formik
      initialValues={{ fromwhere: "", towhere: "" }}
      validationSchema={TripFormSchema}
      onSubmit={handleSubmit}
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
        <View>
          <View style={styles.inputContainer}>
            <Icon
              name="location"
              type="ionicon"
              color="red"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="From where?"
              onChangeText={handleChange("fromwhere")}
              onBlur={handleBlur("fromwhere")}
              placeholderTextColor="gray"
              value={values.fromwhere}
            />
          </View>
          {errors.fromwhere && touched.fromwhere && (
            <Text style={styles.errorText}>{errors.fromwhere}</Text>
          )}
          <View style={styles.inputContainer}>
            <Icon
              name="location"
              type="ionicon"
              color="green"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="To where?"
              onChangeText={handleChange("towhere")}
              onBlur={handleBlur("towhere")}
              placeholderTextColor="gray"
              value={values.towhere}
            />
          </View>
          {errors.towhere && touched.towhere && (
            <Text style={styles.errorText}>{errors.towhere}</Text>
          )}
          {/**
          <View style={styles.inputContainerDate}>
            <Icon name="time" type="ionicon" color="red" style={styles.icon} />
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <Text style={tw``}>
                {values.departureTime || "Select Departure Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              textColor="#000000"
              minimumDate={new Date()}
              onConfirm={(date) => handleConfirm(date, setFieldValue)}
              onCancel={() => setDatePickerVisibility(false)}
            />
          </View>
          {errors.departureTime && touched.departureTime && (
            <Text style={styles.errorText}>{errors.departureTime}</Text>
          )} */}

          <ContinueButton
            text={"Search"}
            onPress={() => handleSubmit()}
            disabled={false}
            loading={loading}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
  inputContainerDate: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: "Poppins-Regular",
  },
});

export default TripForm;
