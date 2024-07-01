import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox, Icon, Text } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import tw from "twrnc";

interface ScheduleFormValues {
  fromwhere: string;
  towhere: string;
  stops: string[];
}

interface RideScheduleFormProps {
  setFormData: any;
  formData: any;
  handleNext: () => void;
}

const RideScheduleForm: React.FC<RideScheduleFormProps> = ({
  setFormData,
  formData,
  handleNext,
}) => {
  const [stopEnabled, setStopEnabled] = useState(formData.stops.length > 0);

  const initialValues: ScheduleFormValues = {
    fromwhere: formData.origin || "",
    towhere: formData.destination || "",
    stops: formData.stops || [""],
  };

  const handleSearch = (values: any) => {
    setFormData({
      ...formData,
      origin: values.fromwhere,
      destination: values.towhere,
      stops: values.stops.filter((stop: any) => stop),
    });
    handleNext();
  };

  const validationSchema = yup.object().shape({
    fromwhere: yup.string().required("Start Location is required"),
    towhere: yup.string().required("Destination is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSearch}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
      }) => (
        <View style={tw`flex gap-5`}>
          <View>
            <Text style={[tw`text-lg`, styles.label]}>Start Location</Text>
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
                value={values.fromwhere}
                onChangeText={handleChange("fromwhere")}
                onBlur={handleBlur("fromwhere")}
              />
            </View>
            {touched.fromwhere && errors.fromwhere && (
              <Text style={styles.error}>{errors.fromwhere}</Text>
            )}
          </View>
          <View>
            <Text style={[tw`text-lg`, styles.label]}>Destination</Text>
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
                value={values.towhere}
                onChangeText={handleChange("towhere")}
                onBlur={handleBlur("towhere")}
              />
            </View>
            {touched.towhere && errors.towhere && (
              <Text style={styles.error}>{errors.towhere}</Text>
            )}
          </View>
          <View>
            <Text style={[tw`text-lg`, styles.label]}>Stops?</Text>
            <View style={styles.checkboxOuterContainer}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  checkedColor="green"
                  uncheckedColor="black"
                  size={30}
                  checked={stopEnabled}
                  onPress={() => {
                    setStopEnabled(!stopEnabled);
                    if (!stopEnabled) {
                      setFieldValue("stops", [""]);
                    } else {
                      setFieldValue("stops", []);
                    }
                  }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
              </View>
              <Text style={styles.checkboxLabel}>
                Add a stop to get more bookings
              </Text>
            </View>
          </View>
          {stopEnabled && (
            <View>
              {values.stops.map((stop, index) => (
                <View style={styles.inputContainer} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      const newStops = values.stops.filter(
                        (_, i) => i !== index
                      );
                      setFieldValue("stops", newStops);
                    }}
                  >
                    <Icon
                      name="remove"
                      type="ionicon"
                      color="red"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter a stop"
                    value={stop}
                    onChangeText={(value) => {
                      const newStops = [...values.stops];
                      newStops[index] = value;
                      setFieldValue("stops", newStops);
                    }}
                  />
                </View>
              ))}
              <TouchableOpacity
                onPress={() => setFieldValue("stops", [...values.stops, ""])}
              >
                <Icon
                  name="add"
                  type="ionicon"
                  color="green"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={handleSubmit as any}
            style={tw`rounded bg-[#404040] w-full rounded-lg p-3 mt-10`}
          >
            <Text style={tw`text-center text-white text-[20px] font-bold`}>
              Next
            </Text>
          </TouchableOpacity>
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
    borderColor: "#fffff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fffff",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#fffff",
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  label: {
    fontFamily: "Poppins-Bold",
  },
  checkboxOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fffff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fffff",
  },
  checkboxContainer: {
    borderRadius: 1000,
    overflow: "hidden",
    backgroundColor: "#fffff",
  },
  checkboxLabel: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
    marginLeft: 10,
  },
});

export default RideScheduleForm;
