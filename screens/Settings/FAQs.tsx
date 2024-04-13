import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { ListItem } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderWithBackButton from "../../components/common/HeaderWithBackButton";

const FAQs = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, "WalletHome">
    >();

    const faqData = [
      {
        title: "What is Uride?",
        subtitle: "uRide is a carpooling platform that connects drivers with empty seats in their vehicles with passengers traveling in the same direction."
      },
      {
        title: "How does uRide work for drivers?",
        subtitle: "Drivers can create ride listings, set the departure time and location, and specify the number of available seats. Passengers can then request to join the ride."
      },
      {
        title: "How do I sign up for uRide?",
        subtitle: "You can sign up for uRide by downloading the uRide app from the App Store or Google Play Store and following the registration process."
      },
      {
        title: "Is uRide available in my city?",
        subtitle: "uRide is currently available in select cities. Please check the app or website for a list of available locations."
      },
      {
        title: "How do I pay for a ride on uRide?",
        subtitle: "Payment is typically made through the uRide platform, and it may involve credit card or other online payment methods."
      },
      // Add more FAQ items below
      {
        title: "Can I cancel a ride after booking?",
        subtitle: "Yes, you can cancel a ride after booking. However, there may be cancellation fees depending on the time of cancellation and the ride provider's policies."
      },
      {
        title: "Is there a customer support service?",
        subtitle: "Yes, uRide provides customer support services to assist users with any issues or inquiries they may have. You can contact customer support through the app or website."
      },
      // Add more FAQ items as needed
    ];
    
  // State for controlling the expanded state of each accordion
  const [expanded, setExpanded] = useState(Array(faqData.length).fill(false));

  const toggleAccordion = (index: number) => {
    const newExpandedState = [...expanded];
    newExpandedState[index] = !newExpandedState[index];
    setExpanded(newExpandedState);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <HeaderWithBackButton navigation={navigation} title="FAQs" />
      <ScrollView>
        {faqData.map((faq, index) => (
          <View key={index}>
            <View
              style={[
                tw`border-t border-gray-200 mx-[10] px-[10] py-[10] justify-center`,
                { backgroundColor: "Poppins-SemiBold" },
              ]}
            >
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title
                      style={[tw`text-[16px]`, { fontFamily: "Poppins-SemiBold" }]}
                    >
                      {faq.title}
                    </ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={expanded[index]}
                onPress={() => toggleAccordion(index)}
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Subtitle
                      style={[
                        tw`text-[14px] m-[-40] py-[20] px-[40]`,
                        { fontFamily: "Poppins-Regular" },
                      ]}
                    >
                      {faq.subtitle}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </ListItem.Accordion>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQs;
