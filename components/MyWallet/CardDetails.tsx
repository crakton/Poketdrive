import { StyleSheet, Text, ImageBackground, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletDetails } from "../../hooks/reactQuery/useWallet";

const CardDetails = () => {
  const [userData, setUserData] = useState<any>(null);
  const [balance, setBalance] = useState<number | null>(null);

  // const {  isLoading, data} = useWalletDetails()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);

          setUserData(parsedData);
        }
      } catch (e) {
        console.log("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (userData) {
  //     mutate(
  //       { id: userData.id },
  //       {
  //         onSuccess: (response) => {
  //           setBalance(response);
  //           // console.log(response, "data");
  //           // console.log(userData.id, "parsedData");
  //         },
  //         onError: (error) => {
  //           console.error("Error fetching wallet details:", error);
  //           console.log(userData.id, "parsedData");
  //         },
  //       }
  //     );
  //   } else {
  //     console.error("Error fetching wallet details val:", Error);
  //   }
  // }, [userData]);
  return (
    <View>
      <View style={[tw`rounded-[10]`, styles.container]}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/history-wallet.png")}
            style={styles.backgroundImage}
          >
            <View
              style={tw`flex flex-row items-center justify-between w-full pb-6`}
            >
              <View>
                <Text
                  style={[
                    tw`text-white text-[4]`,
                    { fontFamily: "Poppins-Regular" },
                  ]}
                >
                  Current Balance
                </Text>
                <Text style={tw`text-white text-[36px]`}>
                  {" "}
                  {balance !== null ? `₦${balance}` : "Loading..."}
                </Text>
              </View>
              <View style={tw`h-[15px] w-[40px] bg-gray-400`}></View>
            </View>
            <View
              style={tw`flex flex-row items-center justify-between w-full pt-6`}
            >
              <Text style={tw`text-white`}>5282 3456 7890 1289</Text>
              <Text style={tw`text-white `}>09/12</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginRight: 15,
    marginLeft: 15,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default CardDetails;
