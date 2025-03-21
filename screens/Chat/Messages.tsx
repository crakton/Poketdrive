import React, { useState, useEffect, useRef } from "react";
import {
	FlatList,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const Messages = () => {
	const [messages, setMessages] = useState([
		{
			id: 0,
			convos: [
				{
					recipient_id: "user1",
					message: "Hello there!",
					timestamp: "10:00 AM",
				},
				{
					recipient_id: "user2",
					message: "Hi! How are you?",
					timestamp: "10:01 AM",
				},
				{
					recipient_id: "user1",
					message: "I'm doing great, thanks!",
					timestamp: "10:02 AM",
				},
				{
					recipient_id: "user2",
					message: "That's good to hear.",
					timestamp: "10:03 AM",
				},
			],
		},
	]);
	const [newMessage, setNewMessage] = useState("");
	const flatListRef = useRef<FlatList>(null);

	const sendMessage = () => {
		if (newMessage.trim() === "") return;

		const updatedMessages = [...messages];
		updatedMessages[0].convos.push({
			recipient_id: "user1", // Assuming current user is user1
			message: newMessage,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		});
		setMessages(updatedMessages);
		setNewMessage("");
	};

	useEffect(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToEnd({ animated: true });
		}
	}, [messages]);

	const renderMessage = ({
		item,
	}: {
		item: {
			id: number;
			convos: { recipient_id: string; message: string; timestamp: string }[];
		};
	}) => {
		return (
			<View style={[tw``]}>
				{item.convos.map((convo, index) => {
					const isCurrentUser = convo.recipient_id === "user1";
					return (
						<View
							key={index}
							style={[
								tw`my-1 mx-2 p-2 rounded-xl`,
								isCurrentUser
									? tw`bg-slate-50 self-end`
									: tw`bg-slate-700 self-start`,
							]}
						>
							<Text
								style={[
									tw`text-sm text-wrap`,
									isCurrentUser ? tw`text-black` : tw`text-white`,
								]}
							>
								{convo.message}
							</Text>
							<Text
								style={[
									tw`text-[2] text-gray-600`,
									isCurrentUser ? tw`text-black` : tw`text-white`,
								]}
							>
								{convo.timestamp}
							</Text>
						</View>
					);
				})}
			</View>
		);
	};
	const ChatFooter = () => {
		return (
			<View style={tw`flex-row items-center justify-between py-2 px-4`}>
				<TouchableOpacity>
					<Ionicons size={20} style={[tw`text-slate-400`]} name="happy" />
				</TouchableOpacity>
				<View
					style={[
						tw`bg-slate-100 rounded-full flex-1  px-2 ml-2 flex-row items-center`,
					]}
				>
					<TouchableOpacity style={[tw`p-2 right-0`, ,]} onPress={sendMessage}>
						<Ionicons
							style={[tw`text-slate-700`]}
							name="camera-outline"
							size={20}
						/>
					</TouchableOpacity>
					<TextInput
						multiline
						numberOfLines={1}
						autoFocus
						style={tw`flex-1`}
						placeholder="Type a message..."
						value={newMessage}
						onChangeText={setNewMessage}
					/>
					<TouchableOpacity style={[tw`p-2 right-0`, ,]} onPress={sendMessage}>
						<Ionicons
							style={[
								tw`text-slate-700`,
								{ transform: [{ rotateZ: "-45deg" }] },
							]}
							name="send"
							size={20}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<FlatList
				scrollEnabled
				snapToEnd
				snapToAlignment="start"
				renderItem={renderMessage}
				keyExtractor={(item) => item.toString()}
				ref={flatListRef}
				data={messages}
				contentContainerStyle={tw`flex-grow p-2`}
				inverted={false}
			/>
			<ChatFooter />
		</SafeAreaView>
	);
};
export default Messages;
