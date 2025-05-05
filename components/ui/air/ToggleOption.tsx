import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

interface ToggleOptionProps {
	title: string;
	options: { value: string; label: string }[];
	selectedOption: string;
	onSelect: (value: string) => void;
}

const ToggleOption = ({
	title,
	options,
	selectedOption,
	onSelect,
}: ToggleOptionProps) => {
	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
			<Text style={tw`text-base font-medium mb-3`}>{title}</Text>
			<View style={tw`flex-row gap-3`}>
				{options.map((option) => (
					<TouchableOpacity
						key={option.value}
						style={tw`flex-1 py-2 rounded-lg ${
							selectedOption === option.value
								? "bg-[#FF6633]"
								: "border border-gray-300"
						} items-center`}
						onPress={() => onSelect(option.value)}
					>
						<Text
							style={tw`${
								selectedOption === option.value ? "text-white" : "text-black"
							}`}
						>
							{option.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default ToggleOption;
