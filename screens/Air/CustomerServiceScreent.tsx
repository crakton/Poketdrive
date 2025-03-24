import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const CustomerServiceScreen = () => {
	const navigation = useNavigation();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			id: "1",
			text: "Good afternoon, how can we help you?",
			isUser: false,
			time: "12:02",
		},
		{
			id: "2",
			text: "How do I add a new payment method?",
			isUser: true,
			time: "12:04",
		},
	]);

	const sendMessage = () => {
		if (message.trim()) {
			setMessages([
				...messages,
				{
					id: Date.now().toString(),
					text: message,
					isUser: true,
					time: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				},
			]);
			setMessage("");

			// Simulate response after a short delay
			setTimeout(() => {
				setMessages((prevMessages) => [
					...prevMessages,
					{
						id: (Date.now() + 1).toString(),
						text: "To add a new payment method, go to Profile > My cards > Add new card. You can then enter your card details.",
						isUser: false,
						time: new Date().toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						}),
					},
				]);
			}, 1000);
		}
	};

	const renderMessage = ({ item }: { item: (typeof messages)[0] }) => (
		<View
			style={tw`${
				item.isUser
					? "bg-[#F05A22] self-end rounded-tl-lg rounded-bl-lg rounded-tr-lg"
					: "bg-[#F05A22] self-start rounded-tr-lg rounded-br-lg rounded-tl-lg"
			} p-3 my-1 max-w-[80%]`}
		>
			<Text style={tw`text-white`}>{item.text}</Text>
			<Text style={tw`text-white text-xs self-end mt-1 opacity-80`}>
				{item.time}
			</Text>
		</View>
	);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tw`flex-1 bg-white`}
		>
			<SafeAreaView style={tw`flex-1`}>
				<View style={tw`p-4 flex-row items-center border-b border-gray-200`}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Ionicons name="arrow-back" size={24} color="#000" />
					</TouchableOpacity>
					<Text style={tw`text-xl font-semibold ml-4`}>Customer Service</Text>
				</View>

				<FlatList
					data={messages}
					renderItem={renderMessage}
					keyExtractor={(item) => item.id}
					contentContainerStyle={tw`p-4`}
					ListHeaderComponent={
						<Text style={tw`text-gray-500 text-center mb-4 text-sm`}>
							Today
						</Text>
					}
				/>

				<View style={tw`p-4 border-t border-gray-200`}>
					<View style={tw`flex-row items-center bg-gray-100 rounded-full px-4`}>
						<TouchableOpacity>
							<Ionicons name="happy-outline" size={24} color="#666" />
						</TouchableOpacity>
						<TextInput
							style={tw`flex-1 py-3 px-2`}
							placeholder="And also..."
							value={message}
							onChangeText={setMessage}
						/>
						<TouchableOpacity>
							<Ionicons name="attach" size={24} color="#666" style={tw`mr-2`} />
						</TouchableOpacity>
						<TouchableOpacity onPress={sendMessage}>
							<View style={tw`bg-[#F05A22] p-2 rounded-full`}>
								<Ionicons name="send" size={18} color="#fff" />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};
