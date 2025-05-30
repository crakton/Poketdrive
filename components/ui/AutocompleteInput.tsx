import { GoogleLocationResult } from "@appandflow/react-native-google-autocomplete";
import { Text } from "@rneui/base";
import React from "react";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import tw from "twrnc";

const AutocompleteInput: React.FC<{
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	results: GoogleLocationResult[];
	onSelect: (result: GoogleLocationResult) => void;
	isActive: boolean;
	onFocus: () => void;
	onBlur: () => void;
	error?: string;
}> = ({
	placeholder,
	value,
	onChangeText,
	results,
	onSelect,
	isActive,
	onFocus,
	onBlur,
	error,
}) => {
	const renderLocationItem = ({ item }: { item: GoogleLocationResult }) => (
		<TouchableOpacity
			style={tw`p-3 border-b border-gray-100 flex-row items-center`}
			onPress={() => {
				onSelect(item);
			}}
		>
			<View style={tw`mr-3`}>
				<Icon
					name="location-outline"
					type="ionicon"
					color="#6B7280"
					size={16}
				/>
			</View>
			<View style={tw`flex-1`}>
				<Text style={tw`text-sm text-gray-800 font-medium`}>
					{item.structured_formatting.main_text}
				</Text>
				<Text style={tw`text-xs text-gray-500 mt-1`} numberOfLines={1}>
					{item.structured_formatting.secondary_text}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={tw`flex-1`}>
			<View style={tw`relative`}>
				<TextInput
					style={[
						tw`h-12 rounded-lg py-2 px-4 bg-gray-100 text-sm`,
						error ? tw`border border-red-500` : tw`border border-gray-200`,
					]}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					onFocus={onFocus}
					onBlur={() => setTimeout(onBlur, 200)}
					autoCorrect={false}
					autoCapitalize="words"
				/>
				{isActive && results.length > 0 && (
					<View style={tw`absolute top-12 left-0 right-0 z-50`}>
						<FlatList
							data={results}
							keyExtractor={(item) => item.place_id}
							style={tw`max-h-80 border border-gray-200 bg-white rounded-lg shadow-lg`}
							keyboardShouldPersistTaps="always"
							renderItem={renderLocationItem}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				)}
			</View>
			{error && <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>}
		</View>
	);
};
export default React.memo(AutocompleteInput);
