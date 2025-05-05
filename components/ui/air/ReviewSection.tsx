import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import tw from "twrnc";

const ReviewSection = ({
	reviews = [],
	onSeeAll,
}: {
	reviews?: any[];
	onSeeAll: () => void;
}) => {
	if (!reviews.length) return null;

	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100}`}>
			<View style={tw`flex-row items-center justify-between mb-3`}>
				<Text style={tw`text-base font-medium`}>Customer reviews</Text>
				<TouchableOpacity onPress={onSeeAll}>
					<Text style={tw`text-[#FF6633]`}>See all</Text>
				</TouchableOpacity>
			</View>

			{reviews.slice(0, 1).map((review, index) => (
				<View key={index} style={tw`mb-4`}>
					<View style={tw`flex-row items-center mb-1`}>
						<Avatar size={30} title={review.name[0]} />
						<View style={tw`ml-2`}>
							<Text style={tw`font-medium`}>{review.name}</Text>
							<Text style={tw`text-xs text-gray-500`}>{review.date}</Text>
						</View>
					</View>

					<View style={tw`flex-row mb-2`}>
						{Array(review.rating)
							.fill(0)
							.map((_, star) => (
								<Ionicons key={star} name="star" size={14} color="#FFD700" />
							))}
					</View>

					<Text style={tw`text-gray-700`}>{review.text}</Text>
				</View>
			))}
		</View>
	);
};

export default ReviewSection;
