import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useMutation } from "@tanstack/react-query";
import { VerifytOTP } from "../../lib/api/functions/register";
import Loader from "../loader/Loader";
import { setLocalData } from "../../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerIndieID } from "native-notify";
import axios from "axios";

const CELL_COUNT = 6;

const CodeVerification = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "Verification">
    >();
  const [value, setValue] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string;
    isFocused: boolean;
  }) => {
    let textChild = null;
    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  useEffect(() => {
    // Focus the code field when the component mounts
    ref.current?.focus();
  }, []);

  useEffect(() => {
    // Check if the code input is complete
    setIsCodeComplete(value.length === CELL_COUNT);
  }, [value]);

  const { mutateAsync, status } = useMutation({
    mutationFn: (payload: any) => VerifytOTP(payload),
    onSuccess: async (data) => {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      console.log(data);
      navigation.replace("Home");
      registerIndieID(`${data.id}`, 22387, "Wl0rlWhlSiad3m2ob0v2aB");
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const handleSubmit = async () => {
    const payload = { otp: value };
    await mutateAsync(payload);
  };

  return (
    <SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
      {status === "pending" && <Loader />}
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ width: "100%", paddingHorizontal: 22 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
          </View>
          <View
            style={[
              tw`flex flex-row justify-center items-center`,
              { marginTop: 20 },
            ]}
          >
            <Text
              style={[
                tw`text-center text-lg`,
                { fontFamily: "Poppins-Regular" },
              ]}
            >
              Didn’t receive code{" "}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  tw`text-center text-lg text-[#F25B3E]`,
                  { fontFamily: "Poppins-Regular" },
                ]}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!isCodeComplete}
            onPress={handleSubmit}
            style={[
              tw`p-3`,
              {
                backgroundColor: isCodeComplete ? "#F25B3E" : "#D3D3D3",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                marginVertical: 32,
              },
            ]}
          >
            <Text
              style={[
                tw`text-center text-2xl text-white`,
                { fontFamily: "Poppins-Bold" },
              ]}
            >
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CodeVerification;

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center", fontSize: 30 },
  fieldRow: {
    marginTop: 20,
    flexDirection: "row",
    marginLeft: 8,
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginLeft: 8,
    backgroundColor: "black",
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  focusCell: {
    borderColor: "white",
  },
});
